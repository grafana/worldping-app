import React, { FC, Fragment } from 'react';
import { TextArea, Input, Button, useStyles } from '@grafana/ui';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { SubCollapse } from 'components/SubCollapse';
import { GrafanaTheme } from '@grafana/data';
import { css } from 'emotion';

interface Props {}

const NAME = 'alert.annotations';

const getStyles = (theme: GrafanaTheme) => ({
  grid: css`
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    grid-column-gap: ${theme.spacing.lg};
    grid-row-gap: ${theme.spacing.sm};
  `,
});

export const AlertAnnotations: FC<Props> = () => {
  const styles = useStyles(getStyles);
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: NAME,
  });
  return (
    <SubCollapse title="Annotations">
      <div className={styles.grid}>
        {fields.length ? (
          <>
            <span>Name</span>
            <span>Annotation</span>
            <div />
          </>
        ) : null}
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <Input ref={register()} name={`${NAME}[${index}].key`} placeholder="Name" />
            <TextArea ref={register()} name={`${NAME}[${index}].value`} placeholder="Value" />
            <Button type="button" onClick={() => remove(index)} variant="link">
              Delete
            </Button>
          </Fragment>
        ))}
      </div>
      <Button type="button" variant="link" icon="plus" onClick={() => append({})}>
        Add annotation
      </Button>
    </SubCollapse>
  );
};
