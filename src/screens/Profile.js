import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography, borderRadius } from '../theme/colors';
import { Feather } from '@expo/vector-icons';
import { storage, secureStorage, STORAGE_KEYS } from '../utils/storage';
import { logout as logoutAction } from '../redux/authSlice';
import { setFavorites } from '../redux/favoritesSlice';

const Profile = ({ navigation }) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [avatarUri, setAvatarUri] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await storage.getItem(STORAGE_KEYS.USER_NAME);
      const email = await storage.getItem(STORAGE_KEYS.USER_EMAIL);
      const first = await storage.getItem(STORAGE_KEYS.USER_FIRST_NAME);
      const last = await storage.getItem(STORAGE_KEYS.USER_LAST_NAME);
      const genderValue = await storage.getItem(STORAGE_KEYS.USER_GENDER);
      const apiImg = await storage.getItem(STORAGE_KEYS.USER_IMAGE);
      const customAvatar = await storage.getItem(STORAGE_KEYS.PROFILE_AVATAR);
      
      setUserName(name || 'User');
      setUserEmail(email || 'user@example.com');
      setFirstName(first || '');
      setLastName(last || '');
      setGender(genderValue || '');
      setAvatarUri(customAvatar || apiImg);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please allow access to your photo library.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setAvatarUri(uri);
        await storage.setItem(STORAGE_KEYS.PROFILE_AVATAR, uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await secureStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
              await storage.removeItem(STORAGE_KEYS.USER_NAME);
              await storage.removeItem(STORAGE_KEYS.USER_EMAIL);
              await storage.removeItem(STORAGE_KEYS.USER_ID);
              await storage.removeItem(STORAGE_KEYS.USER_FIRST_NAME);
              await storage.removeItem(STORAGE_KEYS.USER_LAST_NAME);
              await storage.removeItem(STORAGE_KEYS.USER_GENDER);
              await storage.removeItem(STORAGE_KEYS.USER_IMAGE);
              await storage.removeItem(STORAGE_KEYS.PROFILE_AVATAR);
              
              dispatch(setFavorites({ items: [], userId: null }));
              dispatch(logoutAction());
            } catch (error) {
              console.error('Error during logout:', error);
            }
          },
        },
      ]
    );
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    if (firstName && lastName) {
      return (firstName[0] + lastName[0]).toUpperCase();
    }
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.placeholderAvatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.initials}>{getInitials(userName)}</Text>
            </View>
          )}
          <TouchableOpacity
            style={[styles.editAvatarButton, { backgroundColor: colors.primary }]}
            onPress={handlePickImage}
          >
            <Feather name="camera" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.userName, { color: colors.text }]}>
          {firstName && lastName ? `${firstName} ${lastName}` : userName}
        </Text>
        <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
          @{userName}
        </Text>
        
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account Info</Text>
        
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.infoRow}>
            <Feather name="user" size={20} color={colors.textSecondary} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Full Name</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {firstName && lastName ? `${firstName} ${lastName}` : userName}
              </Text>
            </View>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.infoRow}>
            <Feather name="mail" size={20} color={colors.textSecondary} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {userEmail}
              </Text>
            </View>
          </View>
          
          {gender && (
            <>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <View style={styles.infoRow}>
                <Feather name="info" size={20} color={colors.textSecondary} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Gender</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather name={isDark ? 'moon' : 'sun'} size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  headerTitle: {
    ...typography.h1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    ...typography.h2,
    marginTop: spacing.md,
  },
  userEmail: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  card: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    ...typography.body,
    marginLeft: spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  logoutText: {
    ...typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  infoContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  infoLabel: {
    ...typography.small,
    marginBottom: 2,
  },
  infoValue: {
    ...typography.body,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginHorizontal: spacing.md,
  },
});

export default Profile;

