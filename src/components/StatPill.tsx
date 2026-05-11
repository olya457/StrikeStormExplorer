import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radii} from '../styles/theme';

type Props = {
  label: string;
  value: string;
};

export function StatPill({label, value}: Props) {
  return (
    <View style={styles.wrap}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.value}>
        {value}
      </Text>
      <Text numberOfLines={1} style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    marginTop: 2,
  },
  value: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
  },
  wrap: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    flex: 1,
    minHeight: 58,
    minWidth: 86,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
});
