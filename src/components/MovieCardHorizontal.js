import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, borderRadius, typography } from '../theme/colors';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.35;

const MovieCardHorizontal = ({ movie, onPress }) => {
  const { colors } = useTheme();

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: movie.posterUrl }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.ratingBadge}>
        <Feather name="star" size={10} color="#FFD700" />
        <Text style={styles.ratingText}>{formatRating(movie.vote_average)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {movie.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: spacing.md,
  },
  poster: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
    borderRadius: borderRadius.md,
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  info: {
    marginTop: spacing.xs,
  },
  title: {
    ...typography.caption,
    fontWeight: '600',
  },
});

export default MovieCardHorizontal;

