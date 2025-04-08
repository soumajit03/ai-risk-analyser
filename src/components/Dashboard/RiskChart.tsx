
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';

interface RiskChartProps {
  data: any[];
  type: 'bar' | 'pie';
  colors?: string[];
}

export function RiskChart({ data, type, colors = ['#1A365D', '#2A4365', '#2C5282', '#2B6CB0'] }: RiskChartProps) {
  if (type === 'pie') {
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelStyle={{ fill: 'var(--foreground)' }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'var(--popover)', color: 'var(--popover-foreground)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" tick={{ fill: 'var(--foreground)' }} />
          <YAxis tick={{ fill: 'var(--foreground)' }} />
          <Tooltip contentStyle={{ backgroundColor: 'var(--popover)', color: 'var(--popover-foreground)' }} />
          <Bar dataKey="value" fill={colors[0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
