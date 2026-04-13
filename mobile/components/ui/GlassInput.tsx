import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface GlassInputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  /** 'cream' = light bg (forms), 'dark' = transparent bg (search) */
  variant?: 'cream' | 'dark';
}

export default function GlassInput({
  label,
  icon,
  variant = 'cream',
  style,
  ...rest
}: GlassInputProps) {
  const isDark = variant === 'dark';

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, isDark ? styles.inputDark : styles.inputCream]}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={18}
            color={isDark ? '#6c7a8f' : '#9aab9e'}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            isDark ? styles.inputTextDark : styles.inputTextCream,
            style,
          ]}
          placeholderTextColor={isDark ? '#4a5568' : 'rgba(26,26,46,0.4)'}
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#9BABCE',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },
  inputCream: {
    backgroundColor: '#FAF9F6',
  },
  inputDark: {
    backgroundColor: 'rgba(20,25,35,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  inputTextCream: {
    color: '#1a1a2e',
  },
  inputTextDark: {
    color: '#DEE1F7',
  },
});
