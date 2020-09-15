import React, { FC } from 'react';
import { css } from 'emotion';
import { HorizontalGroup, Input, IconButton, VerticalGroup, Icon, Button, Field } from '@grafana/ui';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  limit: number;
  disabled?: boolean;
  label: string;
  validateName?: (name: string) => string | undefined;
  validateValue?: (value: string) => string | undefined;
}

export const NameValueInput: FC<Props> = ({ name, disabled, limit, label, validateName, validateValue }) => {
  const { register, control, errors } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });
  return (
    <VerticalGroup justify="space-between">
      {fields.map((field, index) => (
        <HorizontalGroup key={field.id} align="flex-start">
          <Field
            invalid={Boolean(errors[name]?.[index]?.name)}
            error={errors[name]?.[index]?.name?.message}
            className={css`
              margin-bottom: 0;
            `}
          >
            <Input
              ref={register({ validate: validateName, required: true })}
              name={`${name}[${index}].name`}
              type="text"
              placeholder="name"
              disabled={disabled}
            />
          </Field>
          <Field
            invalid={Boolean(errors[name]?.[index]?.value)}
            error={errors[name]?.[index]?.value?.message}
            className={css`
              margin-bottom: 0;
            `}
          >
            <Input
              ref={register({ validate: validateValue, required: true })}
              name={`${name}[${index}].value`}
              type="text"
              placeholder="value"
              disabled={disabled}
            />
          </Field>
          <IconButton name="minus-circle" type="button" onClick={() => remove(index)} disabled={disabled} />
        </HorizontalGroup>
      ))}
      {fields.length < limit && (
        <Button
          onClick={() => append({ name: '', value: '' })}
          disabled={disabled}
          variant="secondary"
          size="sm"
          type="button"
        >
          <Icon name="plus" />
          &nbsp; Add {label}
        </Button>
      )}
    </VerticalGroup>
  );
};