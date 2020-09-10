import React, { FC, useState, Fragment } from 'react';
import { css } from 'emotion';
import {
  Container,
  HorizontalGroup,
  Field,
  Select,
  MultiSelect,
  Input,
  Checkbox,
  Button,
  IconButton,
  Label,
  useTheme,
} from '@grafana/ui';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { Label as LabelType, DnsSettings } from 'types';
import { Collapse } from 'components/Collapse';
import { LabelField } from './LabelField';
import { DNS_RESPONSE_CODES, DNS_RECORD_TYPES, DNS_PROTOCOLS, IP_OPTIONS } from './constants';

interface Props {
  settings?: DnsSettings;
  isEditor: boolean;
  labels: LabelType[];
}

enum ResponseMatchType {
  Authority = 'Authority',
  Answer = 'Answer',
  Additional = 'Additional',
}

const RESPONSE_MATCH_OPTIONS = [
  { label: `Validate ${ResponseMatchType.Authority} matches`, value: ResponseMatchType.Authority },
  { label: `Validate ${ResponseMatchType.Answer} matches`, value: ResponseMatchType.Answer },
  { label: `Validate ${ResponseMatchType.Additional} matches`, value: ResponseMatchType.Additional },
];

const DnsSettingsForm: FC<Props> = ({ settings, isEditor, labels }) => {
  const { spacing } = useTheme();

  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'settings.dns.validations',
  });

  const [showValidation, setShowValidation] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showDNSSettings, setShowDNSSettings] = useState(false);
  return (
    <Container>
      <Collapse
        label="DNS Settings"
        onToggle={() => setShowDNSSettings(!showDNSSettings)}
        isOpen={showDNSSettings}
        collapsible
      >
        <div
          className={css`
            max-width: 240px;
          `}
        >
          <Field label="Record Type" disabled={!isEditor}>
            <Controller as={Select} name="settings.dns.recordType" options={DNS_RECORD_TYPES} />
          </Field>
          <Field label="Server" disabled={!isEditor}>
            <Input
              id="dns-settings-server-address"
              ref={register()}
              name="settings.dns.server"
              type="text"
              placeholder="server"
            />
          </Field>
          <Field label="Protocol" disabled={!isEditor}>
            <Controller as={Select} name="settings.dns.protocol" options={DNS_PROTOCOLS} />
          </Field>
          <Field label="Port" disabled={!isEditor}>
            <Input id="dns-settings-port" ref={register()} name="settings.dns.port" type="number" placeholder="port" />
          </Field>
        </div>
      </Collapse>
      <Collapse
        label="Validation"
        onToggle={() => setShowValidation(!showValidation)}
        isOpen={showValidation}
        collapsible
      >
        <HorizontalGroup>
          <Field label="Valid Response Codes" description="List of valid response codes" disabled={!isEditor}>
            <Controller as={MultiSelect} name="settings.dns.validRCodes" options={DNS_RESPONSE_CODES} />
          </Field>
        </HorizontalGroup>
        <Label>Valid Response Matches</Label>
        {Boolean(fields.length) && (
          <div
            className={css`
              display: grid;
              grid-template-columns: auto auto 70px auto;
              grid-gap: ${spacing.sm};
              align-items: center;
            `}
          >
            <Label>DNS Response Match</Label>
            <Label>Expression</Label>
            <Label>Invert Match</Label>
            <div />
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <Controller
                  as={Select}
                  name={`settings.dns.validations[${index}].responseMatch`}
                  options={RESPONSE_MATCH_OPTIONS}
                />
                <Input
                  ref={register()}
                  name={`settings.dns.validations[${index}].expression`}
                  placeholder="Type Expression"
                />
                <div
                  className={css`
                    position: relative;
                    margin-top: -20px;
                    justify-self: center;
                  `}
                >
                  <Checkbox ref={register()} name={`settings.dns.validations[${index}].inverted`} />
                </div>
                <IconButton name="minus-circle" onClick={() => remove(index)} />
              </Fragment>
            ))}
          </div>
        )}
        <Button
          onClick={() => append({ responseMatch: RESPONSE_MATCH_OPTIONS[0], expression: '', inverted: false })}
          type="button"
          variant="secondary"
          className={css`
            margin: ${spacing.sm} 0 ${spacing.md} 0;
          `}
          size="sm"
          disabled={!isEditor}
        >
          Add RegEx Validation
        </Button>
      </Collapse>
      <Collapse
        label="Advanced Options"
        collapsible={true}
        onToggle={() => setShowAdvanced(!showAdvanced)}
        isOpen={showAdvanced}
      >
        <LabelField isEditor={isEditor} labels={labels} />
        <HorizontalGroup>
          <Field label="IP Version" description="The IP protocol of the ICMP request" disabled={!isEditor}>
            <Controller name="settings.dns.ipVersion" as={Select} options={IP_OPTIONS} />
          </Field>
        </HorizontalGroup>
      </Collapse>
    </Container>
  );
};

export default DnsSettingsForm;
