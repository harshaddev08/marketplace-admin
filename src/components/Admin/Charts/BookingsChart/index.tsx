import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Completed", value: 540, color: "hsl(142, 76%, 36%)" },
  { name: "Confirmed", value: 320, color: "hsl(174, 72%, 56%)" },
  { name: "Pending", value: 180, color: "hsl(38, 92%, 50%)" },
  { name: "Cancelled", value: 60, color: "hsl(0, 84%, 60%)" },
];

export const BookingsChart = () => {
  return (
    <div
      className="glass rounded-xl p-6 opacity-0 animate-fade-in"
      style={{ animationDelay: "500ms" }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Bookings by Status</h3>
        <p className="text-sm text-muted-foreground">
          Current month distribution
        </p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 14%)",
                border: "1px solid hsl(217, 33%, 22%)",
                borderRadius: "8px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
              labelStyle={{ color: "hsl(210, 40%, 98%)" }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [value, "Bookings"]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
