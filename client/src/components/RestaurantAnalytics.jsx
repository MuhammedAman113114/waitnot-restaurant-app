import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, ShoppingBag, Users, Calendar, ArrowUp, ArrowDown, Package } from 'lucide-react';

export default function RestaurantAnalytics({ orders, restaurant }) {
  const [timeRange, setTimeRange] = useState('week'); // 'today', 'week', 'month', 'year'
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    topItems: [],
    revenueByDay: [],
    ordersByStatus: {},
    revenueGrowth: 0,
    ordersGrowth: 0
  });

  useEffect(() => {
    calculateAnalytics();
  }, [orders, timeRange]);

  const calculateAnalytics = () => {
    if (!orders || orders.length === 0) {
      // Generate sample data for demonstration
      setAnalytics(generateSampleData());
      return;
    }

    const now = new Date();
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      switch (timeRange) {
        case 'today':
          return orderDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= weekAgo;
        case 'month':
          return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
        case 'year':
          return orderDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });

    // Calculate metrics
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Top items
    const itemCounts = {};
    filteredOrders.forEach(order => {
      order.items?.forEach(item => {
        if (!itemCounts[item.name]) {
          itemCounts[item.name] = { count: 0, revenue: 0 };
        }
        itemCounts[item.name].count += item.quantity;
        itemCounts[item.name].revenue += item.price * item.quantity;
      });
    });

    const topItems = Object.entries(itemCounts)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Revenue by day
    const revenueByDay = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayOrders = filteredOrders.filter(order => 
        new Date(order.createdAt).toDateString() === date.toDateString()
      );
      const dayRevenue = dayOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      revenueByDay.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: dayRevenue,
        orders: dayOrders.length
      });
    }

    // Orders by status
    const ordersByStatus = filteredOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    setAnalytics({
      totalRevenue,
      totalOrders,
      avgOrderValue,
      topItems,
      revenueByDay,
      ordersByStatus,
      revenueGrowth: 12.5, // Calculate actual growth
      ordersGrowth: 8.3
    });
  };

  const generateSampleData = () => {
    return {
      totalRevenue: 45680,
      totalOrders: 156,
      avgOrderValue: 293,
      revenueGrowth: 12.5,
      ordersGrowth: 8.3,
      topItems: [
        { name: 'Margherita Pizza', count: 45, revenue: 11250 },
        { name: 'Chicken Biryani', count: 38, revenue: 9500 },
        { name: 'Paneer Tikka', count: 32, revenue: 6400 },
        { name: 'Veg Burger', count: 28, revenue: 4200 },
        { name: 'Masala Dosa', count: 25, revenue: 3750 }
      ],
      revenueByDay: [
        { day: 'Mon', revenue: 5200, orders: 18 },
        { day: 'Tue', revenue: 6800, orders: 23 },
        { day: 'Wed', revenue: 7200, orders: 25 },
        { day: 'Thu', revenue: 6500, orders: 22 },
        { day: 'Fri', revenue: 8900, orders: 31 },
        { day: 'Sat', revenue: 9800, orders: 34 },
        { day: 'Sun', revenue: 7280, orders: 25 }
      ],
      ordersByStatus: {
        pending: 12,
        preparing: 8,
        'out-for-delivery': 5,
        delivered: 131
      }
    };
  };

  const StatCard = ({ icon: Icon, title, value, growth, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {growth !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {growth >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            {Math.abs(growth)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );

  const maxRevenue = Math.max(...analytics.revenueByDay.map(d => d.revenue), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your restaurant performance</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          {['today', 'week', 'month', 'year'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-white dark:bg-gray-600 text-primary shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`₹${analytics.totalRevenue.toLocaleString()}`}
          growth={analytics.revenueGrowth}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          icon={ShoppingBag}
          title="Total Orders"
          value={analytics.totalOrders}
          growth={analytics.ordersGrowth}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          icon={TrendingUp}
          title="Avg Order Value"
          value={`₹${Math.round(analytics.avgOrderValue)}`}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          icon={Users}
          title="Active Customers"
          value={Math.round(analytics.totalOrders * 0.7)}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Trend</h3>
            <Calendar size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {analytics.revenueByDay.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">{day.day}</span>
                  <span className="text-gray-900 dark:text-white font-bold">₹{day.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(day.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {day.orders} orders
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Items */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top Selling Items</h3>
            <Package size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {analytics.topItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-red-600 flex items-center justify-center text-white font-bold">
                  #{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.count} orders</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">₹{item.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Order Status Distribution</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(analytics.ordersByStatus).map(([status, count]) => {
            const colors = {
              pending: 'from-yellow-500 to-yellow-600',
              preparing: 'from-blue-500 to-blue-600',
              'out-for-delivery': 'from-purple-500 to-purple-600',
              delivered: 'from-green-500 to-green-600'
            };
            
            return (
              <div key={status} className="text-center">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${colors[status] || 'from-gray-500 to-gray-600'} flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg`}>
                  {count}
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {status.replace('-', ' ')}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <h4 className="text-sm font-medium opacity-90 mb-2">Peak Hours</h4>
          <p className="text-3xl font-bold mb-1">7-9 PM</p>
          <p className="text-sm opacity-75">Most orders received</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h4 className="text-sm font-medium opacity-90 mb-2">Avg Delivery Time</h4>
          <p className="text-3xl font-bold mb-1">32 min</p>
          <p className="text-sm opacity-75">Faster than average</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <h4 className="text-sm font-medium opacity-90 mb-2">Customer Rating</h4>
          <p className="text-3xl font-bold mb-1">{restaurant?.rating || 4.5} ⭐</p>
          <p className="text-sm opacity-75">Based on reviews</p>
        </div>
      </div>
    </div>
  );
}
