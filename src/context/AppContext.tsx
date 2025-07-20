import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, HealthData, PredictionResult, Doctor, Page } from '../types';

interface AppState {
  currentPage: Page;
  user: User | null;
  isAuthenticated: boolean;
  healthData: Partial<HealthData>;
  predictions: PredictionResult[];
  doctors: Doctor[];
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_PAGE'; payload: Page }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_HEALTH_DATA'; payload: Partial<HealthData> }
  | { type: 'SET_PREDICTIONS'; payload: PredictionResult[] }
  | { type: 'SET_DOCTORS'; payload: Doctor[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  currentPage: 'login',
  user: null,
  isAuthenticated: false,
  healthData: {},
  predictions: [],
  doctors: [],
  isLoading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, currentPage: 'login' };
    case 'SET_HEALTH_DATA':
      return { ...state, healthData: { ...state.healthData, ...action.payload } };
    case 'SET_PREDICTIONS':
      return { ...state, predictions: action.payload };
    case 'SET_DOCTORS':
      return { ...state, doctors: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};