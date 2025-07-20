import React from 'react';
import { AlertTriangle, Download, FileText, Clock, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

export const PredictionResults: React.FC = () => {
  const { state, dispatch } = useApp();
  const prediction = state.predictions[0];

  if (!prediction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No prediction results found.</p>
          <Button 
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'health-form' })}
            className="mt-4"
          >
            Take Health Assessment
          </Button>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Health Analysis Results</h1>
              <p className="text-gray-600 mt-2">
                Based on your health information, here are our AI-powered insights
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </Button>
              <Button 
                onClick={() => dispatch({ type: 'SET_PAGE', payload: 'doctors' })}
                className="flex items-center space-x-2"
              >
                <span>Find Doctors</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Analysis Complete</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {prediction.diseases.length} Conditions
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Recommended Tests</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {prediction.recommendedTests.length} Tests
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Generated</span>
              </div>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {new Date(prediction.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Predicted Diseases */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
            <span>Potential Health Conditions</span>
          </h2>
          
          <div className="space-y-4">
            {prediction.diseases.map((disease, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{disease.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(disease.severity)}`}>
                      {disease.severity.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round(disease.probability * 100)}% match
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">{disease.description}</p>
                <div className="mt-3 bg-gray-50 rounded-lg p-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${disease.probability * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Tests */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <FileText className="w-6 h-6 text-green-600" />
            <span>Recommended Diagnostic Tests</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prediction.recommendedTests.map((test, index) => (
              <div key={index} className={`border-2 rounded-lg p-6 ${getUrgencyColor(test.urgency)}`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    test.urgency === 'high' ? 'bg-red-100 text-red-800' :
                    test.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {test.urgency.toUpperCase()} PRIORITY
                  </span>
                </div>
                <p className="text-gray-600">{test.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
          <p className="text-blue-100 mb-6">
            Based on your results, we recommend consulting with a healthcare professional for proper diagnosis and treatment.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="secondary"
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'doctors' })}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Find Doctors Near You
            </Button>
            <Button 
              variant="outline"
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'health-form' })}
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Take Another Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};