import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResidentHeader() {
  const insets = useSafeAreaInsets();
  const pingAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pingAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pingAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pingAnim]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <BlurView
        intensity={40}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        {/* Left: Avatar + Name */}
        <View style={styles.leftSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AM</Text>
          </View>
          <View>
            <Text style={styles.name}>Aarav Mehta</Text>
            <Text style={styles.unit}>A-402 • Resident</Text>
          </View>
        </View>

        {/* Right: Notification Bell */}
        <View style={styles.rightSection}>
          <View style={styles.bellWrapper}>
            <MaterialIcons name="notifications-none" size={24} color="#9BABCE" />
            <Animated.View style={[styles.pingDot, { opacity: pingAnim }]} />
          </View>
          <MaterialIcons name="more-vert" size={22} color="#6c7a8f" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 50,
    backgroundColor: 'rgba(9,14,24,0.6)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148,163,184,0.1)',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#25293A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  avatarText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#9BABCE',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#DEE1F7',
  },
  unit: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#6c7a8f',
    marginTop: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bellWrapper: {
    position: 'relative',
  },
  pingDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FACC15',
  },
});
