import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import ResidentHeader from '../../components/ResidentHeader';
import { triggerHaptic } from '../../utils/haptics';

const activityFeed = [
  { id: '1', name: 'Priya Sharma', action: 'Entered via Gate A', time: '2:15 PM', badge: 'Inbound' },
  { id: '2', name: 'Vikram Singh', action: 'Exited via Gate B', time: '1:48 PM', badge: 'Outbound' },
  { id: '3', name: 'Meera Patel', action: 'Entered via Gate A', time: '12:30 PM', badge: 'Inbound' },
  { id: '4', name: 'Rahul Gupta', action: 'Exited via Gate A', time: '11:45 AM', badge: 'Outbound' },
  { id: '5', name: 'Sunita Devi', action: 'Entered via Gate C', time: '10:20 AM', badge: 'Inbound' },
];

export default function ResidentMessages() {
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
        {/* ── Pending Actions Label ── */}
        <Text style={styles.sectionLabelAccent}>PENDING ACTIONS</Text>

        {/* ── Entry Request Action Card ── */}
        <View style={styles.requestCard}>
          <View style={styles.requestTop}>
            <View style={styles.requestBadge}>
              <Text style={styles.requestBadgeText}>Entry Request</Text>
            </View>
            <Text style={styles.requestTime}>3 min ago</Text>
          </View>

          <View style={styles.requestBody}>
            <View style={styles.requestInfo}>
              <Text style={styles.requestName}>Rajesh Kumar</Text>
              <Text style={styles.requestSub}>Delivery — Amazon Package</Text>
              <View style={styles.vehicleRow}>
                <MaterialIcons name="directions-car" size={14} color="#6c7a8f" />
                <Text style={styles.vehicleText}>White Van • DL-7C-1234</Text>
              </View>
            </View>

            {/* Camera thumbnail placeholder */}
            <View style={styles.cameraThumbnail}>
              <MaterialIcons name="videocam" size={24} color="#4a5568" />
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.approveBtn} activeOpacity={0.85} onPress={() => triggerHaptic('success')}>
              <MaterialIcons name="check" size={18} color="#090E18" />
              <Text style={styles.approveBtnText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.denyBtn} activeOpacity={0.85} onPress={() => triggerHaptic('error')}>
              <MaterialIcons name="close" size={18} color="#EE7D77" />
              <Text style={styles.denyBtnText}>Deny</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Activity History ── */}
        <Text style={styles.sectionLabel}>ACTIVITY HISTORY</Text>

        {activityFeed.map((item) => (
          <View key={item.id} style={styles.feedCard}>
            <View style={styles.feedAvatar}>
              <Text style={styles.feedAvatarText}>
                {item.name.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.feedInfo}>
              <Text style={styles.feedName}>{item.name}</Text>
              <Text style={styles.feedAction}>{item.action}</Text>
            </View>
            <View style={styles.feedRight}>
              <Text style={styles.feedTime}>{item.time}</Text>
              <View
                style={[
                  styles.feedBadge,
                  item.badge === 'Inbound' ? styles.badgeInbound : styles.badgeOutbound,
                ]}
              >
                <Text
                  style={[
                    styles.feedBadgeText,
                    item.badge === 'Inbound' ? styles.badgeInboundText : styles.badgeOutboundText,
                  ]}
                >
                  {item.badge}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* ── Live Camera Card ── */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>LIVE FEED</Text>
        <View style={styles.cameraCard}>
          <View style={styles.cameraPreview}>
            <MaterialIcons name="videocam" size={40} color="#2a3445" />
          </View>
          <View style={styles.cameraInfo}>
            <View style={styles.cameraLabelRow}>
              <Text style={styles.cameraLabel}>Gate A — Live Feed</Text>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Online</Text>
            </View>
            <Text style={styles.cameraTap}>Tap to expand</Text>
          </View>
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
  },

  /* ── Section Labels ── */
  sectionLabelAccent: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 3,
    color: '#53FEC2',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  sectionLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 3,
    color: '#9BABCE',
    textTransform: 'uppercase',
    marginBottom: 12,
  },

  /* ── Entry Request Card ── */
  requestCard: {
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    marginBottom: 28,
    gap: 16,
  },
  requestTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requestBadge: {
    backgroundColor: 'rgba(250,204,21,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(250,204,21,0.3)',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  requestBadgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 1,
    color: '#FACC15',
    textTransform: 'uppercase',
  },
  requestTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#6c7a8f',
  },
  requestBody: {
    flexDirection: 'row',
    gap: 14,
  },
  requestInfo: {
    flex: 1,
    gap: 4,
  },
  requestName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    color: '#DEE1F7',
  },
  requestSub: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#9BABCE',
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  vehicleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6c7a8f',
  },
  cameraThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#1a2030',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  approveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#25E0A7',
    borderRadius: 12,
    height: 44,
  },
  approveBtnText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#090E18',
  },
  denyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(238,125,119,0.15)',
    borderRadius: 12,
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(238,125,119,0.3)',
  },
  denyBtnText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#EE7D77',
  },

  /* ── Feed Card ── */
  feedCard: {
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
  feedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#25293A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedAvatarText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: '#9BABCE',
  },
  feedInfo: {
    flex: 1,
    gap: 2,
  },
  feedName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#DEE1F7',
  },
  feedAction: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9BABCE',
  },
  feedRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  feedTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#6c7a8f',
  },
  feedBadge: {
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
  feedBadgeText: {
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

  /* ── Camera Card ── */
  cameraCard: {
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  cameraPreview: {
    height: 160,
    backgroundColor: '#0d1220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraInfo: {
    padding: 16,
    gap: 4,
  },
  cameraLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cameraLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#DEE1F7',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#25E0A7',
  },
  onlineText: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#25E0A7',
  },
  cameraTap: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6c7a8f',
  },
});
