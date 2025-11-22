import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography } from '../theme/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { login } from '../api/auth';
import { loginSuccess } from '../redux/authSlice';
import { loadFavoritesFromStorage } from '../redux/favoritesSlice';
import { secureStorage, storage, STORAGE_KEYS } from '../utils/storage';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required'),
});

const Login = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    console.log('Attempting login with:', { username: values.username });
    try {
      const { token, user } = await login(values.username, values.password);
      
      if (!token) {
        throw new Error('No token received from server');
      }
      
      await secureStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, String(token));
      await storage.setItem(STORAGE_KEYS.USER_ID, String(user.id));
      await storage.setItem(STORAGE_KEYS.USER_NAME, String(user.username));
      await storage.setItem(STORAGE_KEYS.USER_EMAIL, String(user.email || user.username));
      await storage.setItem(STORAGE_KEYS.USER_FIRST_NAME, String(user.firstName || ''));
      await storage.setItem(STORAGE_KEYS.USER_LAST_NAME, String(user.lastName || ''));
      await storage.setItem(STORAGE_KEYS.USER_GENDER, String(user.gender || ''));
      await storage.setItem(STORAGE_KEYS.USER_IMAGE, String(user.image || ''));
      
      dispatch(loginSuccess({ token, user }));
      
      dispatch(loadFavoritesFromStorage(user.id));
      
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primary }]}>StreamBox</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sign in to continue
          </Text>
        </View>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ handleSubmit }) => (
            <View style={styles.form}>
              <CustomInput
                name="username"
                placeholder="Username"
                icon="user"
                autoCapitalize="none"
              />
              <CustomInput
                name="password"
                placeholder="Password"
                icon="lock"
                secureTextEntry
              />

              <View style={styles.helperContainer}>
                <Text style={[styles.helperText, { color: colors.textSecondary }]}>
                  Try: emilys / emilyspass
                </Text>
                <Text style={[styles.helperText, { color: colors.textSecondary, fontSize: 11 }]}>
                  Or: michaelw / michaelwpass
                </Text>
              </View>

              <CustomButton
                title="Sign In"
                onPress={handleSubmit}
                loading={loading}
              />

              <View style={styles.registerContainer}>
                <Text style={[styles.registerText, { color: colors.textSecondary }]}>
                  Don't have an account?{' '}
                </Text>
                <Text
                  style={[styles.registerLink, { color: colors.primary }]}
                  onPress={() => navigation.navigate('Register')}
                >
                  Register
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
  },
  form: {
    width: '100%',
  },
  helperContainer: {
    marginBottom: spacing.md,
  },
  helperText: {
    ...typography.small,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  registerText: {
    ...typography.body,
  },
  registerLink: {
    ...typography.body,
    fontWeight: '600',
  },
});

export default Login;

