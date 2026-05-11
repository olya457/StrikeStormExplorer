import React from 'react';
import {ScrollView, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radii} from '../styles/theme';

type Props<T extends string> = {
  items: readonly T[];
  onChange: (item: T) => void;
  value: T;
};

export function SegmentedControl<T extends string>({items, onChange, value}: Props<T>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      <View style={styles.wrap}>
        {items.map(item => {
          const active = item === value;

          return (
            <Pressable
              accessibilityRole="button"
              key={item}
              onPress={() => onChange(item)}
              style={[styles.item, active && styles.itemActive]}>
              <Text numberOfLines={1} style={[styles.text, active && styles.textActive]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    borderRadius: radii.sm,
    justifyContent: 'center',
    minHeight: 38,
    minWidth: 104,
    paddingHorizontal: 12,
  },
  itemActive: {
    backgroundColor: colors.activeSoft,
  },
  scroll: {
    paddingRight: 18,
  },
  text: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
  },
  textActive: {
    color: colors.ink,
  },
  wrap: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 4,
  },
});
