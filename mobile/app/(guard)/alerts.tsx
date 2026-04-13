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
import GuardHeader from '../../components/GuardHeader';

const overstayAlerts = [
  { id: '1', name: 'Rahul Verma', type: 'Cab — Ola', duration: '45 min overdue', flat: 'D-301' },
  { id: '2', name: 'Sanjay Gupta', type: 'Delivery — Flipkart', duration: '20 min overdue', flat: 'A-108' },
];

export default function GuardAlerts() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#090e18', '#0e1322', '#090e18']} style={StyleSheet.absoluteFill} />
      <GuardHeader />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>SECURITY ALERTS</Text>
        <Text style={styles.title}>Alerts</Text>

        {/* Emergency Broadcast Banner */}
        <View style={styles.emergencyBanner}>
          <View style={styles.emergencyIconBg}>
            <MaterialIcons name="warning" size={80} color="rgba(238,125,119,0.08)" />
          </View>
          <View style={styles.emergencyContent}>
            <View style={styles.emergencyBadge}>
              <Text style={styles.emergencyBadgeText}>EMERGENCY</Text>
            </View>
            <Text style={styles.emergencyTitle}>Security Alert Active</Text>
            <Text style={styles.emergencyBody}>
              Unauthorized vehicle detected at Gate C. CCTV recording active. Authorities notified.
            </Text>
            <View style={styles.emergencyActions}>
              <TouchableOpacity style={styles.acknowledgeBtn} activeOpacity={0.85}>
                <Text style={styles.acknowledgeBtnText}>Acknowledge</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.escalateBtn} activeOpacity={0.85}>
                <Text style={styles.escalateBtnText}>Escalate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Denied Entry Card */}
        <Text style={styles.sectionLabel}>DENIED ENTRIES</Text>
        <View style={styles.deniedCard}>
          <View style={styles.deniedTop}>
            <View style={styles.deniedBadge}>
              <Text style={styles.deniedBadgeText}>DENIED</Text>
            </View>
            <Text style={styles.deniedTime}>Today, 1:42 PM</Text>
          </View>
          <Text style={styles.deniedName}>Unknown Individual</Text>
          <Text style={styles.deniedMeta}>No valid QR code • Attempted Gate A</Text>
          <View style={styles.vehicleRow}>
            <MaterialIcons name="directions-car" size={14} color="#6c7a8f" />
            <Text style={styles.vehicleText}>Black Sedan • MH-02-AB-1234</Text>
          </View>
          <View style={styles.deniedImagePlaceholder}>
            <MaterialIcons name="videocam" size={32} color="#2a3445" />
            <Text style={styles.deniedImageLabel}>CCTV Capture</Text>
          </View>
        </View>

        {/* Overstay Alerts */}
        <Text style={styles.sectionLabel}>OVERSTAY ALERTS</Text>
        {overstayAlerts.map((alert) => (
          <View key={alert.id} style={styles.overstayCard}>
            <View style={styles.overstayAvatar}>
              <Text style={styles.avatarText}>
                {alert.name.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.overstayInfo}>
              <Text style={styles.overstayName}>{alert.name}</Text>
              <Text style={styles.overstayMeta}>{alert.type} • {alert.flat}</Text>
              <View style={styles.overstayDuration}>
                <MaterialIcons name="access-time" size={12} color="#EE7D77" />
                <Text style={styles.overstayDurationText}>{alert.duration}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.contactBtn} activeOpacity={0.85}>
              <MaterialIcons name="call" size={16} color="#53FEC2" />
            </TouchableOpacity>
          </View>
        ))}

        {/* System Status Bar */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>SYSTEM STATUS</Text>
        <View style={styles.systemStatus}>
          <View style={styles.systemRow}>
            <View style={styles.systemDot} />
            <Text style={styles.systemLabel}>CCTV Network</Text>
            <Text style={styles.systemValue}>All Online (12/12)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.systemRow}>
            <View style={styles.systemDot} />
            <Text style={styles.systemLabel}>Gate Systems</Text>
            <Text style={styles.systemValue}>Operational (3/3)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.systemRow}>
            <View style={[styles.systemDot, { backgroundColor: '#FACC15' }]} />
            <Text style={styles.systemLabel}>Intercom</Text>
            <Text style={[styles.systemValue, { color: '#FACC15' }]}>Maintenance</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090e18' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  eyebrow: { fontFamily: 'Inter-Medium', fontSize: 10, letterSpacing: 3, color: '#53FEC2', marginBottom: 8 },
  title: { fontFamily: 'Inter-Bold', fontSize: 28, color: '#DEE1F7', marginBottom: 20 },
  sectionLabel: { fontFamily: 'Inter-Bold', fontSize: 10, letterSpacing: 3, color: '#9BABCE', textTransform: 'uppercase' as const, marginBottom: 12 },

  /* Emergency */
  emergencyBanner: {
    backgroundColor: 'rgba(147,0,10,0.2)', borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(238,125,119,0.3)',
    padding: 20, marginBottom: 24, overflow: 'hidden',
  },
  emergencyIconBg: { position: 'absolute', top: -10, right: -10 },
  emergencyContent: { gap: 10 },
  emergencyBadge: {
    alignSelf: 'flex-start', backgroundColor: 'rgba(238,125,119,0.2)',
    borderWidth: 1, borderColor: 'rgba(238,125,119,0.4)',
    borderRadius: 9999, paddingHorizontal: 12, paddingVertical: 4,
  },
  emergencyBadgeText: { fontFamily: 'Inter-Bold', fontSize: 10, letterSpacing: 1.5, color: '#FFB4AB', textTransform: 'uppercase' as const },
  emergencyTitle: { fontFamily: 'Inter-Bold', fontSize: 18, color: '#FFB4AB' },
  emergencyBody: { fontFamily: 'Inter-Regular', fontSize: 13, lineHeight: 20, color: '#EE7D77' },
  emergencyActions: { flexDirection: 'row', gap: 10, marginTop: 6 },
  acknowledgeBtn: {
    flex: 1, height: 40, borderRadius: 10,
    backgroundColor: 'rgba(238,125,119,0.2)',
    borderWidth: 1, borderColor: 'rgba(238,125,119,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  acknowledgeBtnText: { fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#FFB4AB' },
  escalateBtn: {
    flex: 1, height: 40, borderRadius: 10,
    backgroundColor: '#EE7D77',
    alignItems: 'center', justifyContent: 'center',
  },
  escalateBtnText: { fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#090E18' },

  /* Denied */
  deniedCard: {
    backgroundColor: 'rgba(20,25,35,0.6)', borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    padding: 20, marginBottom: 24, gap: 8,
  },
  deniedTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  deniedBadge: {
    backgroundColor: 'rgba(238,125,119,0.15)',
    borderWidth: 1, borderColor: 'rgba(238,125,119,0.3)',
    borderRadius: 9999, paddingHorizontal: 12, paddingVertical: 3,
  },
  deniedBadgeText: { fontFamily: 'Inter-Bold', fontSize: 9, letterSpacing: 1, color: '#EE7D77', textTransform: 'uppercase' as const },
  deniedTime: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#6c7a8f' },
  deniedName: { fontFamily: 'Inter-SemiBold', fontSize: 17, color: '#DEE1F7' },
  deniedMeta: { fontFamily: 'Inter-Regular', fontSize: 13, color: '#9BABCE' },
  vehicleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  vehicleText: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#6c7a8f' },
  deniedImagePlaceholder: {
    height: 120, borderRadius: 12, backgroundColor: '#0d1220',
    alignItems: 'center', justifyContent: 'center', marginTop: 4, gap: 4,
  },
  deniedImageLabel: { fontFamily: 'Inter-Regular', fontSize: 10, color: '#3e4759' },

  /* Overstay */
  overstayCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(20,25,35,0.4)', borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    padding: 14, marginBottom: 8, gap: 12,
  },
  overstayAvatar: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#25293A', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#9BABCE' },
  overstayInfo: { flex: 1, gap: 2 },
  overstayName: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#DEE1F7' },
  overstayMeta: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#6c7a8f' },
  overstayDuration: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  overstayDurationText: { fontFamily: 'Inter-Medium', fontSize: 11, color: '#EE7D77' },
  contactBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(83,254,194,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },

  /* System Status */
  systemStatus: {
    backgroundColor: 'rgba(20,25,35,0.6)', borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    padding: 20,
  },
  systemRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 },
  systemDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#25E0A7' },
  systemLabel: { fontFamily: 'Inter-Medium', fontSize: 14, color: '#DEE1F7', flex: 1 },
  systemValue: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#25E0A7' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 10 },
});
