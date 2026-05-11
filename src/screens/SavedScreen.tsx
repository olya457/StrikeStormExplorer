import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {images} from '../assets';
import {AppBackground} from '../components/AppBackground';
import {HeaderBar} from '../components/HeaderBar';
import {LocationCard} from '../components/LocationCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {locations} from '../data/content';
import {useSavedLocations} from '../context/SavedLocationsContext';
import {colors, radii} from '../styles/theme';
import {useScreenInsets} from '../styles/useScreenInsets';
import type {MainTabParamList, RootStackParamList} from '../navigation/types';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Saved'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function SavedScreen() {
  const insets = useScreenInsets();
  const navigation = useNavigation<Nav>();
  const {hydrated, removeSaved, savedIds, toggleSaved} = useSavedLocations();
  const savedLocations = useMemo(() => locations.filter(item => savedIds.includes(item.id)), [savedIds]);
  const contentStyle = useMemo(
    () => ({
      paddingBottom: insets.bottom,
      paddingHorizontal: insets.horizontal,
      paddingTop: 16,
    }),
    [insets.bottom, insets.horizontal],
  );

  return (
    <AppBackground source={images.backgroundHome} overlay={0.62}>
      <HeaderBar eyebrow="Persistent storage" title="Saved strikes" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentStyle}>
        <View style={styles.summary}>
          <Text style={styles.summaryIcon}>💾</Text>
          <View style={styles.summaryCopy}>
            <Text style={styles.summaryTitle}>{savedLocations.length} saved</Text>
            <Text style={styles.summaryText}>
              Favorites stay after app reload and repeat login until you remove them here.
            </Text>
          </View>
        </View>
        {!hydrated ? (
          <Text style={styles.loading}>Loading saved places...</Text>
        ) : savedLocations.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>⚡</Text>
            <Text style={styles.emptyTitle}>No saved locations yet</Text>
            <Text style={styles.emptyText}>Open locations or the map and tap the save icon on any storm place.</Text>
            <PrimaryButton icon="🗼" label="Browse locations" onPress={() => navigation.navigate('Locations')} />
          </View>
        ) : (
          savedLocations.map(item => (
            <View key={item.id} style={styles.savedItem}>
              <LocationCard
                item={item}
                saved
                onToggleSaved={() => toggleSaved(item.id)}
                onPress={() => navigation.navigate('LocationDetail', {locationId: item.id})}
              />
              <PrimaryButton icon="🗑️" label="Remove" onPress={() => removeSaved(item.id)} tone="danger" />
            </View>
          ))
        )}
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginTop: 16,
    padding: 20,
  },
  emptyIcon: {
    fontSize: 42,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
    marginBottom: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 10,
    textAlign: 'center',
  },
  loading: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
    marginTop: 18,
  },
  savedItem: {
    marginTop: 14,
  },
  summary: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  summaryCopy: {
    flex: 1,
  },
  summaryIcon: {
    fontSize: 28,
  },
  summaryText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 19,
    marginTop: 4,
  },
  summaryTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
  },
});
