import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography, borderRadius } from '../theme/colors';
import { Feather } from '@expo/vector-icons';
import { toggleFavorite, selectIsFavorite, saveFavoritesToStorage } from '../redux/favoritesSlice';
import { getBackdropUrl, getImageUrl } from '../api/tmdb';
import { storage, STORAGE_KEYS } from '../utils/storage';

const Details = ({ route, navigation }) => {
  const { movie } = route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(movie.id));
  const favorites = useSelector(state => state.favorites.items);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleToggleFavorite = async () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    const movieData = {
      ...movie,
      posterUrl: getImageUrl(movie.poster_path),
    };
    
    const isCurrentlyFavorite = favorites.some(item => item.id === movie.id);
    let updatedFavorites;
    
    if (isCurrentlyFavorite) {
      updatedFavorites = favorites.filter(item => item.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movieData];
    }
    
    dispatch(toggleFavorite(movieData));
    
    const userId = await storage.getItem(STORAGE_KEYS.USER_ID);
    dispatch(saveFavoritesToStorage(userId, updatedFavorites));
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.backdropContainer}>
          <Image
            source={{ uri: getBackdropUrl(movie.backdrop_path) || getImageUrl(movie.poster_path) }}
            style={styles.backdrop}
            resizeMode="cover"
          />
          <View style={[styles.backdropOverlay, { backgroundColor: colors.overlay }]} />
          
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.surface }]}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>

          <Animated.View style={[styles.favoriteButton, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
              style={[styles.favoriteButtonInner, { backgroundColor: colors.surface }]}
              onPress={handleToggleFavorite}
            >
              <Feather
                name={isFavorite ? 'heart' : 'heart'}
                size={24}
                color={isFavorite ? colors.primary : colors.text}
                style={{ fontWeight: isFavorite ? 'bold' : 'normal' }}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            {movie.title}
          </Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Feather name="star" size={18} color={colors.secondary} />
              <Text style={[styles.metaText, { color: colors.text }]}>
                {formatRating(movie.vote_average)}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Feather name="calendar" size={18} color={colors.textSecondary} />
              <Text style={[styles.metaText, { color: colors.text }]}>
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </Text>
            </View>

            {movie.runtime && (
              <View style={styles.metaItem}>
                <Feather name="clock" size={18} color={colors.textSecondary} />
                <Text style={[styles.metaText, { color: colors.text }]}>
                  {formatRuntime(movie.runtime)}
                </Text>
              </View>
            )}
          </View>

          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.genresContainer}>
              {movie.genres.map((genre) => (
                <View
                  key={genre.id}
                  style={[styles.genreChip, { backgroundColor: colors.surface }]}
                >
                  <Text style={[styles.genreText, { color: colors.text }]}>
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Overview
            </Text>
            <Text style={[styles.overview, { color: colors.textSecondary }]}>
              {movie.overview || 'No overview available.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdropContainer: {
    height: 300,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: spacing.xxl,
    left: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.xxl,
    right: spacing.md,
  },
  favoriteButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.md,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  metaText: {
    ...typography.body,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  genreChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  genreText: {
    ...typography.caption,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  overview: {
    ...typography.body,
    lineHeight: 24,
  },
});

export default Details;

