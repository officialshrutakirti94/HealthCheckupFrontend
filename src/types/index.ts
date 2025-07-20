export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
}

export interface HealthData {
  age: number;
  symptoms: string[];
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  weight: number;
  height: number;
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    surgeries: string[];
    medications: string[];
  };
}

export interface PredictionResult {
  id: string;
  diseases: {
    name: string;
    probability: number;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }[];
  recommendedTests: {
    name: string;
    description: string;
    urgency: 'low' | 'medium' | 'high';
  }[];
  reportUrl?: string;
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  consultationFee: number;
  availability: {
    virtual: boolean;
    inPerson: boolean;
  };
  image: string;
  location?: string;
  nextAvailable: string;
}

export type Page = 
  | 'login' 
  | 'register' 
  | 'onboarding' 
  | 'dashboard' 
  | 'health-form' 
  | 'predictions' 
  | 'doctors' 
  | 'profile';