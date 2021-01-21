import { GrafanaTheme } from '@grafana/data';
import { Button, Spinner, useStyles } from '@grafana/ui';
import React, { FC, useState } from 'react';
import { css } from 'emotion';
import { useAlerts } from 'hooks/useAlerts';
import { AlertRuleForm } from './AlertRuleForm';
import { AlertFormValues, AlertRule, AlertSensitivity, Label } from 'types';

const getStyles = (theme: GrafanaTheme) => ({
  emptyCard: css`
    background-color: ${theme.colors.bg2};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 100px;
  `,
  marginBottom: css`
    margin-bottom: ${theme.spacing.xl};
  `,
});

type PromLabel = { [key: string]: string };

const labelToProm = (labels?: Label[]) => {
  return labels?.reduce<PromLabel>((acc, label) => {
    acc[label.name] = label.value;
    return acc;
  }, {});
};

const transformAlertValues = (alertValues: AlertFormValues, sensitivity: AlertSensitivity): AlertRule => {
  return {
    alert: alertValues.name,
    expr: `probe_success * on (instance, job, probe, config_version) group_left (check_name) sm_check_info{alert_sensitivity="${sensitivity}"} < ${alertValues.probePercentage /
      100}`,
    for: `${alertValues.timeCount}${alertValues.timeUnit.value}`,
    labels: labelToProm(alertValues.labels),
    annotations: labelToProm(alertValues.annotations),
  };
};

export const Alerting: FC = () => {
  const styles = useStyles(getStyles);
  const { alertRules, setDefaultRules, setRules } = useAlerts();
  const [updatingDefaultRules, setUpdatingDefaultRules] = useState(false);

  const populateDefaultAlerts = async () => {
    setUpdatingDefaultRules(true);
    await setDefaultRules();
    setUpdatingDefaultRules(false);
  };

  const getUpdateRules = (updatedIndex: number) => async (
    alertValues: AlertFormValues,
    sensitivity: AlertSensitivity
  ) => {
    const updatedRule = transformAlertValues(alertValues, sensitivity);

    if (!alertRules) {
      return Promise.reject('Something went wrong');
    }

    const updatedRules = alertRules?.map((rule, index) => {
      if (index === updatedIndex) {
        return updatedRule;
      }
      return rule;
    });
    return await setRules(updatedRules);
  };

  return (
    <div>
      <h2>Alerts</h2>
      <p>
        View and edit default alerts for Synthetic Monitoring here. To tie one of these alerts to a check, you must
        select the alert sensitivity from the Alerting section of the check form when creating a check.{' '}
        <a href="FIXME">Learn more about alerting for Synthetic Monitoring.</a>
      </p>
      {!alertRules && <Spinner />}
      {alertRules?.length === 0 && (
        <div className={styles.emptyCard}>
          <span className={styles.marginBottom}>
            You do not have any default alerts for Synthetic Monitoring yet. Click below to get some default alerts. You
            can also create custom alerts for checks using Grafana Cloud Alerting.
          </span>
          <Button size="md" disabled={updatingDefaultRules} onClick={populateDefaultAlerts}>
            Populate default alerts
          </Button>
        </div>
      )}
      {alertRules?.map((alertRule, index) => (
        <AlertRuleForm rule={alertRule} onSubmit={getUpdateRules(index)} />
      ))}
    </div>
  );
};
