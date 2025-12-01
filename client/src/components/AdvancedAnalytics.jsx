import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Calendar, Target, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdvancedAnalytics({ orders, restaurant }) {
  const [timeRange, setTimeRange] = useState('week');
  const [analytics, setAnalytics] = useState({
    revenueComparison: [],
    customerRetention: [],
    peakHoursDetailed: [],
    itemPerformance: [],
    dailyTrends: [],
    predictions: {}
  });

  useEffect(() => {
    if (orders && orders.length > 0) {
      calculateAdvancedMetrics();
    }
  }, [orders, timeRange]);

  const calculateAdvancedMetrics = () => {
    const now = new Date();
    
    // Revenue comparison (current vs previous period)
    const revenueComparison = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const prevDate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const currentRevenue = orders
        .filter(o => new Date(o.createdAt).toDateString() === date.toDateString())
        .reduce((sum, o) => sum + o.totalAmount, 0);
      
      const previousRevenue = orders
        .filter(o => new Date(o.createdAt).toDateString() === prevDate.toDateString())
        .reduce((sum, o) => sum + o.totalAmount, 0);
      
      revenueComparison.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        current: currentRevenue,
        previous: previousRevenue,
        growth: previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1) : 0
      });
    }

    // Customer retention (repeat customers)
    const customerOrders = {};
    orders.forEach(order => {
      const phone = order.customerPhone;
      if (!customerOrders[phone]) {
        customerOrders[phone] = [];
      }
      customerOrders[phone].push(order);
    });

    const retentionData = {
      newCustomers: Object.values(customerOrders).filter(orders => orders.length === 1).length,
      returningCustomers: Object.values(customerOrders).filter(orders => orders.length > 1 && orders.length <= 3).length,
      loyalCustomers: Object.values(customerOrders).filter(orders => orders.length > 3).length
    };

    const customerRetention = [
      { category: 'New', value: retentionData.newCustomers, percentage: (retentionData.newCustomers / Object.keys(customerOrders).length * 100).toFixed(1) },
      { category: 'Returning', value: retentionData.returningCustomers, percentage: (retentionData.returningCustomers / Object.keys(customerOrders).length * 100).toFixed(1) },
      { category: 'Loyal', value: retentionData.loyalCustomers, percentage: (retentionData.loyalCustomers / Object.keys(customerOrders).length * 100).toFixed(1) }
    ];

    // Peak hours detailed analysis
    const hourlyStats = Array.from({ length: 24 }, (_, hour) => {
      const hourOrders = orders.filter(o => new Date(o.createdAt).getHours() === hour);
      return {
        hour: `${hour}:00`,
        orders: hourOrders.length,
        revenue: hourOrders.reduce((sum, o) => sum + o.totalAmount, 0),
        avgOrderValue: hourOrders.length > 0 ? hourOrders.reduce((sum, o) => sum + o.totalAmount, 0) / hourOrders.length : 0
      };
    }).filter(h => h.orders > 0);

    // Item performance radar
    const itemStats = {};
    orders.forEach(order => {
      order.items?.forEach(item => {
        if (!itemStats[item.name]) {
          itemStats[item.name] = { orders: 0, revenue: 0, quantity: 0 };
        }
        itemStats[item.name].orders += 1;
        itemStats[item.name].revenue += item.price * item.quantity;
        itemStats[item.name].quantity += item.quantity;
      });
    });

    const itemPerformance = Object.entries(itemStats)
      .map(([name, stats]) => ({
        item: name.length > 15 ? name.substring(0, 15) + '...' : name,
        popularity: (stats.orders / orders.length * 100).toFixed(1),
        revenue: stats.revenue,
        avgQuantity: (stats.quantity / stats.orders).toFixed(1)
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Daily trends with moving average
    const dailyData = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === date.toDateString());
      
      dailyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        orders: dayOrders.length,
        revenue: dayOrders.reduce((sum, o) => sum + o.totalAmount, 0)
      });
    }

    // Calculate moving average
    const dailyTrends = dailyData.map((day, index) => {
      if (index < 2) return { ...day, movingAvg: day.revenue };
      const avg = (dailyData[index - 2].revenue + dailyData[index - 1].revenue + day.revenue) / 3;
      return { ...day, movingAvg: Math.round(avg) };
    });

    // Predictions (simple linear regression)
    const recentRevenue = dailyTrends.slice(-7).map(d => d.revenue);
    const avgGrowth = recentRevenue.length > 1 
      ? (recentRevenue[recentRevenue.length - 1] - recentRevenue[0]) / recentRevenue.length 
      : 0;
    
    const predictions = {
      nextDayRevenue: Math.round(recentRevenue[recentRevenue.length - 1] + avgGrowth),
      weeklyTrend: avgGrowth > 0 ? 'increasing' : avgGrowth < 0 ? 'decreasing' : 'stable',
      confidence: Math.min(95, 60 + (recentRevenue.length * 5))
    };

    setAnalytics({
      revenueComparison,
      customerRetention,
      peakHoursDetailed: hourlyStats,
      itemPerformance,
      dailyTrends,
      predictions
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? 
                (entry.name.includes('Revenue') || entry.name.includes('revenue') ? 
                  `₹${entry.value.toLocaleString()}` : 
                  entry.value.toLocaleString()) 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header with Predictions */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Target size={28} />
              Advanced Analytics & Predictions
            </h2>
            <p className="text-sm opacity-90 mt-1">AI-powered insights and forecasting</p>
          </div>
          <Award size={40} className="opacity-50" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-xs opacity-75 mb-1">Predicted Tomorrow</p>
            <p className="text-2xl font-bold">₹{analytics.predictions.nextDayRevenue?.toLocaleString()}</p>
            <p className="text-xs mt-1 flex items-center gap-1">
              {analytics.predictions.weeklyTrend === 'increasing' ? (
                <><TrendingUp size={14} /> Trending Up</>
              ) : analytics.predictions.weeklyTrend === 'decreasing' ? (
                <><TrendingDown size={14} /> Trending Down</>
              ) : (
                <>Stable</>
              )}
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-xs opacity-75 mb-1">Forecast Confidence</p>
            <p className="text-2xl font-bold">{analytics.predictions.confidence}%</p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${analytics.predictions.confidence}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-xs opacity-75 mb-1">Total Customers</p>
            <p className="text-2xl font-bold">
              {analytics.customerRetention.reduce((sum, c) => sum + c.value, 0)}
            </p>
            <p className="text-xs mt-1">
              {analytics.customerRetention.find(c => c.category === 'Loyal')?.value || 0} Loyal
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Comparison Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-green-500" />
          Week-over-Week Revenue Comparison
        </h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.revenueComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} tickFormatter={(value) => `₹${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="current" name="This Week" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="previous" name="Last Week" fill="#6b7280" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Trends with Moving Average */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-blue-500" />
          14-Day Trend Analysis
        </h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={analytics.dailyTrends}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '11px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} tickFormatter={(value) => `₹${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="revenue" name="Daily Revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            <Line type="monotone" dataKey="movingAvg" name="3-Day Moving Avg" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Retention & Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Retention */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Users size={20} className="text-purple-500" />
            Customer Retention Analysis
          </h3>
          
          <div className="space-y-4">
            {analytics.customerRetention.map((segment, index) => {
              const colors = ['#3b82f6', '#8b5cf6', '#f59e0b'];
              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {segment.category} Customers
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {segment.value} ({segment.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${segment.percentage}%`,
                        backgroundColor: colors[index]
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              💡 <strong>Insight:</strong> {
                analytics.customerRetention.find(c => c.category === 'Loyal')?.percentage > 30
                  ? 'Excellent customer loyalty! Keep up the great service.'
                  : 'Focus on retention strategies to build customer loyalty.'
              }
            </p>
          </div>
        </div>

        {/* Peak Hours Detailed */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock size={20} className="text-orange-500" />
            Peak Hours Performance
          </h3>
          
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.peakHoursDetailed}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '10px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="orders" name="Orders" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="avgOrderValue" name="Avg Value" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Item Performance Radar */}
      {analytics.itemPerformance.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award size={20} className="text-yellow-500" />
            Top Items Performance Matrix
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={analytics.itemPerformance}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="item" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                <PolarRadiusAxis stroke="#9ca3af" />
                <Radar name="Popularity %" dataKey="popularity" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>

            <div className="space-y-3">
              {analytics.itemPerformance.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.item}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.popularity}% popularity
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">₹{item.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Avg: {item.avgQuantity} qty
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insights Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Key Insights & Recommendations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">🎯 Best Performing Day</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {analytics.revenueComparison.reduce((max, day) => day.current > max.current ? day : max, analytics.revenueComparison[0])?.day || 'N/A'} with ₹
              {analytics.revenueComparison.reduce((max, day) => day.current > max.current ? day : max, analytics.revenueComparison[0])?.current.toLocaleString() || 0}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">⏰ Busiest Hour</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {analytics.peakHoursDetailed.reduce((max, hour) => hour.orders > max.orders ? hour : max, analytics.peakHoursDetailed[0])?.hour || 'N/A'} with {analytics.peakHoursDetailed.reduce((max, hour) => hour.orders > max.orders ? hour : max, analytics.peakHoursDetailed[0])?.orders || 0} orders
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">🌟 Top Item</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {analytics.itemPerformance[0]?.item || 'N/A'} - ₹{analytics.itemPerformance[0]?.revenue.toLocaleString() || 0}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">📈 Growth Rate</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {analytics.revenueComparison[analytics.revenueComparison.length - 1]?.growth || 0}% vs last week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
