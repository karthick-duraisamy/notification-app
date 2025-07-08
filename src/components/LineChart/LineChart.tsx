import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ChartDataItem = {
  group: string;
  sent_count: number;
  not_sent_count: number;
};

type ProcessedDataItem = {
  day: string;
  sent: number;
  notSent: number;
};

const CustomTooltip = ({ active, payload }: any) => {
  sessionStorage.getItem('intervalInfo');
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '8px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        {sessionStorage.getItem('intervalInfo') === '1' ? (
          <>
            <p style={{ color: 'blue' }}>Date : {sessionStorage.getItem('intervaldate')}</p>
            <p style={{ color: 'blue' }}>Time : {payload[0]?.payload?.day?.toLocaleString()}</p>
          </>
        ) : (
          <p style={{ color: 'blue' }}>Date : {payload[0]?.payload?.day?.toLocaleString()}</p>
        )}

        <p style={{ color: '#25D366' }}>Sent : {payload[0].value.toLocaleString()}</p>
        <p style={{ color: '#FF0000' }}>Not-sent : {payload[1].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

function formatDateValue(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date).toLowerCase();
}

const processChartData = (chartdata?: ChartDataItem[], interval?: string): ProcessedDataItem[] => {
  if (!chartdata || !interval) return [];

  const data: ProcessedDataItem[] = [];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

  chartdata.forEach((dataInfo) => {
    const date = new Date(dataInfo.group);

    const day = interval.includes('week')
      ? daysOfWeek[date.getDay()]
      : interval.includes('yesterday') || interval.includes('today')
        ? formatDate(dataInfo.group)
        : formatter.format(date);

    data.push({
      day,
      sent: dataInfo.sent_count,
      notSent: dataInfo.not_sent_count
    });
  });

  return data;
};

function formatDate(input: string, showDate = false): string {
  const date = new Date(input);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  if (showDate) {
    options.month = 'short';
    options.day = 'numeric';
  }

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

const DrawLineChart = ({ data, interval }: any) => {
  if (data?.length > 0) {
    let dateValue = formatDateValue(data[0].group);
    sessionStorage.setItem('intervalInfo', interval.includes('yesterday') || interval.includes('today') ? '1' : '0');
    sessionStorage.setItem(
      'intervaldate',
      interval.includes('yesterday') || interval.includes('today')
        ? dateValue.charAt(0).toUpperCase() + dateValue.slice(1)
        : '0'
    );
  }
  let chartData = processChartData(data, interval);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} /> {/* Hide X-axis line */}
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => (value === 30000 ? `${value} +` : value.toLocaleString())}
          axisLine={false}
          label={{ value: '', position: 'insideLeft', angle: -90, style: { textAnchor: 'middle', fontSize: 14 } }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <Line
          type="monotone"
          dataKey="sent"
          stroke="#25D366"
          strokeWidth={2.5}
          dot={{ stroke: '#25D366', strokeWidth: 2, fill: '#ffffff', r: 4 }}
          activeDot={{
            stroke: '#25D366',
            strokeWidth: 2,
            r: 6,
            fill: '#ffffff'
          }}
        />
        <Line
          type="monotone"
          dataKey="notSent"
          stroke="#FF0000"
          strokeWidth={2.5}
          dot={{ stroke: '#FF0000', strokeWidth: 2, fill: '#ffffff', r: 4 }}
          activeDot={{
            stroke: '#FF0000',
            strokeWidth: 2,
            r: 6,
            fill: '#ffffff'
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DrawLineChart;
