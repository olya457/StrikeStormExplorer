import React from 'react';
import {GestureResponderEvent, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import type {LocationItem} from '../types/content';
import {colors, radii} from '../styles/theme';
import {StatPill} from './StatPill';

type Props = {
  item: LocationItem;
  onPress?: () => void;
  onToggleSaved: () => void;
  saved: boolean;
};

export function LocationCard({item, onPress, onToggleSaved, saved}: Props) {
  function handleSave(event: GestureResponderEvent) {
    event.stopPropagation();
    onToggleSaved();
  }

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      <Image source={item.image} resizeMode="cover" style={styles.image} />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <View style={styles.titleWrap}>
            <Text adjustsFontSizeToFit minimumFontScale={0.78} numberOfLines={2} style={styles.title}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={styles.city}>
              {item.city}
            </Text>
          </View>
          <Pressable accessibilityRole="button" onPress={handleSave} hitSlop={10} style={[styles.save, saved && styles.saveActive]}>
            <Text style={styles.saveIcon}>{saved ? '💾' : '🤍'}</Text>
          </Pressable>
        </View>
        <Text numberOfLines={3} style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.stats}>
          <StatPill label="Rating" value={`★ ${item.rating.toFixed(1)}`} />
          <StatPill label="Height" value={item.height} />
          <StatPill label="Strikes" value={item.strikes} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 14,
  },
  card: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
  },
  city: {
    color: colors.active,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginTop: 4,
  },
  description: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 19,
    marginTop: 10,
  },
  image: {
    aspectRatio: 393 / 220,
    width: '100%',
  },
  pressed: {
    opacity: 0.88,
  },
  save: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  saveActive: {
    backgroundColor: colors.activeSoft,
    borderColor: colors.active,
  },
  saveIcon: {
    fontSize: 17,
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  title: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 24,
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
  },
  titleWrap: {
    flex: 1,
  },
});
