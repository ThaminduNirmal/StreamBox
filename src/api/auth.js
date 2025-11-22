import axios from 'axios';

const AUTH_BASE_URL = 'https://dummyjson.com/auth';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/login`, {
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Login successful:', response.data);
    
    return {
      token: response.data.accessToken || response.data.token,
      user: {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      },
    };
  } catch (error) {
    console.error('Login error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    
    if (error.response?.status === 400) {
      throw new Error('Invalid username or password. Try: kminchelle / 0lelplR');
    }
    if (error.response?.status === 404) {
      throw new Error('User not found.');
    }
    throw new Error('Login failed. Please check your internet connection.');
  }
};

export const register = async (name, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Registration successful! Please login.',
      });
    }, 1000);
  });
};

