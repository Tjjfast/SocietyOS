import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const FRAME_SIZE = 288;

export default function GuardScan() {
  const insets = useSafeAreaInsets();
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: FRAME_SIZE - 4,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scanLineAnim]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#090e18', '#060a12']} style={StyleSheet.absoluteFill} />

      {/* Dark overlay with cutout effect simulated */}
      <View style={styles.overlayContainer}>
        {/* Top section */}
        <View style={[styles.overlaySection, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerRow}>
            <View style={styles.shieldBadge}>
              <MaterialIcons name="shield" size={18} color="#53FEC2" />
            </View>
            <Text style={styles.headerTitle}>SHIELDGUARD</Text>
          </View>
          <Text style={styles.guidance}>Align QR Code within the frame</Text>
          <Text style={styles.subGuidance}>Scanning for authorized credentials...</Text>
        </View>

        {/* Scanner Frame */}
        <View style={styles.frameContainer}>
          <View style={styles.frame}>
            {/* Corner accents */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {/* Animated scan line */}
            <Animated.View
              style={[
                styles.scanLine,
                { transform: [{ translateY: scanLineAnim }] },
              ]}
            >
              <LinearGradient
                colors={['transparent', '#53FEC2', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.scanLineGradient}
              />
            </Animated.View>
          </View>
        </View>

        {/* Bottom controls */}
        <View style={[styles.controls, { paddingBottom: insets.bottom + 80 }]}>
          <TouchableOpacity style={styles.controlBtn}>
            <MaterialIcons name="flash-on" size={24} color="#9BABCE" />
            <Text style={styles.controlLabel}>Torch</Text>
          </TouchableOpacity>

          <View style={styles.scanBtnOuter}>
            <TouchableOpacity style={styles.scanBtnInner}>
              <MaterialIcons name="qr-code-scanner" size={28} color="#090E18" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.controlBtn}>
            <MaterialIcons name="zoom-in" size={24} color="#9BABCE" />
            <Text style={styles.controlLabel}>Zoom</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#060a12' },
  overlayContainer: { flex: 1, justifyContent: 'space-between' },

  /* Header */
  overlaySection: { alignItems: 'center', gap: 8, paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  shieldBadge: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: 'rgba(83,254,194,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold', fontSize: 16, letterSpacing: 4, color: '#DEE1F7',
  },
  guidance: {
    fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#DEE1F7', marginTop: 16,
  },
  subGuidance: {
    fontFamily: 'Inter-Regular', fontSize: 13, color: '#53FEC2', letterSpacing: 0.5,
  },

  /* Frame */
  frameContainer: { alignItems: 'center', justifyContent: 'center' },
  frame: {
    width: FRAME_SIZE, height: FRAME_SIZE,
    borderWidth: 2, borderColor: 'rgba(83,254,194,0.25)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute', width: 32, height: 32,
    borderColor: '#53FEC2', borderWidth: 4,
  },
  cornerTL: { top: -1, left: -1, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 12 },
  cornerTR: { top: -1, right: -1, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 12 },
  cornerBL: { bottom: -1, left: -1, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 12 },
  cornerBR: { bottom: -1, right: -1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 12 },

  scanLine: { position: 'absolute', left: 0, right: 0, height: 2 },
  scanLineGradient: { flex: 1 },

  /* Controls */
  controls: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  controlBtn: { alignItems: 'center', gap: 4 },
  controlLabel: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#6c7a8f' },
  scanBtnOuter: {
    width: 72, height: 72, borderRadius: 36,
    borderWidth: 3, borderColor: 'rgba(83,254,194,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  scanBtnInner: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#53FEC2',
    alignItems: 'center', justifyContent: 'center',
  },
});
