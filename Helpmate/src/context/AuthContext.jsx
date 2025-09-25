import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// API Service with better debugging
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log('🔄 Making API request to:', url);
    console.log('📝 Request options:', options);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log('🌐 Fetch config:', config);
      const response = await fetch(url, config);
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      
      // Check if response is ok
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = 'Something went wrong';
        try {
          const errorData = await response.json();
          console.log('❌ Error data:', errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
          console.log('❌ Non-JSON error:', errorMessage);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('✅ Success data:', data);
      return data;
    } catch (error) {
      console.log('🚨 Fetch error:', error);
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        console.log('🔌 Network error detected - backend not reachable');
        
        // Test if we can reach the health endpoint
        try {
          const testResponse = await fetch('http://localhost:5000/api/health', { mode: 'no-cors' });
          console.log('🏥 Health check response:', testResponse);
        } catch (healthError) {
          console.log('💀 Health check also failed:', healthError);
        }
        
        throw new Error('Cannot connect to server. Please make sure the backend is running on http://localhost:5000');
      }
      
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async register(userData) {
    console.log('👤 Registering user:', userData);
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    console.log('🔐 Logging in user:', credentials.email);
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getProfile() {
    console.log('👤 Getting user profile');
    return this.request('/auth/me');
  }

  async logout() {
    console.log('🚪 Logging out user');
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }
}

const apiService = new ApiService();

// Create Auth Context
const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  console.log('🔄 Auth state change:', action.type, action.payload);
  
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    case 'LOAD_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOAD_USER_FAIL':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Use useCallback to prevent infinite loops
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    console.log('🔍 Loading user, token exists:', !!token);
    
    if (!token) {
      console.log('❌ No token found, user not authenticated');
      dispatch({ type: 'LOAD_USER_FAIL' });
      return;
    }

    try {
      const response = await apiService.getProfile();
      console.log('✅ User loaded successfully:', response.user);
      dispatch({
        type: 'LOAD_USER_SUCCESS',
        payload: response.user,
      });
    } catch (error) {
      console.error('❌ Failed to load user:', error);
      localStorage.removeItem('token');
      dispatch({ type: 'LOAD_USER_FAIL' });
    }
  }, []);

  // Load user on app start
  useEffect(() => {
    console.log('🚀 AuthProvider mounting, loading user...');
    loadUser();
  }, [loadUser]);

  // Register user
  const register = async (userData) => {
    console.log('📝 Starting registration process...');
    dispatch({ type: 'REGISTER_START' });
    try {
      const response = await apiService.register(userData);
      console.log('✅ Registration successful:', response);
      
      localStorage.setItem('token', response.token);
      
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: response,
      });
      
      return response;
    } catch (error) {
      console.error('❌ Registration failed:', error);
      dispatch({
        type: 'REGISTER_ERROR',
        payload: error.message,
      });
      throw error;
    }
  };

  // Login user
  const login = async (credentials) => {
    console.log('🔐 Starting login process...');
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await apiService.login(credentials);
      console.log('✅ Login successful:', response);
      
      localStorage.setItem('token', response.token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response,
      });
      
      return response;
    } catch (error) {
      console.error('❌ Login failed:', error);
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.message,
      });
      throw error;
    }
  };

  // Logout user
  const logout = useCallback(() => {
    console.log('🚪 Logging out user...');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }, []);

  // Clear errors
  const clearErrors = useCallback(() => {
    console.log('🧹 Clearing errors...');
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    ...state,
    register,
    login,
    logout,
    clearErrors,
  };

  console.log('📊 Current auth state:', {
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    user: state.user?.email
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};