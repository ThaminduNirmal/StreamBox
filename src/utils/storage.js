import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'AUTH_TOKEN',
  USER_NAME: 'USER_NAME',
  USER_EMAIL: 'USER_EMAIL',
  USER_ID: 'USER_ID',
  USER_FIRST_NAME: 'USER_FIRST_NAME',
  USER_LAST_NAME: 'USER_LAST_NAME',
  USER_GENDER: 'USER_GENDER',
  USER_IMAGE: 'USER_IMAGE',
  PROFILE_AVATAR: 'PROFILE_AVATAR',
  APP_THEME: 'APP_THEME',
};

export const secureStorage = {
  async setItem(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(`Error saving ${key} to secure storage:`, error);
      throw error;
    }
  },

  async getItem(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error(`Error getting ${key} from secure storage:`, error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(`Error removing ${key} from secure storage:`, error);
    }
  },
};

export const storage = {
  async setItem(key, value) {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
      throw error;
    }
  },

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error(`Error getting ${key} from storage:`, error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
    }
  },

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

