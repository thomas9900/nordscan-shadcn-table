'use client';

import { Card } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Jan',
    hours: Math.floor(Math.random() * 100) + 200,
  },
  {
    name: 'Feb',
    hours: Math.floor(Math.random() * 100) + 200,
  },
  {
    name: 'Mar',
    hours: Math.floor(Math.random() * 100) + 200,
  },
  {
    name: 'Apr',
    hours: Math.floor(Math.random() * 100) + 200,
  },
  {
    name: 'May',
    hours: Math.floor(Math.random() * 100) + 200,
  },
  {
    name: 'Jun',
    hours: Math.floor(Math.random() * 100) + 200,
  },
  {
    name: 'Jul',
    hours: Math.floor(Math.random() * 100) + 200,
  },
  {
    name: 'Aug',
    hours: Math.floor(Math.random() * 100) + 200,
  },
  {
    name: 'Sep',
    hours: Math.floor(Math.random() * 100) + 200,
  },
  {
    name: 'Oct',
    hours: Math.floor(Math.random() * 100) + 200,
  },
  {
    name: 'Nov',
    hours: Math.floor(Math.random() * 100) + 200,
  },
  {
    name: 'Dec',
    hours: Math.floor(Math.random() * 100) + 200,
  },
];

export function Overview() {
  return (
    <Card className="p-3 mt-2 mb-20">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} h`}
          />
          <Bar dataKey="hours" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
