import React from 'react';
import { Activity, Calendar, FileText, Users, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

export const Dashboard: React.FC = () => {
  const { state, dispatch } = useApp();

  const stats = [
    {
      label: 'Health Checkups',
      value: state.predictions.length,
      icon: Activity,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      label: 'Consultations',
      value: '3',
      icon: Users,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      label: 'Reports Generated',
      value: state.predictions.length,
      icon: FileText,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      label: 'Upcoming Appointments',
      value: '2',
      icon: Calendar,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  const recentActivity = [
    {
      type: 'checkup',
      title: 'Health Assessment Completed',
      description: 'AI analysis identified potential conditions',
      time: '2 hours ago',
      icon: Activity
    },
    {
      type: 'appointment',
      title: 'Appointment Scheduled',
      description: 'Dr. Sarah Johnson - Jan 15, 2024',
      time: '1 day ago',
      icon: Calendar
    },
    {
      type: 'report',
      title: 'Health Report Downloaded',
      description: 'Comprehensive health analysis report',
      time: '3 days ago',
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {state.user?.firstName}!
              </h1>
              <p className="text-blue-100">
                Track your health journey and stay on top of your wellness goals
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'health-form' })}
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Take Health Assessment
            </Button>
            <Button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'doctors' })}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Find Doctors
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-gray-600 text-sm">{activity.description}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="space-y-4">
              <Button
                onClick={() => dispatch({ type: 'SET_PAGE', payload: 'health-form' })}
                variant="outline"
                className="w-full justify-start"
              >
                <Activity className="w-4 h-4 mr-3" />
                New Health Check
              </Button>
              
              <Button
                onClick={() => dispatch({ type: 'SET_PAGE', payload: 'doctors' })}
                variant="outline"
                className="w-full justify-start"
              >
                <Users className="w-4 h-4 mr-3" />
                Find Doctors
              </Button>
              
              {state.predictions.length > 0 && (
                <Button
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: 'predictions' })}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  View Reports
                </Button>
              )}
              
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Calendar className="w-4 h-4 mr-3" />
                Schedule Appointment
              </Button>
            </div>

            {/* Health Tips */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Today's Health Tip</h3>
              <p className="text-blue-700 text-sm">
                Stay hydrated! Aim for 8 glasses of water daily to maintain optimal health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};