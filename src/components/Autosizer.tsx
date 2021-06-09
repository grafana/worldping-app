import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import React, { useRef, useEffect, useState } from 'react';
import { css } from '@emotion/css';

interface ChildrenArgs {
  width: number;
  height: number;
}

interface Props {
  children: (dimensions: ChildrenArgs) => JSX.Element;
}

const getStyles = (theme: GrafanaTheme2) => ({
  fill: css`
    flex-grow: 1;
    max-width: 100%;
    display: flex;
    justify-content: center;
  `,
  fillContainer: css`
    display: flex;
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  `,
});

export const Autosizer = ({ children }: Props) => {
  const el = useRef<HTMLDivElement>(null);
  const styles = useStyles2(getStyles);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const rect = el.current?.getBoundingClientRect();
    if (rect) {
      setSize({ width: rect.width, height: rect.height });
    }
  }, [el]);

  return (
    <div className={styles.fillContainer}>
      <div className={styles.fill} ref={el}>
        {children(size)}
      </div>
    </div>
  );
};
