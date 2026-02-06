import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000, bookings: 240 },
  { month: "Feb", revenue: 3000, bookings: 198 },
  { month: "Mar", revenue: 5000, bookings: 320 },
  { month: "Apr", revenue: 4500, bookings: 278 },
  { month: "May", revenue: 6000, bookings: 389 },
  { month: "Jun", revenue: 5500, bookings: 349 },
  { month: "Jul", revenue: 7000, bookings: 430 },
  { month: "Aug", revenue: 8000, bookings: 520 },
  { month: "Sep", revenue: 7500, bookings: 480 },
  { month: "Oct", revenue: 9000, bookings: 560 },
  { month: "Nov", revenue: 8500, bookings: 530 },
  { month: "Dec", revenue: 10000, bookings: 620 },
];

export const RevenueChart = () => {
  return (
    <div
      className="glass rounded-xl p-6 opacity-0 animate-fade-in"
      style={{ animationDelay: "400ms" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">
            Monthly revenue and bookings
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2" />
            <span className="text-muted-foreground">Bookings</span>
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(174, 72%, 56%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(174, 72%, 56%)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(199, 89%, 48%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(199, 89%, 48%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(217, 33%, 22%)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 14%)",
                border: "1px solid hsl(217, 33%, 22%)",
                borderRadius: "8px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
              labelStyle={{ color: "hsl(210, 40%, 98%)" }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any, name: any) => [
                name === "revenue" ? `$${value.toLocaleString()}` : value,
                name === "revenue" ? "Revenue" : "Bookings",
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(174, 72%, 56%)"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
            <Area
              type="monotone"
              dataKey="bookings"
              stroke="hsl(199, 89%, 48%)"
              strokeWidth={2}
              fill="url(#bookingsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
