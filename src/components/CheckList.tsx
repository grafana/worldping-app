// Libraries
import React, { useState } from 'react';

// Types
import {
  OrgRole,
  Check,
  Label,
  GrafanaInstances,
  FilteredCheck,
  CheckSort,
  CheckEnabledStatus,
  CheckListViewType,
  CheckType,
} from 'types';
import appEvents from 'grafana/app/core/app_events';
import { Button, Icon, Select, Input, Pagination, InfoBox, Checkbox, useStyles, RadioButtonGroup } from '@grafana/ui';
import { unEscapeStringFromRegex, escapeStringForRegex, GrafanaTheme, AppEvents, SelectableValue } from '@grafana/data';
import { hasRole, checkType as getCheckType, matchStrings } from 'utils';
import {
  CHECK_FILTER_OPTIONS,
  CHECK_LIST_SORT_OPTIONS,
  CHECK_LIST_STATUS_OPTIONS,
  CHECK_LIST_VIEW_TYPE_OPTIONS,
} from './constants';
import { CheckListItem } from './CheckListItem';
import { css } from 'emotion';
import { LabelFilterInput } from './LabelFilterInput';

const CHECKS_PER_PAGE_CARD = 15;
const CHECKS_PER_PAGE_LIST = 50;

const matchesFilterType = (check: Check, typeFilter: string) => {
  if (typeFilter === 'all') {
    return true;
  }
  const checkType = getCheckType(check.settings);
  if (checkType === typeFilter) {
    return true;
  }
  return false;
};

const matchesSearchFilter = ({ target, job, labels }: Check, searchFilter: string) => {
  if (!searchFilter) {
    return true;
  }

  // allow users to search using <term>=<somevalue>.
  // <term> can be one of target, job or a label name
  const filterParts = searchFilter.toLowerCase().trim().split('=');

  const labelMatches = labels.reduce((acc, { name, value }) => {
    acc.push(name);
    acc.push(value);
    return acc;
  }, [] as string[]);

  return filterParts.some((filterPart) => matchStrings(filterPart, [target, job, ...labelMatches]));
};

const matchesLabelFilter = ({ labels }: Check, labelFilters: string[]) => {
  if (labelFilters.length === 0) {
    return true;
  }
  return labels.some(({ name, value }) => labelFilters.some((filter) => filter === `${name}: ${value}`));
};

const matchesStatusFilter = ({ enabled }: Check, { value }: SelectableValue) => {
  if (
    value === CheckEnabledStatus.All ||
    (value === CheckEnabledStatus.Enabled && enabled) ||
    (value === CheckEnabledStatus.Disabled && !enabled)
  ) {
    return true;
  }
  return false;
};

const getStyles = (theme: GrafanaTheme) => ({
  headerContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: ${theme.spacing.md};
  `,
  header: css`
    font-size: ${theme.typography.heading.h4};
    font-weight: ${theme.typography.weight.bold};
    margin-bottom: ${theme.spacing.xs};
  `,
  subheader: css``,
  searchSortContainer: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing.sm};
  `,
  flexRow: css`
    display: flex;
    flex-direction: row;
  `,
  bulkActionContainer: css`
    padding: 0 0 ${theme.spacing.sm} ${theme.spacing.sm};
    display: flex;
    min-height: 48px;
    align-items: center;
  `,
  flexGrow: css`
    flex-grow: 1;
  `,
  buttonGroup: css`
    display: flex;
    align-items: center;
  `,
  checkboxContainer: css`
    margin-right: ${theme.spacing.md};
    height: 45px;
  `,
  checkbox: css`
    position: relative;
  `,
  marginRightSmall: css`
    margin-right: ${theme.spacing.sm};
  `,
});

interface Props {
  instance: GrafanaInstances;
  onAddNewClick: () => void;
  checks: Check[];
  onCheckUpdate: () => void;
}

const sortChecks = (checks: FilteredCheck[], sortType: CheckSort) => {
  switch (sortType) {
    case CheckSort.AToZ:
      return checks.sort((a, b) => a.job.localeCompare(b.job));
    case CheckSort.ZToA:
      return checks.sort((a, b) => b.job.localeCompare(a.job));
  }
};

export const CheckList = ({ instance, onAddNewClick, checks, onCheckUpdate }: Props) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [labelFilters, setLabelFilters] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<SelectableValue<CheckEnabledStatus>>(CHECK_LIST_STATUS_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChecks, setSelectedChecks] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [viewType, setViewType] = useState(CheckListViewType.Card);
  const [sortType, setSortType] = useState<CheckSort>(CheckSort.AToZ);
  const styles = useStyles(getStyles);

  const checksPerPage = viewType === CheckListViewType.Card ? CHECKS_PER_PAGE_CARD : CHECKS_PER_PAGE_LIST;

  const totalPages = Math.ceil(checks.length / checksPerPage);
  const filteredChecks = sortChecks(
    checks.filter(
      (check) =>
        matchesFilterType(check, typeFilter) &&
        matchesSearchFilter(check, searchFilter) &&
        Boolean(check.id) &&
        matchesLabelFilter(check, labelFilters) &&
        matchesStatusFilter(check, statusFilter)
    ) as FilteredCheck[],
    sortType
  );

  const handleLabelSelect = (label: Label) => {
    setLabelFilters([...labelFilters, `${label.name}: ${label.value}`]);
    setCurrentPage(1);
  };

  const handleTypeSelect = (checkType: CheckType) => {
    setTypeFilter(checkType);
  };

  const handleStatusSelect = (enabled: boolean) => {
    const status = enabled ? CheckEnabledStatus.Enabled : CheckEnabledStatus.Disabled;
    const option = CHECK_LIST_STATUS_OPTIONS.find(({ value }) => value === status);
    if (option) {
      setStatusFilter(option);
    }
  };

  const currentPageChecks = filteredChecks.slice((currentPage - 1) * checksPerPage, currentPage * checksPerPage);

  const toggleVisibleCheckSelection = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedChecks(new Set(currentPageChecks.map((check) => check.id)));
      return;
    }
    clearSelectedChecks();
  };

  const toggleAllCheckSelection = () => {
    setSelectedChecks(new Set(filteredChecks.map((check) => check.id)));
  };

  const clearSelectedChecks = () => {
    setSelectedChecks(new Set());
  };

  const handleCheckSelect = (checkId: number) => {
    if (!selectedChecks.has(checkId)) {
      setSelectedChecks(new Set(selectedChecks.add(checkId)));
      return;
    }
    selectedChecks.delete(checkId);
    setSelectedChecks(new Set(selectedChecks));
  };

  const getChecksFromSelected = () =>
    Array.from(selectedChecks)
      .map((checkId) => checks.find((check) => check.id && check.id === checkId))
      .filter(Boolean) as FilteredCheck[];

  const disableSelectedChecks = async () => {
    const checkUpdates = getChecksFromSelected()
      .filter((check) => check && check.enabled)
      .map((check) => {
        if (!check) {
          return Promise.reject('Could not find check with specified id');
        }
        return instance.api?.updateCheck({
          ...check,
          enabled: false,
        });
      });

    const resolvedCheckUpdates = await Promise.allSettled(checkUpdates);
    const { successCount, errorCount } = resolvedCheckUpdates.reduce(
      (acc, { status }) => {
        if (status === 'fulfilled') {
          acc.successCount = acc.successCount + 1;
        }
        if (status === 'rejected') {
          acc.errorCount = acc.errorCount + 1;
        }
        return acc;
      },
      {
        successCount: 0,
        errorCount: 0,
      }
    );

    const notUpdatedCount = selectedChecks.size - resolvedCheckUpdates.length;

    if (successCount > 0) {
      appEvents.emit(AppEvents.alertSuccess, [`${successCount} check${successCount > 1 ? 's' : ''} disabled`]);
    }
    if (errorCount > 0) {
      appEvents.emit(AppEvents.alertError, [`${errorCount} check${errorCount > 1 ? 's' : ''} were not disabled`]);
    }
    if (notUpdatedCount > 0) {
      appEvents.emit(AppEvents.alertWarning, [
        `${notUpdatedCount} check${notUpdatedCount > 1 ? 's' : ''} were already disabled`,
      ]);
    }
    clearSelectedChecks();
    onCheckUpdate();
  };

  const enableSelectedChecks = async () => {
    const checkUpdates = getChecksFromSelected()
      .filter((check) => check && !check.enabled)
      .map((check) => {
        if (!check) {
          return Promise.reject('Could not find check with specified id');
        }
        return instance.api?.updateCheck({
          ...check,
          enabled: true,
        });
      });

    const resolvedCheckUpdates = await Promise.allSettled(checkUpdates);
    const { successCount, errorCount } = resolvedCheckUpdates.reduce(
      (acc, { status }) => {
        if (status === 'fulfilled') {
          acc.successCount = acc.successCount + 1;
        }
        if (status === 'rejected') {
          acc.errorCount = acc.errorCount + 1;
        }
        return acc;
      },
      {
        successCount: 0,
        errorCount: 0,
      }
    );

    const notUpdatedCount = selectedChecks.size - resolvedCheckUpdates.length;

    if (successCount > 0) {
      appEvents.emit(AppEvents.alertSuccess, [`${successCount} check${successCount > 1 ? 's' : ''} enabled`]);
    }
    if (errorCount > 0) {
      appEvents.emit(AppEvents.alertError, [`${errorCount} check${errorCount > 1 ? 's' : ''} were not enabled`]);
    }
    if (notUpdatedCount > 0) {
      appEvents.emit(AppEvents.alertWarning, [
        `${notUpdatedCount} check${notUpdatedCount > 1 ? 's' : ''} were already enabled`,
      ]);
    }

    clearSelectedChecks();
    onCheckUpdate();
  };

  const deleteSingleCheck = async (check: Check) => {
    try {
      if (!check.id) {
        appEvents.emit(AppEvents.alertError, ['There was an error deleting the check']);
        return;
      }
      await instance.api?.deleteCheck(check.id);
      appEvents.emit(AppEvents.alertSuccess, ['Check deleted successfully']);
      onCheckUpdate();
    } catch (e) {
      const errorMessage = e?.data?.err ?? '';
      appEvents.emit(AppEvents.alertError, [`Could not delete check. ${errorMessage}`]);
    }
  };

  const deleteSelectedChecks = async () => {
    const checkDeletions = Array.from(selectedChecks).map((checkId) => instance.api?.deleteCheck(checkId));

    const resolvedCheckUpdates = await Promise.allSettled(checkDeletions);
    const { successCount, errorCount } = resolvedCheckUpdates.reduce(
      (acc, { status }) => {
        if (status === 'fulfilled') {
          acc.successCount = acc.successCount + 1;
        }
        if (status === 'rejected') {
          acc.errorCount = acc.errorCount + 1;
        }
        return acc;
      },
      {
        successCount: 0,
        errorCount: 0,
      }
    );

    if (successCount > 0) {
      appEvents.emit(AppEvents.alertSuccess, [`${successCount} check${successCount > 1 ? 's' : ''} deleted`]);
    }
    if (errorCount > 0) {
      appEvents.emit(AppEvents.alertError, [`${errorCount} check${errorCount > 1 ? 's' : ''} were not deleted`]);
    }

    clearSelectedChecks();
    onCheckUpdate();
  };

  const updateSortMethod = ({ value }: SelectableValue<CheckSort>) => {
    if (value !== undefined) {
      setSortType(value);
    }
  };

  if (!checks) {
    return null;
  }

  if (checks.length === 0) {
    return (
      <InfoBox
        title="Grafana Cloud Synthetic Monitoring"
        url={'https://grafana.com/docs/grafana-cloud/synthetic-monitoring/'}
      >
        <p>
          This account does not currently have any checks configured. Click the button below to start monitoring your
          services with Grafana Cloud.
        </p>
        {hasRole(OrgRole.EDITOR) && (
          <Button variant="primary" onClick={onAddNewClick} type="button">
            New Check
          </Button>
        )}
      </InfoBox>
    );
  }

  return (
    <div>
      <div className={styles.headerContainer}>
        <div>
          <h4 className={styles.header}>All checks</h4>
          <div className={styles.subheader}>
            Currently showing {currentPageChecks.length} of {checks.length} total checks
          </div>
        </div>
        <div>
          {hasRole(OrgRole.EDITOR) && (
            <Button variant="primary" onClick={onAddNewClick} type="button">
              Add new check
            </Button>
          )}
        </div>
      </div>
      <div className={styles.searchSortContainer}>
        <Input
          autoFocus
          prefix={<Icon name="search" />}
          width={40}
          data-testid="check-search-input"
          type="text"
          value={searchFilter ? unEscapeStringFromRegex(searchFilter) : ''}
          onChange={(event) => setSearchFilter(escapeStringForRegex(event.currentTarget.value))}
          placeholder="Search by job name, endpoint, or label"
        />{' '}
        <div className={styles.flexRow}>
          <Select
            prefix="Status"
            data-testid="check-status-filter"
            className={styles.marginRightSmall}
            options={CHECK_LIST_STATUS_OPTIONS}
            width={20}
            onChange={(option) => {
              setStatusFilter(option);
            }}
            value={statusFilter}
          />
          <Select
            aria-label="Types"
            prefix="Types"
            data-testid="check-type-filter"
            options={CHECK_FILTER_OPTIONS}
            width={20}
            onChange={(selected) => setTypeFilter(selected?.value ?? typeFilter)}
            value={typeFilter}
          />
        </div>
      </div>
      <div className={styles.searchSortContainer}>
        <LabelFilterInput checks={checks} onChange={(labels) => setLabelFilters(labels)} labelFilters={labelFilters} />
      </div>
      <div className={styles.bulkActionContainer}>
        <div className={styles.checkboxContainer}>
          <Checkbox
            onChange={toggleVisibleCheckSelection}
            value={selectAll}
            className={styles.checkbox}
            data-testid="selectAll"
          />
        </div>
        {selectedChecks.size > 0 ? (
          <>
            <span className={styles.marginRightSmall}>{selectedChecks.size} checks are selected.</span>
            <div className={styles.buttonGroup}>
              {selectedChecks.size < filteredChecks.length && (
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className={styles.marginRightSmall}
                  onClick={toggleAllCheckSelection}
                  disabled={!hasRole(OrgRole.EDITOR)}
                >
                  Select all {filteredChecks.length} checks
                </Button>
              )}
              <Button
                type="button"
                variant="destructive"
                className={styles.marginRightSmall}
                onClick={deleteSelectedChecks}
                disabled={!hasRole(OrgRole.EDITOR)}
              >
                Delete
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={enableSelectedChecks}
                className={styles.marginRightSmall}
                disabled={!hasRole(OrgRole.EDITOR)}
              >
                Enable
              </Button>
              <Button type="button" variant="secondary" onClick={disableSelectedChecks}>
                Disable
              </Button>
            </div>
          </>
        ) : (
          <RadioButtonGroup
            value={viewType}
            onChange={(value) => {
              if (value !== undefined) {
                setViewType(value);
              }
            }}
            options={CHECK_LIST_VIEW_TYPE_OPTIONS}
          />
        )}
        <div className={styles.flexGrow} />
        <Select
          prefix={
            <div>
              <Icon name="sort-amount-down" /> Sort
            </div>
          }
          options={CHECK_LIST_SORT_OPTIONS}
          defaultValue={CHECK_LIST_SORT_OPTIONS[0]}
          width={20}
          onChange={updateSortMethod}
        />
      </div>
      <section className="card-section card-list-layout-list">
        <ol className="card-list">
          {currentPageChecks.map((check, index) => (
            <CheckListItem
              check={check}
              key={index}
              onLabelSelect={handleLabelSelect}
              onStatusSelect={handleStatusSelect}
              onTypeSelect={handleTypeSelect}
              onToggleCheckbox={handleCheckSelect}
              selected={selectedChecks.has(check.id)}
              viewType={viewType}
              onDeleteCheck={deleteSingleCheck}
            />
          ))}
        </ol>
      </section>
      {totalPages > 1 && (
        <Pagination
          numberOfPages={totalPages}
          currentPage={currentPage}
          onNavigate={(toPage: number) => setCurrentPage(toPage)}
        />
      )}
    </div>
  );
};
