import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type PillVariant = 'success' | 'warning' | 'danger' | 'neutral' | 'info';

interface StatusPillProps {
  label: string;
  variant?: PillVariant;
  icon?: keyof typeof MaterialIcons.glyphMap;
  /** Show a pulsing dot instead of icon */
  dot?: boolean;
  style?: ViewStyle;
}

const VARIANTS: Record<PillVariant, { bg: string; border: string; text: string }> = {
  success: {
    bg: 'rgba(37,224,167,0.1)',
    border: 'rgba(37,224,167,0.3)',
    text: '#25E0A7',
  },
  warning: {
    bg: 'rgba(250,204,21,0.1)',
    border: 'rgba(250,204,21,0.3)',
    text: '#FACC15',
  },
  danger: {
    bg: 'rgba(238,125,119,0.15)',
    border: 'rgba(238,125,119,0.3)',
    text: '#EE7D77',
  },
  neutral: {
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.1)',
    text: '#9BABCE',
  },
  info: {
    bg: 'rgba(219,229,255,0.1)',
    border: 'rgba(219,229,255,0.2)',
    text: '#DBE5FF',
  },
};

export default function StatusPill({
  label,
  variant = 'neutral',
  icon,
  dot,
  style,
}: StatusPillProps) {
  const v = VARIANTS[variant];

  return (
    <View
      style={[
        styles.pill,
        { backgroundColor: v.bg, borderColor: v.border },
        style,
      ]}
    >
      {dot && <View style={[styles.dot, { backgroundColor: v.text }]} />}
      {icon && !dot && (
        <MaterialIcons name={icon} size={12} color={v.text} />
      )}
      <Text style={[styles.label, { color: v.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontFamily: 'Inter-Bold',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
