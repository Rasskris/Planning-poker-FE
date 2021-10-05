import React, { FC } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import classes from './PieChart.module.scss';
import { getRandomLightColor } from '../../utils/getRandomLightColor';

export interface IStatistics {
  name: string;
  value: number;
}

const getColors = (data: Array<IStatistics>) => {
  return data.map(() => getRandomLightColor());
};

const RADIAN = Math.PI / 180;
const PIE_SIZE = 200;

interface labelValues {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const renderLabel: FC<labelValues> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const value = `${(percent * 100).toFixed(0)}%`;
  return (
    <text x={x} y={y} fill="black" className={classes.text} textAnchor="middle" dominantBaseline="central">
      {value}
    </text>
  );
};

const PieChartComponent: FC<{ data: Array<IStatistics> }> = ({ data }) => {
  return (
    <PieChart width={PIE_SIZE} height={PIE_SIZE}>
      <Pie data={data} labelLine={false} label={renderLabel} dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${entry.name}`} fill={getColors(data)[index % getColors(data).length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export { PieChartComponent };
