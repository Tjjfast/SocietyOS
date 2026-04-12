import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import GuardHeader from '../../components/GuardHeader';

const metrics = [
  { label: 'Total Entries', value: '1,284', trend: '+12%', trendColor: '#25E0A7' },
  { label: 'Active Visitors', value: '42', trend: 'Live', trendColor: '#53FEC2' },
  { label: 'Flagged', value: '03', trend: 'Alert', trendColor: '#EE7D77' },
];

const logFeed = [
  { id: '1', name: 'Priya Sharma', type: 'Delivery — Swiggy', time: '2:15 PM', gate: 'Gate A', badge: 'INBOUND' },
  { id: '2', name: 'Vikram Singh', type: 'Guest — Family', time: '1:48 PM', gate: 'Gate B', badge: 'OUTBOUND' },
  { id: '3', name: 'Meera Patel', type: 'Cab — Uber', time: '12:30 PM', gate: 'Gate A', badge: 'INBOUND' },
  { id: '4', name: 'Rahul Gupta', type: 'Delivery — Amazon', time: '11:45 AM', gate: 'Gate C', badge: 'OUTBOUND' },
  { id: '5', name: 'Sunita Devi', type: 'Service — Plumber', time: '10:20 AM', gate: 'Gate A', badge: 'INBOUND' },
  { id: '6', name: 'Amit Joshi', type: 'Guest — Friend', time: '9:15 AM', gate: 'Gate B', badge: 'INBOUND' },
];

export default function GuardLogs() {
  const [search, setSearch] = useState('');

  const filtered = logFeed.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#090e18', '#0e1322', '#090e18']} style={StyleSheet.absoluteFill} />
      <GuardHeader />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>SECURITY LOG</Text>
        <Text style={styles.title}>Activity Logs</Text>

        {/* Metrics Bento */}
        <View style={styles.metricRow}>
          {metrics.map((m, i) => (
            <View key={i} style={styles.metricCard}>
              <Text style={styles.metricLabel}>{m.label}</Text>
              <Text style={styles.metricValue}>{m.value}</Text>
              <View style={[styles.metricBadge, { borderColor: m.trendColor + '40' }]}>
                <Text style={[styles.metricBadgeText, { color: m.trendColor }]}>{m.trend}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#6c7a8f" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search logs..."
            placeholderTextColor="#4a5568"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity>
            <MaterialIcons name="filter-list" size={20} color="#9BABCE" />
          </TouchableOpacity>
        </View>

        {/* Log Feed */}
        {filtered.map((log) => (
          <View key={log.id} style={styles.logCard}>
            <View style={styles.logAvatar}>
              <Text style={styles.logAvatarText}>
                {log.name.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.logInfo}>
              <Text style={styles.logName}>{log.name}</Text>
              <Text style={styles.logType}>{log.type}</Text>
              <Text style={styles.logMeta}>{log.gate} • {log.time}</Text>
            </View>
            <View
              style={[
                styles.logBadge,
                log.badge === 'INBOUND' ? styles.badgeIn : styles.badgeOut,
              ]}
            >
              <Text
                style={[
                  styles.logBadgeText,
                  log.badge === 'INBOUND' ? styles.badgeInText : styles.badgeOutText,
                ]}
              >
                {log.badge}
              </Text>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  eyebrow: { fontFamily: 'Inter-Medium', fontSize: 10, letterSpacing: 3, color: '#53FEC2', marginBottom: 8 },
  title: { fontFamily: 'Inter-Bold', fontSize: 28, color: '#DEE1F7', marginBottom: 20 },

  /* Metrics */
  metricRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  metricCard: {
    flex: 1,
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    gap: 6,
  },
  metricLabel: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#9BABCE' },
  metricValue: { fontFamily: 'Inter-Bold', fontSize: 26, color: '#DEE1F7' },
  metricBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
  },
  metricBadgeText: { fontFamily: 'Inter-Bold', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' as const },

  /* Search */
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
    marginBottom: 20,
  },
  searchInput: { flex: 1, fontFamily: 'Inter-Regular', fontSize: 14, color: '#DEE1F7' },

  /* Log Card */
  logCard: {
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
  logAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#25293A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logAvatarText: { fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#9BABCE' },
  logInfo: { flex: 1, gap: 2 },
  logName: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#DEE1F7' },
  logType: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#9BABCE' },
  logMeta: { fontFamily: 'Inter-Regular', fontSize: 10, color: '#4a5568' },
  logBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 9999, borderWidth: 1 },
  badgeIn: { borderColor: 'rgba(37,224,167,0.3)' },
  badgeOut: { borderColor: 'rgba(255,255,255,0.1)' },
  logBadgeText: { fontFamily: 'Inter-Bold', fontSize: 8, letterSpacing: 1, textTransform: 'uppercase' as const },
  badgeInText: { color: '#25E0A7' },
  badgeOutText: { color: '#9BABCE' },
});
