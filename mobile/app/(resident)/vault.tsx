import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import ResidentHeader from '../../components/ResidentHeader';

export default function ResidentVault() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#090e18', '#0e1322', '#090e18']}
        style={StyleSheet.absoluteFill}
      />

      <ResidentHeader />

      <View style={styles.content}>
        <View style={styles.glassPanel}>
          <MaterialIcons name="account-balance-wallet" size={64} color="#424753" />
          <Text style={styles.heading}>No data available</Text>
          <Text style={styles.body}>There is no activity found.</Text>

          <View style={styles.footerRow}>
            <MaterialIcons name="lock" size={12} color="#3e4759" />
            <Text style={styles.footerText}>Secure Digital Vault — Coming Soon</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090e18',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  glassPanel: {
    width: 300,
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  heading: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#DEE1F7',
    marginTop: 8,
  },
  body: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9BABCE',
    textAlign: 'center',
    lineHeight: 22,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#3e4759',
    letterSpacing: 0.5,
  },
});
