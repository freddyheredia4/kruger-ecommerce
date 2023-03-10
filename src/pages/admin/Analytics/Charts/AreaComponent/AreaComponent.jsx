import "./AreaComponent.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import { useState } from "react";

const AreaComponent = ({ customers, orders }) => {
  const [totalVentas, setTotalVentas] = useState(0);
  useEffect(() => {
    const ventas = orders?.reduce((acc, it) => acc + it.totalPrice, 0);

    setTotalVentas(ventas);
  }, [orders]);

  const data = [
    {
      name: "Customers",
      uv: customers?.length,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Pedidos",
      uv: orders?.length,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Ventas",
      uv: totalVentas,
      pv: 9800,
      amt: 2290,
    } /*,
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },*/,
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        className="floating"
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a1ff69" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#a1ff69" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#a1ff69"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaComponent;
