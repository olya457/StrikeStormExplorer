import React, {useMemo} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {images} from '../assets';
import {AppBackground} from '../components/AppBackground';
import {PrimaryButton} from '../components/PrimaryButton';
import {StatPill} from '../components/StatPill';
import {useSavedLocations} from '../context/SavedLocationsContext';
import {locations} from '../data/content';
import type {RootStackParamList} from '../navigation/types';
import {colors, radii} from '../styles/theme';
import {useScreenInsets} from '../styles/useScreenInsets';

type Props = NativeStackScreenProps<RootStackParamList, 'LocationDetail'>;

export function LocationDetailScreen({navigation, route}: Props) {
  const insets = useScreenInsets();
  const {isSaved, toggleSaved} = useSavedLocations();
  const location = useMemo(
    () => locations.find(item => item.id === route.params.locationId) ?? locations[0],
    [route.params.locationId],
  );
  const saved = isSaved(location.id);
  const contentStyle = useMemo(
    () => ({
      paddingBottom: insets.edgeBottom + 24,
      paddingHorizontal: insets.horizontal,
      paddingTop: insets.top,
    }),
    [insets.edgeBottom, insets.horizontal, insets.top],
  );

  return (
    <AppBackground source={images.backgroundLibrary} overlay={0.58}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={contentStyle}>
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.roundButton}>
            <Text style={styles.roundIcon}>‹</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => toggleSaved(location.id)}
            style={[styles.roundButton, saved && styles.saveActive]}>
            <Text style={styles.saveIcon}>{saved ? '💾' : '🤍'}</Text>
          </Pressable>
        </View>

        <Image source={location.image} resizeMode="cover" style={styles.image} />

        <View style={styles.panel}>
          <Text numberOfLines={1} style={styles.category}>
            {location.category}
          </Text>
          <Text adjustsFontSizeToFit minimumFontScale={0.76} numberOfLines={3} style={styles.title}>
            {location.title}
          </Text>
          <Text numberOfLines={1} style={styles.city}>
            {location.city}
          </Text>

          <View style={styles.stats}>
            <StatPill label="Rating" value={`★ ${location.rating.toFixed(1)}`} />
            <StatPill label="Height" value={location.height} />
            <StatPill label="Strikes" value={location.strikes} />
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>{location.yearLabel}</Text>
            <Text style={styles.metaValue}>{location.year}</Text>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{location.description}</Text>

          <Text style={styles.sectionTitle}>Facts</Text>
          <View style={styles.factList}>
            {location.facts.map(fact => (
              <View key={fact} style={styles.factRow}>
                <Text style={styles.factIcon}>⚡</Text>
                <Text style={styles.factText}>{fact}</Text>
              </View>
            ))}
          </View>

          <View style={styles.coordinates}>
            <Text style={styles.coordinateText}>
              {location.coordinate.latitude.toFixed(4)}, {location.coordinate.longitude.toFixed(4)}
            </Text>
          </View>

          <PrimaryButton
            icon={saved ? '💾' : '🤍'}
            label={saved ? 'Saved' : 'Save location'}
            onPress={() => toggleSaved(location.id)}
            tone={saved ? 'ghost' : 'primary'}
          />
        </View>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  category: {
    color: colors.active,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  city: {
    color: colors.amber,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 8,
  },
  coordinateText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    textAlign: 'center',
  },
  coordinates: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    marginBottom: 16,
    marginTop: 18,
    padding: 12,
  },
  description: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 23,
  },
  factIcon: {
    fontSize: 14,
    marginTop: 2,
  },
  factList: {
    gap: 10,
  },
  factRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 9,
  },
  factText: {
    color: colors.muted,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
  },
  image: {
    aspectRatio: 393 / 220,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginTop: 16,
    width: '100%',
  },
  metaLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  metaRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    gap: 4,
    marginTop: 12,
    padding: 12,
  },
  metaValue: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
  },
  panel: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginTop: 14,
    padding: 16,
  },
  roundButton: {
    alignItems: 'center',
    backgroundColor: colors.panelStrong,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  roundIcon: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: '700',
    includeFontPadding: false,
    lineHeight: 36,
  },
  saveActive: {
    backgroundColor: colors.activeSoft,
    borderColor: colors.active,
  },
  saveIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 10,
    marginTop: 20,
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  title: {
    color: colors.ink,
    fontSize: 31,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 36,
    marginTop: 7,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
