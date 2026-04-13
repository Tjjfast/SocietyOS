import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { triggerHaptic } from '../../utils/haptics';

type AccessType = 'delivery' | 'cab' | 'guest' | 'service';

interface AccessTile {
  id: AccessType;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const accessTypes: AccessTile[] = [
  { id: 'delivery', label: 'Delivery', icon: 'local-shipping' },
  { id: 'cab', label: 'Cab', icon: 'directions-car' },
  { id: 'guest', label: 'Guest', icon: 'family-restroom' },
  { id: 'service', label: 'Service', icon: 'construction' },
];

export default function ResidentCreatePass() {
  const router = useRouter();
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [unit, setUnit] = useState('A-402');
  const [selectedType, setSelectedType] = useState<AccessType>('delivery');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [multiEntry, setMultiEntry] = useState(false);
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(buttonScale, { toValue: 0.97, useNativeDriver: true, tension: 300, friction: 20 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 20 }).start();
  };

  const handleGenerate = () => {
    triggerHaptic('success');
    Alert.alert('Pass Generated', 'QR code has been created successfully.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#090e18', '#0e1322', '#090e18']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={20} color="#6c7a8f" />
          <Text style={styles.backText}>Back to Visitors</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.eyebrow}>NEW PASS</Text>
        <Text style={styles.title}>Create Visitor Pass</Text>

        {/* ── Guest Details Form ── */}
        <View style={styles.formCard}>
          <Text style={styles.formSection}>GUEST DETAILS</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Guest Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter guest name"
              placeholderTextColor="rgba(26,26,46,0.4)"
              value={guestName}
              onChangeText={setGuestName}
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
              placeholder="A-402"
              placeholderTextColor="rgba(26,26,46,0.4)"
              value={unit}
              onChangeText={setUnit}
            />
          </View>
        </View>

        {/* ── Access Type Selector ── */}
        <View style={styles.formCard}>
          <Text style={styles.formSection}>ACCESS TYPE</Text>

          <View style={styles.typeGrid}>
            {accessTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeTile,
                  selectedType === type.id && styles.typeTileSelected,
                ]}
                onPress={() => setSelectedType(type.id)}
                activeOpacity={0.85}
              >
                <MaterialIcons
                  name={type.icon}
                  size={24}
                  color={selectedType === type.id ? '#DBE5FF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.typeTileLabel,
                    selectedType === type.id && styles.typeTileLabelSelected,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Schedule ── */}
        <View style={styles.formCard}>
          <Text style={styles.formSection}>SCHEDULE</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Visit Date</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Select date"
                placeholderTextColor="rgba(26,26,46,0.4)"
                value={visitDate}
                onChangeText={setVisitDate}
              />
              <MaterialIcons name="calendar-today" size={18} color="#6c7a8f" style={styles.inputIcon} />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Visit Time</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Select time"
                placeholderTextColor="rgba(26,26,46,0.4)"
                value={visitTime}
                onChangeText={setVisitTime}
              />
              <MaterialIcons name="access-time" size={18} color="#6c7a8f" style={styles.inputIcon} />
            </View>
          </View>

          {/* Multi-entry toggle */}
          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleLabel}>Allow Multiple Entries</Text>
              <Text style={styles.toggleSub}>Visitor can re-enter during the pass period</Text>
            </View>
            <Switch
              value={multiEntry}
              onValueChange={setMultiEntry}
              trackColor={{ false: 'rgba(255,255,255,0.08)', true: 'rgba(37,224,167,0.3)' }}
              thumbColor={multiEntry ? '#25E0A7' : '#6c7a8f'}
              ios_backgroundColor="rgba(255,255,255,0.08)"
            />
          </View>
        </View>

        {/* ── Generate QR CTA ── */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleGenerate}
            activeOpacity={1}
          >
            <LinearGradient
              colors={['#1e3a5f', '#152641']}
              style={styles.ctaButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <MaterialIcons name="qr-code" size={20} color="#DBE5FF" />
              <Text style={styles.ctaText}>GENERATE QR PASS</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom spacer */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090e18',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
  },

  /* ── Back ── */
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  backText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6c7a8f',
  },

  /* ── Title ── */
  eyebrow: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    letterSpacing: 3,
    color: '#53FEC2',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#DEE1F7',
    marginBottom: 24,
  },

  /* ── Form Card ── */
  formCard: {
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    marginBottom: 16,
    gap: 16,
  },
  formSection: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 3,
    color: '#9BABCE',
    textTransform: 'uppercase',
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#9BABCE',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#FAF9F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1a1a2e',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    borderRadius: 12,
    paddingRight: 14,
  },
  inputIcon: {
    marginLeft: 8,
  },

  /* ── Type Grid ── */
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeTile: {
    width: '47%' as any,
    backgroundColor: '#FAF9F6',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  typeTileSelected: {
    backgroundColor: '#34495E',
    borderColor: 'rgba(100,116,139,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  typeTileLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#64748B',
  },
  typeTileLabelSelected: {
    color: '#DBE5FF',
  },

  /* ── Toggle ── */
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  toggleLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#DEE1F7',
  },
  toggleSub: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#6c7a8f',
    marginTop: 2,
  },

  /* ── CTA Button ── */
  ctaButton: {
    borderRadius: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(219,229,255,0.15)',
  },
  ctaText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    letterSpacing: 2,
    color: '#DBE5FF',
  },
});
