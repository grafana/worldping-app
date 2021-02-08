import React, { FC, ChangeEvent } from 'react';
import { useFormContext, Controller, ValidationOptions } from 'react-hook-form';
import { Slider, Input, useStyles } from '@grafana/ui';
import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';

interface Props {
  defaultValue: number;
  min: number;
  max: number;
  name: string;
  id?: string;
  rules: ValidationOptions;
  prefixLabel?: string;
  step?: number;
  suffixLabel?: string;
  invalid?: boolean;
}

const getStyles = (theme: GrafanaTheme) => ({
  container: css`
    display: flex;
    align-items: center;
  `,
  slider: css`
    width: 250px;
    margin-right: ${theme.spacing.sm};
    margin-left: ${theme.spacing.sm};
  `,
  inputGroupWrapper: css`
    margin-top: 1rem;
    display: flex;
    align-items: center;
  `,
  rightMargin: css`
    margin-right: 0.5rem;
  `,
  sliderInput: css`
    width: 40px;
    margin-right: 0.5rem;
  `,
});

export const SliderInput: FC<Props> = ({
  value,
  min,
  max,
  id,
  onChange,
  prefixLabel,
  suffixLabel,
  invalid,
  name,
  step = 1,
  onBlur,
  rules,
  defaultValue,
}) => {
  const styles = useStyles(getStyles);
  const { control, errors } = useFormContext();
  return (
    <div className={styles.container}>
      {prefixLabel}
      <div className={styles.slider}>
        <Controller
          as={Slider}
          control={control}
          rules={rules}
          name={name}
          tooltipAlwaysVisible={false}
          css={styles.slider}
          min={min}
          max={max}
          step={step}
          defaultValue={[defaultValue]}
        />
      </div>
      {suffixLabel}
    </div>
  );
};
