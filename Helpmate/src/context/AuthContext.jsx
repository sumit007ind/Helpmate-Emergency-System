import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// API Service
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
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
      const response = await fetch(url, config);
      
      // Check if response is ok
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = 'Something went wrong';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle network errors
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Cannot connect to server. Please make sure the backend is running on http://localhost:5000');
      }
      
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getProfile() {
    return this.request('/auth/me');
  }

  async logout() {
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
    if (!token) {
      dispatch({ type: 'LOAD_USER_FAIL' });
      return;
    }

    try {
      const response = await apiService.getProfile();
      dispatch({
        type: 'LOAD_USER_SUCCESS',
        payload: response.user,
      });
    } catch (error) {
      console.error('Failed to load user:', error);
      localStorage.removeItem('token');
      dispatch({ type: 'LOAD_USER_FAIL' });
    }
  }, []); // Empty dependency array

  // Load user on app start
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Register user
  const register = async (userData) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      const response = await apiService.register(userData);
      
      localStorage.setItem('token', response.token);
      
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: response,
      });
      
      return response;
    } catch (error) {
      dispatch({
        type: 'REGISTER_ERROR',
        payload: error.message,
      });
      throw error;
    }
  };

  // Login user
  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await apiService.login(credentials);
      
      localStorage.setItem('token', response.token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response,
      });
      
      return response;
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.message,
      });
      throw error;
    }
  };

  // Logout user
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }, []);

  // Clear errors - use useCallback to prevent infinite loops
  const clearErrors = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    ...state,
    register,
    login,
    logout,
    clearErrors,
  };

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



