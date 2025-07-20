import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Edit3, Save, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useApp } from '../../context/AppContext';

export const Profile: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: state.user?.firstName || '',
    lastName: state.user?.lastName || '',
    email: state.user?.email || '',
    phone: state.user?.phone || '',
    dateOfBirth: state.user?.dateOfBirth || '',
  });

  const handleSave = () => {
    // Update user data
    dispatch({
      type: 'SET_USER',
      payload: {
        ...state.user!,
        ...formData,
      },
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: state.user?.firstName || '',
      lastName: state.user?.lastName || '',
      email: state.user?.email || '',
      phone: state.user?.phone || '',
      dateOfBirth: state.user?.dateOfBirth || '',
    });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold">
                    {state.user?.firstName} {state.user?.lastName}
                  </h1>
                  <p className="text-blue-100 mt-1">{state.user?.email}</p>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Information</h2>
            
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    icon={<User className="w-5 h-5 text-gray-400" />}
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    icon={<User className="w-5 h-5 text-gray-400" />}
                  />
                </div>
                
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  icon={<Mail className="w-5 h-5 text-gray-400" />}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    icon={<Phone className="w-5 h-5 text-gray-400" />}
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    icon={<Calendar className="w-5 h-5 text-gray-400" />}
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button onClick={handleSave} className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">First Name</label>
                      <p className="text-gray-900 font-medium">{state.user?.firstName || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email Address</label>
                      <p className="text-gray-900 font-medium">{state.user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                      <p className="text-gray-900 font-medium">
                        {state.user?.dateOfBirth ? new Date(state.user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Name</label>
                      <p className="text-gray-900 font-medium">{state.user?.lastName || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone Number</label>
                      <p className="text-gray-900 font-medium">{state.user?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Health Summary */}
          <div className="border-t border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Health Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Health Assessments</h3>
                <p className="text-3xl font-bold text-blue-600">{state.predictions.length}</p>
                <p className="text-blue-700 text-sm">Completed assessments</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Last Checkup</h3>
                <p className="text-lg font-bold text-green-600">
                  {state.predictions.length > 0 ? 'Recent' : 'None'}
                </p>
                <p className="text-green-700 text-sm">
                  {state.predictions.length > 0 ? 'Health assessment completed' : 'No assessments yet'}
                </p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Health Score</h3>
                <p className="text-3xl font-bold text-purple-600">Good</p>
                <p className="text-purple-700 text-sm">Overall health status</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};