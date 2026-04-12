import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ResidentHeader from '../../components/ResidentHeader';

interface ContactPerson {
  id: string;
  name: string;
  schedule: string;
  enabled: boolean;
}

const regularGuests: ContactPerson[] = [
  { id: '1', name: 'Priya Sharma', schedule: 'Daily • 9 AM – 6 PM', enabled: true },
  { id: '2', name: 'Ravi Kumar', schedule: 'Mon, Wed, Fri • 10 AM – 2 PM', enabled: true },
  { id: '3', name: 'Anita Desai', schedule: 'Weekends • All Day', enabled: false },
  { id: '4', name: 'Suresh Nair', schedule: 'Tue, Thu • 11 AM – 5 PM', enabled: true },
];

const householdStaff: ContactPerson[] = [
  { id: '5', name: 'Lakshmi Devi', schedule: 'Mon – Sat • 7 AM – 12 PM', enabled: true },
  { id: '6', name: 'Ramesh Yadav', schedule: 'Daily • 6 PM – 9 PM', enabled: true },
  { id: '7', name: 'Sunita Bai', schedule: 'Mon, Wed, Fri • 8 AM – 11 AM', enabled: false },
  { id: '8', name: 'Gopal Singh', schedule: 'Weekdays • 9 AM – 5 PM', enabled: true },
  { id: '9', name: 'Kamla Devi', schedule: 'Sat, Sun • 10 AM – 2 PM', enabled: true },
];

export default function ResidentVisitors() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'guests' | 'staff'>('guests');
  const [guestToggles, setGuestToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(regularGuests.map((g) => [g.id, g.enabled]))
  );
  const [staffToggles, setStaffToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(householdStaff.map((s) => [s.id, s.enabled]))
  );
  const fabScale = useRef(new Animated.Value(1)).current;

  const contacts = activeTab === 'guests' ? regularGuests : householdStaff;
  const toggles = activeTab === 'guests' ? guestToggles : staffToggles;
  const setToggles = activeTab === 'guests' ? setGuestToggles : setStaffToggles;

  const handleFabPressIn = () => {
    Animated.spring(fabScale, { toValue: 0.9, useNativeDriver: true, tension: 300, friction: 20 }).start();
  };

  const handleFabPressOut = () => {
    Animated.spring(fabScale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 20 }).start();
  };

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
        {/* Hero heading */}
        <Text style={styles.eyebrow}>ACCESS CONTROL</Text>
        <Text style={styles.heroTitle}>Access{'\n'}Management</Text>

        {/* Pill Tabs */}
        <View style={styles.pillRow}>
          <TouchableOpacity
            style={[styles.pill, activeTab === 'guests' && styles.pillActive]}
            onPress={() => setActiveTab('guests')}
          >
            <Text style={[styles.pillText, activeTab === 'guests' && styles.pillTextActive]}>
              Regular Guests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pill, activeTab === 'staff' && styles.pillActive]}
            onPress={() => setActiveTab('staff')}
          >
            <Text style={[styles.pillText, activeTab === 'staff' && styles.pillTextActive]}>
              Household Staff
            </Text>
          </TouchableOpacity>
        </View>

        {/* Person Cards */}
        {contacts.map((person) => (
          <View key={person.id} style={styles.personCard}>
            <View style={styles.personLeft}>
              <View style={styles.personAvatar}>
                <Text style={styles.avatarInitials}>
                  {person.name.split(' ').map((n) => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.personInfo}>
                <Text style={styles.personName}>{person.name}</Text>
                <Text style={styles.personSchedule}>{person.schedule}</Text>
              </View>
            </View>
            <Switch
              value={toggles[person.id]}
              onValueChange={(val) => setToggles((prev) => ({ ...prev, [person.id]: val }))}
              trackColor={{ false: 'rgba(255,255,255,0.08)', true: 'rgba(37,224,167,0.3)' }}
              thumbColor={toggles[person.id] ? '#25E0A7' : '#6c7a8f'}
              ios_backgroundColor="rgba(255,255,255,0.08)"
            />
          </View>
        ))}

        {/* Bottom spacer for tab bar + FAB */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FAB */}
      <Animated.View style={[styles.fabContainer, { transform: [{ scale: fabScale }] }]}>
        <TouchableOpacity
          style={styles.fab}
          onPressIn={handleFabPressIn}
          onPressOut={handleFabPressOut}
          onPress={() => router.push('/(resident)/create-pass')}
          activeOpacity={1}
        >
          <MaterialIcons name="add" size={30} color="#090E18" />
        </TouchableOpacity>
      </Animated.View>
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

  /* ── Hero ── */
  eyebrow: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    letterSpacing: 3,
    color: '#53FEC2',
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    lineHeight: 42,
    color: '#DEE1F7',
    marginBottom: 24,
  },

  /* ── Pill Tabs ── */
  pillRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  pillActive: {
    backgroundColor: '#34495E',
    borderColor: 'rgba(255,255,255,0.05)',
  },
  pillText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#9BABCE',
  },
  pillTextActive: {
    color: '#DBE5FF',
  },

  /* ── Person Card ── */
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(20,25,35,0.5)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 16,
    marginBottom: 10,
  },
  personLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  personAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#25293A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  avatarInitials: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#9BABCE',
  },
  personInfo: {
    flex: 1,
    gap: 3,
  },
  personName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#DEE1F7',
  },
  personSchedule: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9BABCE',
  },

  /* ── FAB ── */
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 70,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#25E0A7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#25E0A7',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 12,
  },
});
