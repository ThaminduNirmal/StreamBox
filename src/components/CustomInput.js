import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, borderRadius, typography } from '../theme/colors';
import { Feather } from '@expo/vector-icons';
import { useFormikContext } from 'formik';

const CustomInput = ({ 
  name, 
  placeholder, 
  secureTextEntry = false, 
  icon, 
  keyboardType = 'default',
  autoCapitalize = 'none',
}) => {
  const { colors } = useTheme();
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext();

  const hasError = touched[name] && errors[name];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          { 
            backgroundColor: colors.surface, 
            borderColor: hasError ? colors.error : colors.border 
          }
        ]}
      >
        {icon && (
          <Feather 
            name={icon} 
            size={20} 
            color={hasError ? colors.error : colors.textSecondary} 
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={values[name]}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
      {hasError && (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {errors[name]}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body,
  },
  errorText: {
    ...typography.small,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});

export default CustomInput;

