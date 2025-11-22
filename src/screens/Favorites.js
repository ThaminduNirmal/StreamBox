import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography } from '../theme/colors';
import { selectFavorites } from '../redux/favoritesSlice';
import MovieCard from '../components/MovieCard';
import { Feather } from '@expo/vector-icons';

const Favorites = ({ navigation }) => {
  const { colors } = useTheme();
  const favorites = useSelector(selectFavorites);

  const handleMoviePress = (movie) => {
    navigation.navigate('Details', { movie });
  };

  const renderMovieCard = ({ item }) => (
    <MovieCard movie={item} onPress={() => handleMoviePress(item)} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={80} color={colors.textSecondary} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No Favorites Yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Movies you favorite will appear here
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text }]}>
        My Favorites
      </Text>
      {favorites.length > 0 && (
        <Text style={[styles.count, { color: colors.textSecondary }]}>
          {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}
        </Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={favorites}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContent,
          favorites.length === 0 && styles.emptyListContent,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  count: {
    ...typography.body,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.h2,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.body,
    textAlign: 'center',
  },
});

export default Favorites;

