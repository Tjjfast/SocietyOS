import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function GuardHeader() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <BlurView
        intensity={40}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        {/* Left: Shield + ShieldGuard */}
        <View style={styles.leftSection}>
          <View style={styles.shieldBadge}>
            <MaterialIcons name="shield" size={20} color="#53FEC2" />
          </View>
          <View>
            <Text style={styles.appName}>SHIELDGUARD</Text>
            <Text style={styles.subtitle}>Security Protocol Active</Text>
          </View>
        </View>

        {/* Right: Settings */}
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => router.push('/(guard)/settings')}
        >
          <MaterialIcons name="settings" size={22} color="#9BABCE" />
        </TouchableOpacity>
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
  shieldBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(83,254,194,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(83,254,194,0.15)',
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    letterSpacing: 3,
    color: '#DEE1F7',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    letterSpacing: 1,
    color: '#53FEC2',
    marginTop: 2,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
