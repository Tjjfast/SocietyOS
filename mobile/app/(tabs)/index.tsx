import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from '../../components/GlassCard';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#0A0F1E', '#0D1B2A']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.name}>Shivam</Text>
        </View>

        <GlassCard style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Active Passes</Text>
          <Text style={styles.cardInfo}>3 Passes active today</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <LinearGradient colors={['#4F8EF7', '#8B5CF6']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>+ Create Pass</Text>
            </LinearGradient>
          </TouchableOpacity>
        </GlassCard>

        <Text style={styles.sectionTitle}>Recent Visitors</Text>
        <GlassCard style={styles.visitorCard}>
          <View style={styles.visitorRow}>
            <View>
              <Text style={styles.visitorName}>Zomato Delivery</Text>
              <Text style={styles.visitorType}>Delivery</Text>
            </View>
            <View style={[styles.statusPill, { backgroundColor: '#10D9A020' }]}>
              <Text style={[styles.statusText, { color: '#10D9A0' }]}>APPROVED</Text>
            </View>
          </View>
        </GlassCard>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    color: '#8A9BB0',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  name: {
    color: '#F0F4FF',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  summaryCard: {
    marginBottom: 30,
  },
  cardTitle: {
    color: '#F0F4FF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardInfo: {
    color: '#8A9BB0',
    fontSize: 14,
    marginBottom: 20,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#F0F4FF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  visitorCard: {
    marginBottom: 12,
  },
  visitorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visitorName: {
    color: '#F0F4FF',
    fontSize: 16,
    fontWeight: '500',
  },
  visitorType: {
    color: '#8A9BB0',
    fontSize: 14,
    marginTop: 4,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
