import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Search, Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useApp } from '../../context/AppContext';

const COMMON_SYMPTOMS = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
  'Chest Pain', 'Shortness of Breath', 'Abdominal Pain', 'Joint Pain',
  'Sore Throat', 'Muscle Aches', 'Back Pain', 'Insomnia', 'Anxiety'
];

const MEDICAL_CONDITIONS = [
  'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Depression',
  'Anxiety Disorder', 'Arthritis', 'High Cholesterol', 'Thyroid Disease'
];

export const HealthForm: React.FC = () => {
  const { state, dispatch } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: state.healthData.age || '',
    symptoms: state.healthData.symptoms || [],
    bloodPressure: state.healthData.bloodPressure || { systolic: '', diastolic: '' },
    weight: state.healthData.weight || '',
    height: state.healthData.height || '',
    medicalHistory: state.healthData.medicalHistory || {
      conditions: [],
      allergies: [],
      surgeries: [],
      medications: []
    }
  });
  const [symptomSearch, setSymptomSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const totalSteps = 4;

  const addSymptom = (symptom: string) => {
    if (!formData.symptoms.includes(symptom)) {
      setFormData(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, symptom]
      }));
    }
    setSymptomSearch('');
  };

  const removeSymptom = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter(s => s !== symptom)
    }));
  };

  const addMedicalCondition = (condition: string) => {
    if (!formData.medicalHistory.conditions.includes(condition)) {
      setFormData(prev => ({
        ...prev,
        medicalHistory: {
          ...prev.medicalHistory,
          conditions: [...prev.medicalHistory.conditions, condition]
        }
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Save data to context
    dispatch({ type: 'SET_HEALTH_DATA', payload: formData });
    
    // Simulate API call for predictions
    setTimeout(() => {
      const mockPredictions = [
        {
          id: '1',
          diseases: [
            {
              name: 'Common Cold',
              probability: 0.75,
              severity: 'low' as const,
              description: 'A viral infection of the upper respiratory tract'
            },
            {
              name: 'Seasonal Allergies',
              probability: 0.45,
              severity: 'low' as const,
              description: 'Allergic reaction to seasonal allergens'
            }
          ],
          recommendedTests: [
            {
              name: 'Complete Blood Count',
              description: 'General health assessment',
              urgency: 'low' as const
            },
            {
              name: 'Allergy Panel',
              description: 'Identify specific allergens',
              urgency: 'medium' as const
            }
          ],
          createdAt: new Date().toISOString()
        }
      ];
      
      dispatch({ type: 'SET_PREDICTIONS', payload: mockPredictions });
      dispatch({ type: 'SET_PAGE', payload: 'predictions' });
      setLoading(false);
    }, 2000);
  };

  const filteredSymptoms = COMMON_SYMPTOMS.filter(symptom =>
    symptom.toLowerCase().includes(symptomSearch.toLowerCase()) &&
    !formData.symptoms.includes(symptom)
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Enter your age"
              />
              <Input
                label="Weight (kg)"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="Enter your weight"
              />
              <Input
                label="Height (cm)"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                placeholder="Enter your height"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Pressure
                </label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Systolic"
                    value={formData.bloodPressure.systolic}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      bloodPressure: { ...prev.bloodPressure, systolic: e.target.value }
                    }))}
                  />
                  <Input
                    placeholder="Diastolic"
                    value={formData.bloodPressure.diastolic}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      bloodPressure: { ...prev.bloodPressure, diastolic: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Current Symptoms</h3>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Search symptoms..."
                  value={symptomSearch}
                  onChange={(e) => setSymptomSearch(e.target.value)}
                  icon={<Search className="w-5 h-5 text-gray-400" />}
                />
                {symptomSearch && filteredSymptoms.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                    {filteredSymptoms.map(symptom => (
                      <button
                        key={symptom}
                        onClick={() => addSymptom(symptom)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Selected Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.symptoms.map(symptom => (
                    <span
                      key={symptom}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {symptom}
                      <button
                        onClick={() => removeSymptom(symptom)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Common Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {COMMON_SYMPTOMS.filter(s => !formData.symptoms.includes(s)).slice(0, 8).map(symptom => (
                    <button
                      key={symptom}
                      onClick={() => addSymptom(symptom)}
                      className="px-3 py-1 rounded-full text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Medical History</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Pre-existing Conditions:</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.medicalHistory.conditions.map(condition => (
                    <span
                      key={condition}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {MEDICAL_CONDITIONS.filter(c => !formData.medicalHistory.conditions.includes(c)).map(condition => (
                    <button
                      key={condition}
                      onClick={() => addMedicalCondition(condition)}
                      className="px-3 py-1 rounded-full text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Allergies (comma separated)"
                placeholder="e.g., Peanuts, Shellfish, Penicillin"
                value={formData.medicalHistory.allergies.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  medicalHistory: {
                    ...prev.medicalHistory,
                    allergies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  }
                }))}
              />

              <Input
                label="Current Medications (comma separated)"
                placeholder="e.g., Aspirin, Metformin"
                value={formData.medicalHistory.medications.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  medicalHistory: {
                    ...prev.medicalHistory,
                    medications: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  }
                }))}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Review Your Information</h3>
            <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Age:</span> {formData.age}
                </div>
                <div>
                  <span className="font-medium">Weight:</span> {formData.weight} kg
                </div>
                <div>
                  <span className="font-medium">Height:</span> {formData.height} cm
                </div>
                <div>
                  <span className="font-medium">BP:</span> {formData.bloodPressure.systolic}/{formData.bloodPressure.diastolic}
                </div>
              </div>
              
              <div>
                <span className="font-medium">Symptoms:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.symptoms.map(symptom => (
                    <span key={symptom} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              {formData.medicalHistory.conditions.length > 0 && (
                <div>
                  <span className="font-medium">Medical Conditions:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {formData.medicalHistory.conditions.map(condition => (
                      <span key={condition} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>

            <Button
              onClick={handleNext}
              loading={loading && currentStep === totalSteps}
              className="flex items-center space-x-2"
            >
              <span>{currentStep === totalSteps ? 'Analyze Health' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};