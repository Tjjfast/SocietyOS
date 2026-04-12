import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import GuardHeader from '../../components/GuardHeader';
import { triggerHaptic } from '../../utils/haptics';

const onPremises = [
  { id: '1', name: 'Priya Sharma', type: 'Delivery', flat: 'A-402', since: '2:15 PM' },
  { id: '2', name: 'Vikram Singh', type: 'Guest', flat: 'B-201', since: '1:30 PM' },
  { id: '3', name: 'Lakshmi Devi', type: 'Service', flat: 'C-105', since: '11:00 AM' },
];

export default function GuardStatus() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [flat, setFlat] = useState('');
  const [visitors, setVisitors] = useState(onPremises);

  const handleConfirm = () => {
    if (!name.trim()) return;
    triggerHaptic('success');
    Alert.alert('Entry Confirmed', `${name} has been logged at the gate.`);
    setName('');
    setPhone('');
    setFlat('');
  };

  const handleLogExit = (id: string) => {
    triggerHaptic('light');
    setVisitors((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient colors={['#090e18', '#0e1322', '#090e18']} style={StyleSheet.absoluteFill} />
      <GuardHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.eyebrow}>GATE CONTROL</Text>
        <Text style={styles.title}>Manual Entry</Text>

        {/* Manual Entry Form */}
        <View style={styles.formCard}>
          <Text style={styles.formSection}>VISITOR DETAILS</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter visitor name"
              placeholderTextColor="rgba(26,26,46,0.4)"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="rgba(26,26,46,0.4)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Flat / Unit</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. A-402"
              placeholderTextColor="rgba(26,26,46,0.4)"
              value={flat}
              onChangeText={setFlat}
            />
          </View>

          {/* Confirm Entrance CTA */}
          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.85}>
            <MaterialIcons name="login" size={20} color="#090E18" />
            <Text style={styles.confirmBtnText}>Confirm Entrance</Text>
          </TouchableOpacity>
        </View>

        {/* On-Premises List */}
        <Text style={styles.sectionLabel}>ON PREMISES ({visitors.length})</Text>

        {visitors.map((v) => (
          <View key={v.id} style={styles.visitorCard}>
            <View style={styles.visitorAvatar}>
              <Text style={styles.avatarText}>
                {v.name.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.visitorInfo}>
              <Text style={styles.visitorName}>{v.name}</Text>
              <Text style={styles.visitorMeta}>{v.type} • {v.flat} • Since {v.since}</Text>
            </View>
            <TouchableOpacity
              style={styles.exitBtn}
              onPress={() => handleLogExit(v.id)}
              activeOpacity={0.85}
            >
              <MaterialIcons name="logout" size={16} color="#EE7D77" />
              <Text style={styles.exitBtnText}>Log Exit</Text>
            </TouchableOpacity>
          </View>
        ))}

        {visitors.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="check-circle-outline" size={40} color="#25293A" />
            <Text style={styles.emptyText}>No visitors on premises</Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090e18' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  eyebrow: { fontFamily: 'Inter-Medium', fontSize: 10, letterSpacing: 3, color: '#53FEC2', marginBottom: 8 },
  title: { fontFamily: 'Inter-Bold', fontSize: 28, color: '#DEE1F7', marginBottom: 20 },

  /* Form */
  formCard: {
    backgroundColor: 'rgba(20,25,35,0.6)', borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    padding: 20, marginBottom: 24, gap: 16,
  },
  formSection: { fontFamily: 'Inter-Bold', fontSize: 10, letterSpacing: 3, color: '#9BABCE', textTransform: 'uppercase' as const },
  fieldGroup: { gap: 6 },
  fieldLabel: { fontFamily: 'Inter-Medium', fontSize: 12, color: '#9BABCE', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#FAF9F6', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    fontFamily: 'Inter-Regular', fontSize: 14, color: '#1a1a2e',
  },
  confirmBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: '#53FEC2', borderRadius: 14, height: 52, marginTop: 4,
  },
  confirmBtnText: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#090E18', letterSpacing: 1 },

  /* Visitors */
  sectionLabel: { fontFamily: 'Inter-Bold', fontSize: 10, letterSpacing: 3, color: '#9BABCE', textTransform: 'uppercase' as const, marginBottom: 12 },
  visitorCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(20,25,35,0.4)', borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    padding: 14, marginBottom: 8, gap: 12,
  },
  visitorAvatar: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#25293A', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#9BABCE' },
  visitorInfo: { flex: 1, gap: 2 },
  visitorName: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#DEE1F7' },
  visitorMeta: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#6c7a8f' },
  exitBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10,
    backgroundColor: 'rgba(238,125,119,0.12)',
    borderWidth: 1, borderColor: 'rgba(238,125,119,0.25)',
  },
  exitBtnText: { fontFamily: 'Inter-Medium', fontSize: 11, color: '#EE7D77' },
  emptyState: { alignItems: 'center', gap: 8, paddingVertical: 32 },
  emptyText: { fontFamily: 'Inter-Regular', fontSize: 14, color: '#4a5568' },
});
