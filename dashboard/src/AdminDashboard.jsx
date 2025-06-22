import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  Calendar, Users, ShoppingCart, TrendingUp, Settings, Sun, Moon,
  Bell, Search, Filter, ChevronLeft, ChevronRight, Plus, MoreHorizontal,
  Edit, Trash2, Eye, Download, Upload, Grid, List, X
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [salesData] = useState([
    { month: 'Jan', sales: 4000, revenue: 2400, orders: 240 },
    { month: 'Feb', sales: 3000, revenue: 1398, orders: 221 },
    { month: 'Mar', sales: 2000, revenue: 9800, orders: 229 },
    { month: 'Apr', sales: 2780, revenue: 3908, orders: 200 },
    { month: 'May', sales: 1890, revenue: 4800, orders: 218 },
    { month: 'Jun', sales: 2390, revenue: 3800, orders: 250 },
    { month: 'Jul', sales: 3490, revenue: 4300, orders: 210 },
    { month: 'Aug', sales: 2990, revenue: 3500, orders: 230 },
    { month: 'Sep', sales: 3890, revenue: 4700, orders: 245 },
    { month: 'Oct', sales: 3290, revenue: 3900, orders: 225 },
    { month: 'Nov', sales: 4190, revenue: 5100, orders: 260 },
    { month: 'Dec', sales: 4790, revenue: 5800, orders: 280 }
  ]);

  const [pieData] = useState([
    { name: 'Desktop', value: 400, color: '#0088FE' },
    { name: 'Mobile', value: 300, color: '#00C49F' },
    { name: 'Tablet', value: 200, color: '#FFBB28' },
    { name: 'Other', value: 100, color: '#FF8042' },
    { name: 'Laptop', value: 150, color: '#8884D8' },
    { name: 'Smart TV', value: 50, color: '#82CA9D' }
  ]);

  const [tableData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-16' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-12' },
    { id: 6, name: 'Diana Miller', email: 'diana@example.com', role: 'Admin', status: 'Inactive', lastLogin: '2024-01-05' }
  ]);

  const [kanbanTasks, setKanbanTasks] = useState({
    todo: [
      { id: 1, title: 'Design new landing page', priority: 'High', assignee: 'John' },
      { id: 2, title: 'Fix mobile responsiveness', priority: 'Medium', assignee: 'Jane' },
      { id: 7, title: 'Update user profile page', priority: 'Low', assignee: 'Alice' }
    ],
    inProgress: [
      { id: 3, title: 'Implement user authentication', priority: 'High', assignee: 'Bob' },
      { id: 4, title: 'Update documentation', priority: 'Low', assignee: 'Alice' },
      { id: 8, title: 'Optimize database queries', priority: 'Medium', assignee: 'Charlie' }
    ],
    done: [
      { id: 5, title: 'Setup CI/CD pipeline', priority: 'Medium', assignee: 'John' },
      { id: 6, title: 'Refactor CSS styles', priority: 'Low', assignee: 'Diana' }
    ]
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events] = useState([
    { date: '2024-01-20', title: 'Team Meeting', type: 'meeting' },
    { date: '2024-01-22', title: 'Product Launch', type: 'event' },
    { date: '2024-01-25', title: 'Client Presentation', type: 'presentation' },
    { date: '2024-02-05', title: 'Sprint Review', type: 'meeting' },
    { date: '2024-02-15', title: 'Workshop', type: 'event' }
  ]);

  const themeClasses = {
    light: {
      bg: 'bg-gray-50',
      cardBg: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      sidebar: 'bg-white border-gray-200',
      primary: 'bg-[#74000b]',
      primaryHover: 'hover:bg-[#9c000f]',
      primaryText: 'text-white',
    },
    dark: {
      bg: 'bg-gray-900',
      cardBg: 'bg-gray-800',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700',
      sidebar: 'bg-gray-800 border-gray-700',
      primary: 'bg-[#74000b]',
      primaryHover: 'hover:bg-[#9c000f]',
      primaryText: 'text-white',
    }
  };

  const currentTheme = themeClasses[theme];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const formatDate = (date) => date.toISOString().split('T')[0];

  const getEventForDate = (date) => events.find(event => event.date === date);

  const handleDragStart = (e, task, column) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ task, sourceColumn: column }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { task, sourceColumn } = data;

    if (sourceColumn === targetColumn) return;

    setKanbanTasks(prev => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(t => t.id !== task.id),
      [targetColumn]: [...prev[targetColumn], task]
    }));
  };

  const Sidebar = () => (
    <div className={`${currentTheme.sidebar} ${sidebarCollapsed ? 'w-16' : 'w-64'} min-h-screen border-r ${currentTheme.border} transition-all duration-300`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && <h2 className={`text-xl font-bold ${currentTheme.text}`}>Admin Panel</h2>}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${currentTheme.text} cursor-pointer`}
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      <nav className="mt-8">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Grid },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'calendar', label: 'Calendar', icon: Calendar },
          { id: 'kanban', label: 'Kanban', icon: List },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900 border-r-2 border-blue-500' : ''
              } ${currentTheme.text}`}
            >
              <Icon size={20} className="mr-3" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );

  const Header = () => (
    <header className={`${currentTheme.cardBg} border-b ${currentTheme.border} px-6 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className={`text-2xl font-semibold ${currentTheme.text} capitalize`}>{activeTab}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.textSecondary}`} size={16} />
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 border ${currentTheme.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.cardBg} ${currentTheme.text}`}
            />
          </div>

          <button className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${currentTheme.text} cursor-pointer`}>
            <Bell size={20} />
          </button>

          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${currentTheme.text} cursor-pointer`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="w-8 h-8 bg-[#74000b] rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
            A
          </div>
        </div>
      </div>
    </header>
  );

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className={`${currentTheme.cardBg} p-6 rounded-lg shadow-sm border ${currentTheme.border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${currentTheme.textSecondary} text-sm`}>{title}</p>
          <p className={`${currentTheme.text} text-2xl font-semibold mt-1`}>{value}</p>
          <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}% from last month
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const DataTable = () => (
    <div className={`${currentTheme.cardBg} rounded-lg shadow-sm border ${currentTheme.border}`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Users Management</h3>
          <div className="flex items-center space-x-2">
            <button className={`px-4 py-2 ${currentTheme.primary} ${currentTheme.primaryText} rounded-lg ${currentTheme.primaryHover} flex items-center cursor-pointer`}>
              <Plus size={16} className="mr-2" />
              Add User
            </button>
            <button className={`p-2 border ${currentTheme.border} rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 ${currentTheme.text} cursor-pointer`}>
              <Filter size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${currentTheme.textSecondary} uppercase tracking-wider`}>Name</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${currentTheme.textSecondary} uppercase tracking-wider`}>Email</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${currentTheme.textSecondary} uppercase tracking-wider`}>Role</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${currentTheme.textSecondary} uppercase tracking-wider`}>Status</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${currentTheme.textSecondary} uppercase tracking-wider`}>Last Login</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${currentTheme.textSecondary} uppercase tracking-wider`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tableData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className={`px-6 py-4 whitespace-nowrap ${currentTheme.text}`}>{user.name}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${currentTheme.textSecondary}`}>{user.email}</td>
                <td className={`px-6 py-4 whitespace-nowrap`}>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'Moderator' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${currentTheme.textSecondary}`}>{user.lastLogin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 cursor-pointer">
                      <Eye size={16} />
                    </button>
                    <button className="text-green-600 hover:text-green-900 cursor-pointer">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900 cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CalendarView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = formatDate(date);
      const event = getEventForDate(dateString);
      const isSelected = selectedDate === dateString;
      const isToday = dateString === formatDate(new Date());

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(dateString)}
          className={`h-24 p-2 border ${currentTheme.border} cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
            isSelected ? 'bg-blue-50 dark:bg-blue-900' : ''
          } ${isToday ? 'bg-yellow-50 dark:bg-yellow-900' : ''}`}
        >
          <div className={`font-semibold ${currentTheme.text}`}>{day}</div>
          {event && (
            <div className={`text-xs mt-1 p-1 rounded ${
              event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
              event.type === 'event' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {event.title}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={`${currentTheme.cardBg} rounded-lg shadow-sm border ${currentTheme.border} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${currentTheme.text}`}>
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${currentTheme.text} cursor-pointer`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className={`px-4 py-2 ${currentTheme.primary} ${currentTheme.primaryText} rounded-lg ${currentTheme.primaryHover} cursor-pointer`}
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${currentTheme.text} cursor-pointer`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className={`p-2 text-center font-medium ${currentTheme.textSecondary}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  const KanbanBoard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(kanbanTasks).map(([column, tasks]) => (
        <div
          key={column}
          className={`${currentTheme.cardBg} rounded-lg shadow-sm border ${currentTheme.border} p-4`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column)}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${currentTheme.text} capitalize`}>
              {column.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs ${currentTheme.textSecondary} bg-gray-100 dark:bg-gray-700`}>
              {tasks.length}
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task, column)}
                className={`p-3 rounded-lg border ${currentTheme.border} cursor-move hover:shadow-md transition-shadow ${currentTheme.cardBg === 'bg-white' ? 'bg-gray-50' : 'bg-gray-700'}`}
              >
                <h4 className={`font-medium ${currentTheme.text} mb-2`}>{task.title}</h4>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                  <span className={`text-xs ${currentTheme.textSecondary}`}>{task.assignee}</span>
                </div>
              </div>
            ))}
          </div>

          <button className={`w-full mt-4 p-2 border-2 border-dashed ${currentTheme.border} rounded-lg ${currentTheme.textSecondary} hover:border-blue-400 hover:text-blue-400 transition-colors cursor-pointer`}>
            + Add Card
          </button>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Users" value="2,543" change={12} icon={Users} color="bg-blue-500" />
              <StatCard title="Total Orders" value="1,234" change={-2} icon={ShoppingCart} color="bg-green-500" />
              <StatCard title="Revenue" value="$45,678" change={18} icon={TrendingUp} color="bg-purple-500" />
              <StatCard title="Growth" value="23%" change={5} icon={TrendingUp} color="bg-orange-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`${currentTheme.cardBg} p-6 rounded-lg shadow-sm border ${currentTheme.border}`}>
                <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>Sales Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className={`${currentTheme.cardBg} p-6 rounded-lg shadow-sm border ${currentTheme.border}`}>
                <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>Traffic Sources</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`${currentTheme.cardBg} p-6 rounded-lg shadow-sm border ${currentTheme.border}`}>
              <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>Revenue Trends</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="orders" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'users':
        return <DataTable />;

      case 'analytics':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${currentTheme.cardBg} p-6 rounded-lg shadow-sm border ${currentTheme.border}`}>
              <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>Monthly Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={`${currentTheme.cardBg} p-6 rounded-lg shadow-sm border ${currentTheme.border}`}>
              <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>Growth Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#ff7c7c" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'calendar':
        return <CalendarView />;

      case 'kanban':
        return <KanbanBoard />;

      case 'settings':
        return (
          <div className={`${currentTheme.cardBg} p-6 rounded-lg shadow-sm border ${currentTheme.border}`}>
            <h3 className={`text-lg font-semibold mb-6 ${currentTheme.text}`}>Settings</h3>
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Theme</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-4 py-2 rounded-lg border ${
                      theme === 'light' ? 'border-blue-500 bg-blue-50 text-blue-700' : `border-gray-300 ${currentTheme.text}`
                    } cursor-pointer`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-4 py-2 rounded-lg border ${
                      theme === 'dark' ? 'border-blue-500 bg-blue-50 text-blue-700' : `border-gray-300 ${currentTheme.text}`
                    } cursor-pointer`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Notifications</label>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className={`ml-2 ${currentTheme.text}`}>Email notifications</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className={`ml-2 ${currentTheme.text}`}>Push notifications</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className={`ml-2 ${currentTheme.text}`}>SMS notifications</span>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button className={`px-4 py-2 ${currentTheme.primary} ${currentTheme.primaryText} rounded-lg ${currentTheme.primaryHover} cursor-pointer`}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <div className={`${currentTheme.text}`}>Content not found</div>;
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-300`}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
