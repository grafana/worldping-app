import { SelectableValue } from '@grafana/data';
import {
  CheckType,
  DnsRecordType,
  DnsProtocol,
  CheckFormValues,
  Settings,
  SettingsFormValues,
  PingSettingsFormValues,
  IpVersion,
  PingSettings,
  HttpSettings,
  HttpMethod,
  HttpSettingsFormValues,
  Label,
  TcpSettingsFormValues,
  TcpSettings,
  DnsSettingsFormValues,
  DnsSettings,
  DNSRRValidator,
  DnsValidationFormValue,
  ResponseMatchType,
  Check,
} from 'types';

import { CHECK_TYPE_OPTIONS } from 'components/constants';
import { checkType } from 'utils';
import { validateFrequency } from 'validation';

export function selectableValueFrom<T>(value: T, label?: string): SelectableValue<T> {
  const labelValue: unknown = value;
  return { label: label ?? (labelValue as string), value };
}

export function defaultSettings(t: CheckType): Settings | undefined {
  switch (t) {
    case CheckType.HTTP: {
      return {
        http: {
          method: HttpMethod.GET,
          ipVersion: IpVersion.V4,
          noFollowRedirects: false,
        },
      };
    }
    case CheckType.PING: {
      return {
        ping: {
          ipVersion: IpVersion.V4,
          dontFragment: false,
        },
      };
    }
    case CheckType.DNS: {
      return {
        dns: {
          recordType: DnsRecordType.A,
          server: '8.8.8.8',
          ipVersion: IpVersion.V4,
          protocol: DnsProtocol.UDP,
          port: 53,
        },
      };
    }
    case CheckType.TCP: {
      return {
        tcp: {
          ipVersion: IpVersion.V4,
          tls: false,
        },
      };
    }
  }
}

const getPingSettingsFormValues = (settings: Settings): PingSettingsFormValues => {
  const pingSettings = settings.ping ?? (defaultSettings(CheckType.PING) as PingSettings);
  return {
    ...pingSettings,
    ipVersion: selectableValueFrom(pingSettings.ipVersion),
  };
};

const headersToLabels = (headers: string[] | undefined): Label[] =>
  headers?.map(header => {
    const parts = header.split(':', 2);
    return {
      name: parts[0],
      value: parts[1],
    };
  }) ?? [];

const getHttpSettingsFormValues = (settings: Settings): HttpSettingsFormValues => {
  const httpSettings = settings.http ?? (defaultSettings(CheckType.HTTP) as HttpSettings);
  return {
    ...httpSettings,
    validStatusCodes: httpSettings.validStatusCodes?.map(statusCode => selectableValueFrom(statusCode)) ?? [],
    validHTTPVersions: httpSettings.validHTTPVersions?.map(httpVersion => selectableValueFrom(httpVersion)) ?? [],
    method: selectableValueFrom(httpSettings.method),
    ipVersion: selectableValueFrom(httpSettings.ipVersion),
    headers: headersToLabels(httpSettings.headers),
  };
};

const getTcpSettingsFormValues = (settings: Settings): TcpSettingsFormValues => {
  const tcpSettings = settings.tcp ?? (defaultSettings(CheckType.TCP) as TcpSettings);
  return {
    ...tcpSettings,
    ipVersion: selectableValueFrom(tcpSettings.ipVersion),
  };
};

interface GetDnsValidationArgs {
  [ResponseMatchType.Answer]?: DNSRRValidator;
  [ResponseMatchType.Authority]?: DNSRRValidator;
  [ResponseMatchType.Additional]?: DNSRRValidator;
}
const getDnsValidations = (validations: GetDnsValidationArgs): DnsValidationFormValue[] =>
  Object.keys(validations).reduce<DnsValidationFormValue[]>((formValues, validationType) => {
    const responseMatch = validationType as ResponseMatchType;
    validations[responseMatch]?.failIfMatchesRegexp?.forEach(expression => {
      formValues.push({
        expression,
        inverted: false,
        responseMatch: selectableValueFrom(responseMatch),
      });
    });

    validations[responseMatch]?.failIfNotMatchesRegexp?.forEach(expression => {
      formValues.push({
        expression,
        inverted: true,
        responseMatch: selectableValueFrom(responseMatch),
      });
    });
    return formValues;
  }, []);

const getDnsSettingsFormValues = (settings: Settings): DnsSettingsFormValues => {
  const dnsSettings = settings.dns ?? (defaultSettings(CheckType.DNS) as DnsSettings);
  return {
    ...dnsSettings,
    ipVersion: selectableValueFrom(dnsSettings.ipVersion),
    protocol: selectableValueFrom(dnsSettings.protocol),
    recordType: selectableValueFrom(dnsSettings.recordType),
    validRCodes: dnsSettings.validRCodes?.map(responseCode => selectableValueFrom(responseCode)) ?? [],
    validations: getDnsValidations({
      [ResponseMatchType.Answer]: dnsSettings.validateAnswerRRS,
      [ResponseMatchType.Authority]: dnsSettings.validateAuthorityRRS,
      [ResponseMatchType.Additional]: dnsSettings.validateAdditionalRRS,
    }),
  };
};

const getFormSettingsForCheck = (settings: Settings): SettingsFormValues => {
  const type = checkType(settings);
  switch (type) {
    case CheckType.HTTP:
      return { http: getHttpSettingsFormValues(settings) };
    case CheckType.TCP:
      return { tcp: getTcpSettingsFormValues(settings) };
    case CheckType.DNS:
      return { dns: getDnsSettingsFormValues(settings) };
    case CheckType.PING:
    default:
      return { ping: getPingSettingsFormValues(settings) };
  }
};

export const getDefaultValuesFromCheck = (check: Check): CheckFormValues => {
  const defaultCheckType = checkType(check.settings);
  return {
    ...check,
    timeout: check.timeout / 1000,
    frequency: check.frequency / 1000,
    probes: check.probes,
    checkType:
      CHECK_TYPE_OPTIONS.find(checkTypeOption => checkTypeOption.value === defaultCheckType) ?? CHECK_TYPE_OPTIONS[1],
    settings: getFormSettingsForCheck(check.settings),
  };
};

function getValueFromSelectable<T>(selectable: SelectableValue<T>): T {
  if (!selectable.value) {
    throw new Error(`Selected value ${selectable.label} has no value`);
  }
  return selectable.value;
}

function getValuesFromMultiSelectables<T>(selectables: Array<SelectableValue<T>>): T[] {
  return selectables.map(selectable => getValueFromSelectable(selectable));
}

const getHttpSettings = (
  settings: Partial<HttpSettingsFormValues> | undefined = {},
  defaultSettings: HttpSettingsFormValues | undefined
): HttpSettings => {
  if (!defaultSettings) {
    throw new Error('Invalid HTTP settings values');
  }
  const headers = settings.headers ?? defaultSettings.headers;
  const formattedHeaders = headers?.map(header => `${header.name}:${header.value}`);

  const mergedSettings = {
    ...defaultSettings,
    ...settings,
  };

  return {
    ...mergedSettings,
    method: getValueFromSelectable(settings?.method ?? defaultSettings.method),
    headers: formattedHeaders,
    ipVersion: getValueFromSelectable(settings?.ipVersion ?? defaultSettings.ipVersion),
    validStatusCodes: getValuesFromMultiSelectables(settings?.validStatusCodes ?? defaultSettings.validStatusCodes),
    validHTTPVersions: getValuesFromMultiSelectables(settings?.validHTTPVersions ?? defaultSettings.validHTTPVersions),
  };
};

const getTcpSettings = (
  settings: Partial<TcpSettingsFormValues> | undefined,
  defaultSettings: TcpSettingsFormValues | undefined
): TcpSettings => {
  if (!defaultSettings) {
    throw new Error('Invalid TCP settings values');
  }
  const mergedSettings = {
    ...defaultSettings,
    ...settings,
  };
  return {
    ...mergedSettings,
    ipVersion: getValueFromSelectable(settings?.ipVersion ?? defaultSettings.ipVersion),
  };
};

const getPingSettings = (
  settings: Partial<PingSettingsFormValues> | undefined = {},
  defaultSettings: PingSettingsFormValues | undefined
): PingSettings => {
  if (!defaultSettings) {
    throw new Error('Invalid PING settings values');
  }
  const mergedSettings = {
    ...defaultSettings,
    ...settings,
  };
  return {
    ...mergedSettings,
    ipVersion: getValueFromSelectable(settings.ipVersion ?? defaultSettings.ipVersion),
  };
};

type DnsValidations = Pick<DnsSettings, 'validateAdditionalRRS' | 'validateAnswerRRS' | 'validateAuthorityRRS'>;

const getDnsValidationsFromFormValues = (validations: DnsValidationFormValue[]): DnsValidations =>
  validations.reduce<DnsValidations>(
    (acc, validation) => {
      const destinationName = validation.inverted ? 'failIfNotMatchesRegexp' : 'failIfMatchesRegexp';
      const responseMatch = getValueFromSelectable(validation.responseMatch);
      switch (responseMatch) {
        case ResponseMatchType.Additional:
          acc.validateAdditionalRRS![destinationName].push(validation.expression);
          break;
        case ResponseMatchType.Answer:
          acc.validateAnswerRRS![destinationName].push(validation.expression);
          break;
        case ResponseMatchType.Authority:
          acc.validateAuthorityRRS![destinationName].push(validation.expression);
          break;
      }
      return acc;
    },
    {
      validateAnswerRRS: {
        failIfMatchesRegexp: [],
        failIfNotMatchesRegexp: [],
      },
      validateAuthorityRRS: {
        failIfMatchesRegexp: [],
        failIfNotMatchesRegexp: [],
      },
      validateAdditionalRRS: {
        failIfMatchesRegexp: [],
        failIfNotMatchesRegexp: [],
      },
    }
  );

const getDnsSettings = (
  settings: Partial<DnsSettingsFormValues> | undefined,
  defaultSettings: DnsSettingsFormValues | undefined
): DnsSettings => {
  if (!defaultSettings) {
    throw new Error('Invalid DNS settings values');
  }
  const validations = getDnsValidationsFromFormValues(settings?.validations ?? defaultSettings.validations);
  return {
    recordType: getValueFromSelectable(settings?.recordType ?? defaultSettings.recordType),
    server: settings?.server ?? defaultSettings.server,
    ipVersion: getValueFromSelectable(settings?.ipVersion ?? defaultSettings.ipVersion),
    protocol: getValueFromSelectable(settings?.protocol ?? defaultSettings.protocol),
    port: settings?.port ?? defaultSettings.port,
    validRCodes: getValuesFromMultiSelectables(settings?.validRCodes ?? defaultSettings.validRCodes),
    ...validations,
  };
};

const getSettingsFromFormValues = (formValues: Partial<CheckFormValues>, defaultValues: CheckFormValues): Settings => {
  const checkType = getValueFromSelectable(formValues.checkType ?? defaultValues.checkType);
  switch (checkType) {
    case CheckType.HTTP:
      return { http: getHttpSettings(formValues.settings?.http, defaultValues.settings.http) };
    case CheckType.TCP:
      return { tcp: getTcpSettings(formValues.settings?.tcp, defaultValues.settings.tcp) };
    case CheckType.DNS:
      return { dns: getDnsSettings(formValues.settings?.dns, defaultValues.settings.dns) };
    case CheckType.PING:
      return { ping: getPingSettings(formValues.settings?.ping, defaultValues.settings.ping) };
    default:
      throw new Error(`Check type of ${checkType} is invalid`);
  }
};

export const getCheckFromFormValues = (formValues: CheckFormValues, defaultValues: CheckFormValues): Check => {
  return {
    job: formValues.job,
    target: formValues.target,
    enabled: formValues.enabled,
    labels: formValues.labels ?? defaultValues.labels ?? [],
    probes: formValues.probes,
    timeout: formValues.timeout * 1000,
    frequency: formValues.frequency * 1000,
    settings: getSettingsFromFormValues(formValues, defaultValues),
  };
};
