import React, { useState, useEffect } from 'react';
import { MapPin, Star, Video, User, Calendar, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useApp } from '../../context/AppContext';
import { Doctor } from '../../types';

const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Internal Medicine',
    rating: 4.8,
    experience: 12,
    consultationFee: 150,
    availability: { virtual: true, inPerson: true },
    image: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=SJ',
    location: 'Downtown Medical Center',
    nextAvailable: '2024-01-15T09:00:00Z'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    rating: 4.9,
    experience: 15,
    consultationFee: 200,
    availability: { virtual: true, inPerson: false },
    image: 'https://placehold.co/100x100/10B981/FFFFFF?text=MC',
    location: 'Heart Care Clinic',
    nextAvailable: '2024-01-16T14:30:00Z'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Family Medicine',
    rating: 4.7,
    experience: 8,
    consultationFee: 120,
    availability: { virtual: false, inPerson: true },
    image: 'https://placehold.co/100x100/F59E0B/FFFFFF?text=ER',
    location: 'Community Health Center',
    nextAvailable: '2024-01-15T11:00:00Z'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Pulmonology',
    rating: 4.6,
    experience: 10,
    consultationFee: 180,
    availability: { virtual: true, inPerson: true },
    image: 'https://placehold.co/100x100/8B5CF6/FFFFFF?text=JW',
    location: 'Respiratory Health Institute',
    nextAvailable: '2024-01-17T10:15:00Z'
  }
];

export const DoctorsList: React.FC = () => {
  const { state, dispatch } = useApp();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctors(MOCK_DOCTORS);
      setFilteredDoctors(MOCK_DOCTORS);
      dispatch({ type: 'SET_DOCTORS', payload: MOCK_DOCTORS });
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (specialtyFilter) {
      filtered = filtered.filter(doctor => doctor.specialty === specialtyFilter);
    }

    if (availabilityFilter) {
      filtered = filtered.filter(doctor => 
        availabilityFilter === 'virtual' ? doctor.availability.virtual :
        availabilityFilter === 'inPerson' ? doctor.availability.inPerson : true
      );
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, specialtyFilter, availabilityFilter]);

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-20 bg-gray-300 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Healthcare Providers</h1>
          <p className="text-gray-600">Connect with qualified doctors for virtual or in-person consultations</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search doctors or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Filter className="w-5 h-5 text-gray-400" />}
            />
            
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>

            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="virtual">Virtual Only</option>
              <option value="inPerson">In-Person Only</option>
            </select>

            <Button variant="outline" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Near Me</span>
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} of {doctors.length} doctors
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    {doctor.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{doctor.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Next available: {formatDate(doctor.nextAvailable)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">${doctor.consultationFee}</p>
                      <p className="text-sm text-gray-600">Consultation fee</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {doctor.availability.virtual && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          <Video className="w-3 h-3 mr-1" />
                          Virtual
                        </span>
                      )}
                      {doctor.availability.inPerson && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          <User className="w-3 h-3 mr-1" />
                          In-Person
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-4">
                    <Button size="sm" className="flex-1">
                      Book Appointment
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <User className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};