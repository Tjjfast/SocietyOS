import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SettingsRowProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  subtitle?: string;
  value?: string;
  onPress?: () => void;
  /** Show a danger-colored text instead of default */
  danger?: boolean;
  /** Hide the chevron arrow */
  hideChevron?: boolean;
  style?: ViewStyle;
}

export default function SettingsRow({
  icon,
  label,
  subtitle,
  value,
  onPress,
  danger,
  hideChevron,
  style,
}: SettingsRowProps) {
  return (
    <TouchableOpacity
      style={[styles.row, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconWrap, danger && styles.iconWrapDanger]}>
        <MaterialIcons
          name={icon}
          size={20}
          color={danger ? '#EE7D77' : '#9BABCE'}
        />
      </View>
      <View style={styles.info}>
        <Text style={[styles.label, danger && styles.labelDanger]}>{label}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {value && <Text style={styles.value}>{value}</Text>}
      {!hideChevron && (
        <MaterialIcons name="chevron-right" size={20} color="#4a5568" />
      )}
    </TouchableOpacity>
  );
}

export function SettingsGroup({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.group, style]}>{children}</View>;
}

export function SettingsDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapDanger: {
    backgroundColor: 'rgba(238,125,119,0.1)',
  },
  info: {
    flex: 1,
    gap: 1,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#DEE1F7',
  },
  labelDanger: {
    color: '#EE7D77',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#6c7a8f',
  },
  value: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6c7a8f',
    marginRight: 4,
  },
  group: {
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginLeft: 68,
  },
});
