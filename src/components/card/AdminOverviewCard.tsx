import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// TODO: Replace with real data
const data = [
    {
      "date": "1 Mei",
      "masuk": 4000,
      "keluar": 2400,
      "laporan": 2400
    },
    {
      "date": "2 Mei",
      "masuk": 3000,
      "keluar": 1398,
      "laporan": 2210
    },
    {
      "date": "3 Mei",
      "masuk": 2000,
      "keluar": 9800,
      "laporan": 2290
    },
    {
      "date": "4 Mei",
      "masuk": 2780,
      "keluar": 3908,
      "laporan": 2000
    },
    {
      "date": "5 Mei",
      "masuk": 1890,
      "keluar": 4800,
      "laporan": 2181
    },
    {
      "date": "6 Mei",
      "masuk": 2390,
      "keluar": 3800,
      "laporan": 2500
    },
    {
      "date": "7 Mei",
      "masuk": 3490,
      "keluar": 4300,
      "laporan": 2100
    }
  ]

function Overview() {
    return (
        <ResponsiveContainer width='100%' height={350}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorMasuk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorKeluar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLaporan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D884AA" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#D884AA" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="masuk" stroke="#8884d8" fillOpacity={1} fill="url(#colorMasuk)" />
                <Area type="monotone" dataKey="keluar" stroke="#82ca9d" fillOpacity={1} fill="url(#colorKeluar)" />
                <Area type="monotone" dataKey="laporan" stroke="#D884AA" fillOpacity={1} fill="url(#colorLaporan)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default Overview