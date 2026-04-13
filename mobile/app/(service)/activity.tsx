import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FilterTab = 'all' | 'week' | 'month';

const activityLogs = [
  { id: '1', date: 'Today', time: '08:15 AM', type: 'IN' as const, gate: 'Gate A — Pedestrian', status: 'OK' as const },
  { id: '2', date: 'Yesterday', time: '05:30 PM', type: 'OUT' as const, gate: 'Gate A — Pedestrian', status: 'OK' as const },
  { id: '3', date: 'Yesterday', time: '08:05 AM', type: 'IN' as const, gate: 'Gate A — Pedestrian', status: 'OK' as const },
  { id: '4', date: 'Oct 22', time: '06:15 PM', type: 'OUT' as const, gate: 'Gate B — Staff Exit', status: 'OK' as const },
  { id: '5', date: 'Oct 22', time: '07:55 AM', type: 'IN' as const, gate: 'Gate A — Pedestrian', status: 'LATE' as const },
  { id: '6', date: 'Oct 21', time: '05:40 PM', type: 'OUT' as const, gate: 'Gate A — Pedestrian', status: 'OK' as const },
  { id: '7', date: 'Oct 21', time: '08:10 AM', type: 'IN' as const, gate: 'Gate A — Pedestrian', status: 'OK' as const },
  { id: '8', date: 'Oct 20', time: '06:00 PM', type: 'OUT' as const, gate: 'Gate B — Staff Exit', status: 'OK' as const },
];

export default function ServiceActivity() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<FilterTab>('all');

  const filters: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All Time' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'Last Month' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#090e18', '#0e1322', '#090e18']} style={StyleSheet.absoluteFill} />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>ATTENDANCE RECORD</Text>
        <Text style={styles.title}>Activity Log</Text>

        {/* Filter Chips */}
        <View style={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
              onPress={() => setFilter(f.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary Bar */}
        <View style={styles.summaryBar}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>16</Text>
            <Text style={styles.summaryLabel}>Total Entries</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: '#25E0A7' }]}>15</Text>
            <Text style={styles.summaryLabel}>On Time</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: '#EE7D77' }]}>1</Text>
            <Text style={styles.summaryLabel}>Late</Text>
          </View>
        </View>

        {/* Activity Feed */}
        {activityLogs.map((log) => (
          <View key={log.id} style={styles.logCard}>
            <View style={[styles.logIcon, log.type === 'IN' ? styles.logIconIn : styles.logIconOut]}>
              <MaterialIcons
                name={log.type === 'IN' ? 'login' : 'logout'}
                size={18}
                color={log.type === 'IN' ? '#25E0A7' : '#9BABCE'}
              />
            </View>

            <View style={styles.logInfo}>
              <View style={styles.logTopRow}>
                <Text style={styles.logTitle}>
                  {log.type === 'IN' ? 'Checked In' : 'Checked Out'}
                </Text>
                <Text style={styles.logTime}>{log.time}</Text>
              </View>
              <Text style={styles.logDate}>{log.date}</Text>
              <View style={styles.logBottomRow}>
                <Text style={styles.logGate}>{log.gate}</Text>
                {log.status === 'LATE' && (
                  <View style={styles.lateBadge}>
                    <Text style={styles.lateBadgeText}>LATE</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090e18' },
  scrollContent: { paddingHorizontal: 20 },
  eyebrow: {
    fontFamily: 'Inter-Medium', fontSize: 10, letterSpacing: 3, color: '#9BABCE', marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Bold', fontSize: 28, color: '#DEE1F7', marginBottom: 20,
  },

  /* Filters */
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  filterChipActive: {
    backgroundColor: 'rgba(37,224,167,0.1)',
    borderColor: 'rgba(37,224,167,0.3)',
  },
  filterText: { fontFamily: 'Inter-Medium', fontSize: 13, color: '#9BABCE' },
  filterTextActive: { fontFamily: 'Inter-SemiBold', color: '#25E0A7' },

  /* Summary */
  summaryBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(20,25,35,0.6)', borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    padding: 16, marginBottom: 20,
  },
  summaryItem: { flex: 1, alignItems: 'center', gap: 4 },
  summaryValue: { fontFamily: 'Inter-Bold', fontSize: 22, color: '#DEE1F7' },
  summaryLabel: { fontFamily: 'Inter-Regular', fontSize: 10, color: '#6c7a8f', letterSpacing: 0.5 },
  summaryDivider: {
    width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.06)',
  },

  /* Log Card */
  logCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20,25,35,0.4)', borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    padding: 14, marginBottom: 8, gap: 14,
  },
  logIcon: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1,
  },
  logIconIn: {
    backgroundColor: 'rgba(37,224,167,0.1)', borderColor: 'rgba(37,224,167,0.2)',
  },
  logIconOut: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)',
  },
  logInfo: { flex: 1, gap: 2 },
  logTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logTitle: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#DEE1F7' },
  logTime: { fontFamily: 'Inter-Medium', fontSize: 12, color: '#DEE1F7' },
  logDate: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#9BABCE' },
  logBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  logGate: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#6c7a8f' },
  lateBadge: {
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 9999,
    backgroundColor: 'rgba(238,125,119,0.15)',
    borderWidth: 1, borderColor: 'rgba(238,125,119,0.3)',
  },
  lateBadgeText: { fontFamily: 'Inter-Bold', fontSize: 9, letterSpacing: 1, color: '#EE7D77' },
});
