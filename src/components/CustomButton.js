import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, borderRadius, typography } from '../theme/colors';

const CustomButton = ({ 
  title, 
  onPress, 
  loading = false, 
  variant = 'primary',
  disabled = false,
}) => {
  const { colors } = useTheme();

  const backgroundColor = variant === 'primary' ? colors.primary : colors.surface;
  const textColor = variant === 'primary' ? '#FFFFFF' : colors.text;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  text: {
    ...typography.body,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default CustomButton;

