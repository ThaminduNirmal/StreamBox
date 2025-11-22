import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';
import { secureStorage, storage, STORAGE_KEYS } from '../utils/storage';
import { loginSuccess } from '../redux/authSlice';
import { loadFavoritesFromStorage } from '../redux/favoritesSlice';
import AuthStack from './AuthStack';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { colors, isLoading: themeLoading } = useTheme();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await secureStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userName = await storage.getItem(STORAGE_KEYS.USER_NAME);
      const userEmail = await storage.getItem(STORAGE_KEYS.USER_EMAIL);
      const userId = await storage.getItem(STORAGE_KEYS.USER_ID);
      const firstName = await storage.getItem(STORAGE_KEYS.USER_FIRST_NAME);
      const lastName = await storage.getItem(STORAGE_KEYS.USER_LAST_NAME);
      const gender = await storage.getItem(STORAGE_KEYS.USER_GENDER);
      const image = await storage.getItem(STORAGE_KEYS.USER_IMAGE);

      if (token && userName) {
        dispatch(loginSuccess({
          token,
          user: {
            id: userId,
            username: userName,
            email: userEmail,
            firstName,
            lastName,
            gender,
            image,
          },
        }));
        
        if (userId) {
          dispatch(loadFavoritesFromStorage(userId));
        }
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  if (isCheckingAuth || themeLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;

