import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ResidentHeader from '../../components/ResidentHeader';

const { width } = Dimensions.get('window');

const recentVisitors = [
  { id: '1', name: 'Priya Sharma', action: 'Delivery — Swiggy', time: '2:15 PM', badge: 'Inbound' },
  { id: '2', name: 'Vikram Singh', action: 'Guest — Family Visit', time: '1:30 PM', badge: 'Inbound' },
  { id: '3', name: 'Meera Patel', action: 'Cab — Uber Pick Up', time: '12:45 PM', badge: 'Outbound' },
];

export default function ResidentHome() {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#090e18', '#0e1322', '#090e18']}
        style={StyleSheet.absoluteFill}
      />

      <ResidentHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Active Pass Card ── */}
        <View style={styles.glassCard}>
          <View style={styles.passHeader}>
            <View style={styles.passQR}>
              <MaterialIcons name="qr-code-2" size={32} color="#25293A" />
            </View>
            <View style={styles.passInfo}>
              <Text style={styles.passTitle}>One-Time Delivery Pass</Text>
              <Text style={styles.passValidity}>Valid: Today, 2:00 PM – 5:00 PM</Text>
              <View style={styles.statusRow}>
                <Animated.View style={[styles.pulseDot, { opacity: pulseAnim }]} />
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.passFooter}>
            <Text style={styles.passFooterText}>Tap to view full pass</Text>
            <MaterialIcons name="chevron-right" size={18} color="#6c7a8f" />
          </TouchableOpacity>
        </View>

        {/* ── Quick Actions Bento Grid ── */}
        <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>
        <View style={styles.bentoGrid}>
          {/* Primary: Create Pass (left, full height) */}
          <TouchableOpacity
            style={styles.bentoPrimary}
            onPress={() => router.push('/(resident)/create-pass')}
            activeOpacity={0.85}
          >
            <MaterialIcons name="add-circle-outline" size={28} color="#DBE5FF" />
            <View style={styles.bentoPrimaryText}>
              <Text style={styles.bentoPrimaryTitle}>Create One-Time Pass</Text>
              <Text style={styles.bentoPrimarySub}>Generate a visitor QR code</Text>
            </View>
            <View style={styles.bentoPrimaryArrow}>
              <MaterialIcons name="arrow-forward" size={18} color="#9BABCE" />
            </View>
          </TouchableOpacity>

          {/* Secondary stack (right) */}
          <View style={styles.bentoSecondaryStack}>
            <TouchableOpacity
              style={styles.bentoSecondary}
              onPress={() => router.push('/(resident)/visitors')}
              activeOpacity={0.85}
            >
              <MaterialIcons name="group" size={20} color="#9BABCE" />
              <Text style={styles.bentoSecondaryText}>View All Visitors</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bentoSecondary} activeOpacity={0.85}>
              <MaterialIcons name="forum" size={20} color="#9BABCE" />
              <Text style={styles.bentoSecondaryText}>Community Board</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Recent Visitors List ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>RECENT VISITORS</Text>
          <TouchableOpacity onPress={() => router.push('/(resident)/visitors')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {recentVisitors.map((visitor) => (
          <View key={visitor.id} style={styles.visitorCard}>
            <View style={styles.visitorAvatar}>
              <Text style={styles.visitorAvatarText}>
                {visitor.name.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.visitorInfo}>
              <Text style={styles.visitorName}>{visitor.name}</Text>
              <Text style={styles.visitorAction}>{visitor.action}</Text>
            </View>
            <View style={styles.visitorRight}>
              <Text style={styles.visitorTime}>{visitor.time}</Text>
              <View
                style={[
                  styles.directionBadge,
                  visitor.badge === 'Inbound' ? styles.badgeInbound : styles.badgeOutbound,
                ]}
              >
                <Text
                  style={[
                    styles.directionText,
                    visitor.badge === 'Inbound' ? styles.badgeInboundText : styles.badgeOutboundText,
                  ]}
                >
                  {visitor.badge}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* ── Community Notice ── */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>NOTICE BOARD</Text>
        <View style={styles.noticeCard}>
          <View style={styles.noticeHeader}>
            <MaterialIcons name="visibility" size={16} color="#9BABCE" />
            <Text style={styles.noticeHeaderText}>Community Notice</Text>
          </View>
          <Text style={styles.noticeBody}>
            Monthly maintenance scheduled for Block A elevators on April 15th. Please use Block B elevators during 10 AM – 4 PM.
          </Text>
          <Text style={styles.noticeTime}>Posted 2h ago</Text>
        </View>

        {/* Bottom spacer for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090e18',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },

  /* ── Glass Card (Active Pass) ── */
  glassCard: {
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    marginBottom: 24,
  },
  passHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  passQR: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passInfo: {
    flex: 1,
    gap: 4,
  },
  passTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#DEE1F7',
  },
  passValidity: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9BABCE',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#25E0A7',
  },
  statusText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#25E0A7',
    textTransform: 'uppercase',
  },
  passFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingTop: 12,
  },
  passFooterText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6c7a8f',
  },

  /* ── Section Label ── */
  sectionLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 3,
    color: '#9BABCE',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAll: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#53FEC2',
  },

  /* ── Bento Grid ── */
  bentoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  bentoPrimary: {
    flex: 1,
    backgroundColor: '#34495E',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    height: 144,
    justifyContent: 'space-between',
  },
  bentoPrimaryText: {
    gap: 4,
  },
  bentoPrimaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#DBE5FF',
  },
  bentoPrimarySub: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#9BABCE',
  },
  bentoPrimaryArrow: {
    alignSelf: 'flex-end',
  },
  bentoSecondaryStack: {
    flex: 1,
    gap: 12,
  },
  bentoSecondary: {
    flex: 1,
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bentoSecondaryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#DEE1F7',
  },

  /* ── Visitor Card ── */
  visitorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20,25,35,0.4)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  visitorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#25293A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitorAvatarText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#9BABCE',
  },
  visitorInfo: {
    flex: 1,
    gap: 2,
  },
  visitorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#DEE1F7',
  },
  visitorAction: {
    fontFamily: 'Inter-Light',
    fontSize: 12,
    color: '#9BABCE',
  },
  visitorRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  visitorTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#6c7a8f',
  },
  directionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
  },
  badgeInbound: {
    borderColor: 'rgba(37,224,167,0.3)',
  },
  badgeOutbound: {
    borderColor: 'rgba(255,255,255,0.1)',
  },
  directionText: {
    fontFamily: 'Inter-Bold',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  badgeInboundText: {
    color: '#25E0A7',
  },
  badgeOutboundText: {
    color: '#9BABCE',
  },

  /* ── Notice Card ── */
  noticeCard: {
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    gap: 10,
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  noticeHeaderText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#DEE1F7',
  },
  noticeBody: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#9BABCE',
  },
  noticeTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#4a5568',
  },
});
