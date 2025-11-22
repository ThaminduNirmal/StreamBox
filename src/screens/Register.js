import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography } from '../theme/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { register } from '../api/auth';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = ({ navigation }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await register(values.name, values.email, values.password);
      
      Alert.alert(
        'Success',
        response.message,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
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
          <Text style={[styles.title, { color: colors.primary }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Join StreamBox today
          </Text>
        </View>

        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={registerSchema}
          onSubmit={handleRegister}
        >
          {({ handleSubmit }) => (
            <View style={styles.form}>
              <CustomInput
                name="name"
                placeholder="Full Name"
                icon="user"
                autoCapitalize="words"
              />
              <CustomInput
                name="email"
                placeholder="Email"
                icon="mail"
                keyboardType="email-address"
              />
              <CustomInput
                name="password"
                placeholder="Password"
                icon="lock"
                secureTextEntry
              />
              <CustomInput
                name="confirmPassword"
                placeholder="Confirm Password"
                icon="lock"
                secureTextEntry
              />

              <CustomButton
                title="Create Account"
                onPress={handleSubmit}
                loading={loading}
              />

              <View style={styles.loginContainer}>
                <Text style={[styles.loginText, { color: colors.textSecondary }]}>
                  Already have an account?{' '}
                </Text>
                <Text
                  style={[styles.loginLink, { color: colors.primary }]}
                  onPress={() => navigation.navigate('Login')}
                >
                  Sign In
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
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
  },
  form: {
    width: '100%',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  loginText: {
    ...typography.body,
  },
  loginLink: {
    ...typography.body,
    fontWeight: '600',
  },
});

export default Register;

