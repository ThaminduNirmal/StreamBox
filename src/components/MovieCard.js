import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, borderRadius, typography } from '../theme/colors';
import { Feather } from '@expo/vector-icons';

const MovieCard = ({ movie, onPress }) => {
  const { colors } = useTheme();

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: movie.posterUrl }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {movie.title}
        </Text>
        
        <View style={styles.metaRow}>
          <View style={styles.ratingContainer}>
            <Feather name="star" size={14} color={colors.secondary} />
            <Text style={[styles.rating, { color: colors.text }]}>
              {formatRating(movie.vote_average)}
            </Text>
          </View>
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </Text>
        </View>

        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {truncateText(movie.overview, 100)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  poster: {
    width: 100,
    height: 150,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  title: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  rating: {
    ...typography.body,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  date: {
    ...typography.caption,
  },
  description: {
    ...typography.caption,
    lineHeight: 18,
  },
});

export default MovieCard;

