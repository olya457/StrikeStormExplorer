import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {colors, radii} from '../styles/theme';

type Props = {
  icon?: string;
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  tone?: 'primary' | 'ghost' | 'danger';
};

export function PrimaryButton({icon, label, onPress, style, tone = 'primary'}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        tone === 'ghost' && styles.ghost,
        tone === 'danger' && styles.danger,
        pressed && styles.pressed,
        style,
      ]}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.label, tone === 'ghost' && styles.ghostLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.active,
    borderRadius: radii.md,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 18,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  ghost: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: colors.border,
    borderWidth: 1,
  },
  ghostLabel: {
    color: colors.ink,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    color: colors.dark,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
  },
  pressed: {
    opacity: 0.78,
    transform: [{scale: 0.99}],
  },
});
