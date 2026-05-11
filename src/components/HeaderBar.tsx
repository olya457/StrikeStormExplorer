import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/theme';
import {useScreenInsets} from '../styles/useScreenInsets';

type Props = {
  eyebrow: string;
  right?: React.ReactNode;
  title: string;
};

export function HeaderBar({eyebrow, right, title}: Props) {
  const insets = useScreenInsets();

  return (
    <View style={[styles.wrap, {paddingHorizontal: insets.horizontal, paddingTop: insets.top}]}>
      <View style={styles.copy}>
        <Text style={styles.eyebrow} numberOfLines={1}>
          {eyebrow}
        </Text>
        <Text adjustsFontSizeToFit minimumFontScale={0.78} numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  copy: {
    flex: 1,
    paddingRight: 12,
  },
  eyebrow: {
    color: colors.active,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 34,
    marginTop: 4,
  },
  wrap: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
