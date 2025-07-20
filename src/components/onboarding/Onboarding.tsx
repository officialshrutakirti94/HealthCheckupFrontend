import React, { useState } from 'react';
import { Heart, Shield, Users, FileText, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

const onboardingSteps = [
  {
    icon: Heart,
    title: 'AI-Powered Health Analysis',
    description: 'Get accurate health predictions based on your symptoms and medical history using advanced AI technology.',
  },
  {
    icon: FileText,
    title: 'Comprehensive Reports',
    description: 'Receive detailed health reports with recommended tests and personalized health insights.',
  },
  {
    icon: Users,
    title: 'Find the Right Doctor',
    description: 'Connect with qualified healthcare professionals near you for virtual or in-person consultations.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your health data is encrypted and protected with the highest security standards.',
  },
];

export const Onboarding: React.FC = () => {
  const { dispatch } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      dispatch({ type: 'SET_PAGE', payload: 'dashboard' });
    }
  };

  const handleSkip = () => {
    dispatch({ type: 'SET_PAGE', payload: 'dashboard' });
  };

  const step = onboardingSteps[currentStep];
  const IconComponent = step.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-8">
          <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <IconComponent className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip
          </button>
          <Button onClick={handleNext} className="flex items-center space-x-2">
            <span>{currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};