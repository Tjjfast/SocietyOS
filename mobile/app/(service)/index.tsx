import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ServiceHome() {
  const insets = useSafeAreaInsets();
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, [glowAnim]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#090e18', '#0e1322', '#090e18']} style={StyleSheet.absoluteFill} />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.name}>Sunita Devi</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <MaterialIcons name="notifications-none" size={22} color="#9BABCE" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* ── Digital ID Card ── */}
        <View style={styles.idCardOuter}>
          {/* Animated glow ring */}
          <Animated.View style={[styles.glowRing, { opacity: glowAnim }]} />

          <View style={styles.idCard}>
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />

            {/* Top: Avatar + Info + Verified */}
            <View style={styles.idTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>SD</Text>
              </View>
              <View style={styles.idInfo}>
                <Text style={styles.idName}>Sunita Devi</Text>
                <Text style={styles.idRole}>Housekeeping</Text>
                <Text style={styles.idNumber}>ID: SO-2023-A84</Text>
              </View>
              <View style={styles.verifiedBadge}>
                <MaterialIcons name="verified" size={14} color="#25E0A7" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>

            {/* QR Code */}
            <View style={styles.qrWrapper}>
              <View style={styles.qrInner}>
                <MaterialIcons name="qr-code-2" size={120} color="#1a1a2e" />
              </View>
            </View>
            <Text style={styles.qrHint}>Scan at gate for entry / exit</Text>
          </View>
        </View>

        {/* ── Stats Bento ── */}
        <Text style={styles.sectionLabel}>MONTHLY STATS</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}>
              <MaterialIcons name="schedule" size={18} color="#9BABCE" />
            </View>
            <Text style={styles.statValue}>184</Text>
            <Text style={styles.statLabel}>Shift Hours</Text>
            <View style={styles.statTrend}>
              <MaterialIcons name="trending-up" size={12} color="#25E0A7" />
              <Text style={styles.statTrendText}>+8%</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconWrap}>
              <MaterialIcons name="check-circle-outline" size={18} color="#25E0A7" />
            </View>
            <Text style={styles.statValue}>22/24</Text>
            <Text style={styles.statLabel}>Attendance</Text>
            <View style={styles.statTrend}>
              <MaterialIcons name="trending-up" size={12} color="#25E0A7" />
              <Text style={styles.statTrendText}>92%</Text>
            </View>
          </View>
        </View>

        {/* ── Recent Activity ── */}
        <Text style={styles.sectionLabel}>RECENT ACTIVITY</Text>
        <View style={styles.activityCard}>
          {/* Entry 1 */}
          <View style={styles.activityRow}>
            <View style={[styles.activityIcon, styles.activityIconIn]}>
              <MaterialIcons name="login" size={16} color="#25E0A7" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Checked In</Text>
              <Text style={styles.activityTime}>Today, 08:15 AM • Gate A</Text>
            </View>
          </View>

          <View style={styles.activityDivider} />

          {/* Entry 2 */}
          <View style={styles.activityRow}>
            <View style={[styles.activityIcon, styles.activityIconOut]}>
              <MaterialIcons name="logout" size={16} color="#9BABCE" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Checked Out</Text>
              <Text style={styles.activityTime}>Yesterday, 05:30 PM • Gate A</Text>
            </View>
          </View>

          <View style={styles.activityDivider} />

          {/* Entry 3 */}
          <View style={styles.activityRow}>
            <View style={[styles.activityIcon, styles.activityIconIn]}>
              <MaterialIcons name="login" size={16} color="#25E0A7" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Checked In</Text>
              <Text style={styles.activityTime}>Yesterday, 08:05 AM • Gate A</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090e18' },
  scrollContent: { paddingHorizontal: 20 },

  /* Header */
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28,
  },
  greeting: { fontFamily: 'Inter-Regular', fontSize: 13, color: '#9BABCE' },
  name: { fontFamily: 'Inter-Bold', fontSize: 24, color: '#DEE1F7', marginTop: 2 },
  bellBtn: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute', top: 11, right: 12,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#25E0A7', borderWidth: 1.5, borderColor: '#090e18',
  },

  /* Digital ID Card */
  idCardOuter: {
    marginBottom: 28, alignItems: 'center',
  },
  glowRing: {
    position: 'absolute', top: -8, left: -8, right: -8, bottom: -8,
    borderRadius: 32, borderWidth: 2, borderColor: 'rgba(37,224,167,0.25)',
  },
  idCard: {
    width: '100%',
    borderRadius: 24, padding: 24,
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderWidth: 1, borderColor: 'rgba(37,224,167,0.3)',
    overflow: 'hidden',
  },
  idTop: {
    flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: '#25293A', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(83,254,194,0.2)',
  },
  avatarText: { fontFamily: 'Inter-Bold', fontSize: 18, color: '#53FEC2' },
  idInfo: { flex: 1, marginLeft: 14, gap: 2 },
  idName: { fontFamily: 'Inter-Bold', fontSize: 18, color: '#DEE1F7' },
  idRole: { fontFamily: 'Inter-Regular', fontSize: 13, color: '#9BABCE' },
  idNumber: { fontFamily: 'Inter-Medium', fontSize: 11, color: '#6c7a8f', letterSpacing: 1, marginTop: 2 },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12,
    backgroundColor: 'rgba(37,224,167,0.1)',
  },
  verifiedText: { fontFamily: 'Inter-Medium', fontSize: 10, color: '#25E0A7' },

  qrWrapper: { alignItems: 'center', marginBottom: 12 },
  qrInner: {
    padding: 16, backgroundColor: '#FFFFFF', borderRadius: 16,
  },
  qrHint: {
    fontFamily: 'Inter-Regular', fontSize: 12, color: '#9BABCE', textAlign: 'center',
  },

  /* Section Labels */
  sectionLabel: {
    fontFamily: 'Inter-Bold', fontSize: 10, letterSpacing: 3,
    color: '#9BABCE', marginBottom: 12,
  },

  /* Stats */
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(20,25,35,0.6)', borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    padding: 16, gap: 6,
  },
  statIconWrap: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center', justifyContent: 'center',
  },
  statValue: { fontFamily: 'Inter-Bold', fontSize: 28, color: '#DEE1F7' },
  statLabel: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#6c7a8f' },
  statTrend: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 9999,
    backgroundColor: 'rgba(37,224,167,0.1)',
  },
  statTrendText: { fontFamily: 'Inter-SemiBold', fontSize: 10, color: '#25E0A7' },

  /* Activity */
  activityCard: {
    backgroundColor: 'rgba(20,25,35,0.6)', borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
  },
  activityRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  activityIcon: {
    width: 38, height: 38, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
    borderWidth: 1,
  },
  activityIconIn: {
    backgroundColor: 'rgba(37,224,167,0.1)', borderColor: 'rgba(37,224,167,0.2)',
  },
  activityIconOut: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)',
  },
  activityInfo: { flex: 1, gap: 2 },
  activityTitle: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#DEE1F7' },
  activityTime: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#6c7a8f' },
  activityDivider: {
    height: 1, backgroundColor: 'rgba(255,255,255,0.04)',
    marginLeft: 52, marginVertical: 8,
  },
});
