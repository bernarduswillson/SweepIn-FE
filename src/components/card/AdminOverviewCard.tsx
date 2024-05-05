import FetchedCount from '@/interface/FetchedCount'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface OverviewCardProps {
    data: FetchedCount[]
}

const OverviewCard = (props: OverviewCardProps): JSX.Element => {
  const { data } = props
  return (
      <ResponsiveContainer width='100%' height={350}>
          <AreaChart data={data}>
              <defs>
                  <linearGradient id="colorStart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEnd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReport" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D884AA" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#D884AA" stopOpacity={0}/>
                  </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="PresensiAwal" stroke="#8884d8" fillOpacity={1} fill="url(#colorStart)" />
              <Area type="monotone" dataKey="PresensiAkhir" stroke="#82ca9d" fillOpacity={1} fill="url(#colorEnd)" />
              <Area type="monotone" dataKey="Laporan" stroke="#D884AA" fillOpacity={1} fill="url(#colorReport)" />
          </AreaChart>
      </ResponsiveContainer>
  )
}

export default OverviewCard