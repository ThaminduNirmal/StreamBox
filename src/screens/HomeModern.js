import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography } from '../theme/colors';
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, searchMovies, getImageUrl } from '../api/tmdb';
import MovieCardHorizontal from '../components/MovieCardHorizontal';
import SearchBar from '../components/SearchBar';
import ProfileAvatar from '../components/ProfileAvatar';
import { storage, STORAGE_KEYS } from '../utils/storage';

const HomeModern = ({ navigation }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState('');
  const [avatarUri, setAvatarUri] = useState(null);
  
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadUserData();
    fetchAllMovies();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await storage.getItem(STORAGE_KEYS.USER_NAME);
      const firstName = await storage.getItem(STORAGE_KEYS.USER_FIRST_NAME);
      const lastName = await storage.getItem(STORAGE_KEYS.USER_LAST_NAME);
      const customAvatar = await storage.getItem(STORAGE_KEYS.PROFILE_AVATAR);
      const apiImage = await storage.getItem(STORAGE_KEYS.USER_IMAGE);
      
      const displayName = firstName && lastName ? `${firstName} ${lastName}` : name || 'User';
      setUserName(displayName);
      setAvatarUri(customAvatar || apiImage);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const fetchAllMovies = async () => {
    try {
      setLoading(true);
      
      const [trending, popular, topRated] = await Promise.all([
        getTrendingMovies(),
        getPopularMovies(),
        getTopRatedMovies(),
      ]);

      setTrendingMovies(trending.map(movie => ({
        ...movie,
        posterUrl: getImageUrl(movie.poster_path),
      })));
      
      setPopularMovies(popular.map(movie => ({
        ...movie,
        posterUrl: getImageUrl(movie.poster_path),
      })));
      
      setTopRatedMovies(topRated.map(movie => ({
        ...movie,
        posterUrl: getImageUrl(movie.poster_path),
      })));
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setIsSearching(true);
      const results = await searchMovies(query);
      setSearchResults(results.map(movie => ({
        ...movie,
        posterUrl: getImageUrl(movie.poster_path),
      })));
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setIsSearching(false);
    setSearchResults([]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllMovies();
    setRefreshing(false);
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('Details', { movie });
  };


  const handleLogout = () => {
    navigation.navigate('Profile');
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={[styles.greeting, { color: colors.textSecondary }]}>
          Welcome back,
        </Text>
        <Text style={[styles.userName, { color: colors.text }]}>
          {userName}
        </Text>
      </View>
      <ProfileAvatar
        avatarUri={avatarUri}
        userName={userName}
        onLogout={handleLogout}
        onViewProfile={handleViewProfile}
      />
    </View>
  );

  const renderSectionHeader = (title, onViewAll) => (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      {onViewAll && (
        <TouchableOpacity onPress={onViewAll}>
          <Text style={[styles.viewAll, { color: colors.primary }]}>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderMovieItem = ({ item }) => (
    <MovieCardHorizontal movie={item} onPress={() => handleMoviePress(item)} />
  );

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Loading movies...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {renderHeader()}
        
        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

        {isSearching && searchResults.length > 0 ? (
          <>
            {renderSectionHeader(`Search Results (${searchResults.length})`)}
            <FlatList
              data={searchResults}
              renderItem={renderMovieItem}
              keyExtractor={(item) => `search-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </>
        ) : isSearching && searchResults.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={[styles.noResultsText, { color: colors.textSecondary }]}>
              No movies found. Try a different search.
            </Text>
          </View>
        ) : null}

        {!isSearching && (
          <>
            {renderSectionHeader('Trending Now', () => {})}
            <FlatList
              data={trendingMovies.slice(0, 10)}
              renderItem={renderMovieItem}
              keyExtractor={(item) => `trending-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />

            {renderSectionHeader('Top Viewed', () => {})}
            <FlatList
              data={popularMovies.slice(0, 10)}
              renderItem={renderMovieItem}
              keyExtractor={(item) => `popular-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />

            {renderSectionHeader('Recommended for You', () => {})}
            <FlatList
              data={topRatedMovies.slice(0, 10)}
              renderItem={renderMovieItem}
              keyExtractor={(item) => `toprated-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    paddingTop: spacing.xxl,
  },
  greeting: {
    ...typography.body,
  },
  userName: {
    ...typography.h2,
    marginTop: spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
  },
  viewAll: {
    ...typography.caption,
    fontWeight: '600',
  },
  horizontalList: {
    paddingHorizontal: spacing.md,
  },
  loadingText: {
    ...typography.body,
    marginTop: spacing.md,
  },
  noResults: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  noResultsText: {
    ...typography.body,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});

export default HomeModern;

