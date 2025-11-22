import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, borderRadius, typography } from '../theme/colors';
import { Feather } from '@expo/vector-icons';

const ProfileAvatar = ({ avatarUri, userName, onLogout, onViewProfile }) => {
  const { colors } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    setMenuVisible(false);
    onLogout && onLogout();
  };

  const handleViewProfile = () => {
    setMenuVisible(false);
    onViewProfile && onViewProfile();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleMenu} activeOpacity={0.8}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholderAvatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.initials}>{getInitials(userName)}</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={[styles.dropdown, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleViewProfile}
              activeOpacity={0.7}
            >
              <Feather name="user" size={20} color={colors.text} />
              <Text style={[styles.menuText, { color: colors.text }]}>View Profile</Text>
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Feather name="log-out" size={20} color={colors.error} />
              <Text style={[styles.menuText, { color: colors.error }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholderAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: spacing.md,
  },
  dropdown: {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    minWidth: 180,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  menuText: {
    ...typography.body,
    marginLeft: spacing.md,
  },
  divider: {
    height: 1,
    marginVertical: spacing.xs,
  },
});

export default ProfileAvatar;

