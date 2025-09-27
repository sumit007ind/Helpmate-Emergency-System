// context/AuthContext.jsx - Updated with flexible API configuration
import React ,{ createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// Try multiple possible backend URLs
const POSSIBLE_API_URLS = [
  'http://localhost:5000/api',
  'http://127.0.0.1:5000/api',
  'http://localhost:3001/api', // Alternative port
];

class ApiService {
  constructor() {
    this.baseURL = null;
    this.isConnected = false;
  }

  // Find working API URL
  async findWorkingAPI() {
    console.log('🔍 Searching for working backend...');
    
    for (const url of POSSIBLE_API_URLS) {
      try {
        console.log(`🧪 Testing: ${url}/health`);
        const response = await fetch(`${url}/health`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Backend found at: ${url}`, data);
          this.baseURL = url;
          this.isConnected = true;
          return url;
        }
      } catch (error) {
        console.log(`❌ Failed to connect to: ${url}`);
      }
    }
    
    console.error('💀 No working backend found!');
    throw new Error('Cannot find a working backend server. Please ensure your backend is running.');
  }

  async request(endpoint, options = {}) {
    // Find working API if not already found
    if (!this.baseURL || !this.isConnected) {
      await this.findWorkingAPI();
    }

    const url = `${this.baseURL}${endpoint}`;
    
    console.log('🔄 Making API request to:', url);
    
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
      console.log('🌐 Request config:', config);
      const response = await fetch(url, config);
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = 'Something went wrong';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('✅ Success:', data);
      return data;
    } catch (error) {
      console.error('🚨 Request failed:', error);
      
      // Reset connection status if request fails
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        this.isConnected = false;
        this.baseURL = null;
      }
      
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

  // Test connection
  async testConnection() {
    try {
      await this.findWorkingAPI();
      return true;
    } catch (error) {
      return false;
    }
  }
}

const apiService = new ApiService();

// Create Auth Context
const AuthContext = createContext();

// Auth reducer (same as before)
const authReducer = (state, action) => {
  console.log('🔄 Auth state change:', action.type);
  
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };
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
      return { ...state, error: null };
    case 'CONNECTION_TEST':
      return { ...state, connectionStatus: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null,
  connectionStatus: null
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Test connection on app start
  const testConnection = useCallback(async () => {
    console.log('🔌 Testing backend connection...');
    try {
      const isConnected = await apiService.testConnection();
      dispatch({ 
        type: 'CONNECTION_TEST', 
        payload: isConnected ? 'connected' : 'disconnected' 
      });
      return isConnected;
    } catch (error) {
      console.error('Connection test failed:', error);
      dispatch({ type: 'CONNECTION_TEST', payload: 'disconnected' });
      return false;
    }
  }, []);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    console.log('🔍 Loading user, token exists:', !!token);
    
    if (!token) {
      console.log('❌ No token found');
      dispatch({ type: 'LOAD_USER_FAIL' });
      return;
    }

    try {
      const response = await apiService.getProfile();
      console.log('✅ User loaded:', response.user);
      dispatch({ type: 'LOAD_USER_SUCCESS', payload: response.user });
    } catch (error) {
      console.error('❌ Failed to load user:', error);
      localStorage.removeItem('token');
      dispatch({ type: 'LOAD_USER_FAIL' });
    }
  }, []);

  // Initialize on app start
  useEffect(() => {
    const initialize = async () => {
      console.log('🚀 Initializing AuthProvider...');
      
      // First test connection
      const isConnected = await testConnection();
      
      if (isConnected) {
        // If connected and have token, try to load user
        if (localStorage.getItem('token')) {
          await loadUser();
        } else {
          dispatch({ type: 'LOAD_USER_FAIL' });
        }
      } else {
        // If not connected, show error but don't fail completely
        dispatch({ 
          type: 'REGISTER_ERROR', 
          payload: 'Cannot connect to server. Please make sure the backend is running.' 
        });
      }
    };
    
    initialize();
  }, [testConnection, loadUser]);

  // Register user
  const register = async (userData) => {
    console.log('📝 Starting registration...');
    dispatch({ type: 'REGISTER_START' });
    try {
      const response = await apiService.register(userData);
      localStorage.setItem('token', response.token);
      dispatch({ type: 'REGISTER_SUCCESS', payload: response });
      return response;
    } catch (error) {
      console.error('❌ Registration failed:', error);
      dispatch({ type: 'REGISTER_ERROR', payload: error.message });
      throw error;
    }
  };

  // Login user
  const login = async (credentials) => {
    console.log('🔐 Starting login...');
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await apiService.login(credentials);
      localStorage.setItem('token', response.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response });
      return response;
    } catch (error) {
      console.error('❌ Login failed:', error);
      dispatch({ type: 'LOGIN_ERROR', payload: error.message });
      throw error;
    }
  };

  const logout = useCallback(() => {
    console.log('🚪 Logging out...');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const clearErrors = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    ...state,
    register,
    login,
    logout,
    clearErrors,
    testConnection
  };

  console.log('📊 Auth state:', {
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    connectionStatus: state.connectionStatus
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};



