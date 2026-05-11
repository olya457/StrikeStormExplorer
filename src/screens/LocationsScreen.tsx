import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {images} from '../assets';
import {AppBackground} from '../components/AppBackground';
import {HeaderBar} from '../components/HeaderBar';
import {LocationCard} from '../components/LocationCard';
import {SegmentedControl} from '../components/SegmentedControl';
import {locationCategories, locations} from '../data/content';
import {useSavedLocations} from '../context/SavedLocationsContext';
import {colors, radii} from '../styles/theme';
import {useScreenInsets} from '../styles/useScreenInsets';
import type {MainTabParamList, RootStackParamList} from '../navigation/types';
import type {LocationCategory, LocationItem} from '../types/content';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Locations'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function LocationsScreen() {
  const insets = useScreenInsets();
  const navigation = useNavigation<Nav>();
  const [category, setCategory] = useState<LocationCategory>('Historic rods');
  const [selected, setSelected] = useState<LocationItem | null>(null);
  const {isSaved, toggleSaved} = useSavedLocations();
  const filtered = useMemo(() => locations.filter(item => item.category === category), [category]);
  const active = selected && selected.category === category ? selected : filtered[0];
  const contentStyle = useMemo(
    () => ({
      paddingBottom: insets.bottom,
      paddingHorizontal: insets.horizontal,
      paddingTop: 16,
    }),
    [insets.bottom, insets.horizontal],
  );

  return (
    <AppBackground source={images.backgroundLibrary} overlay={0.58}>
      <HeaderBar eyebrow="Explore places" title="Lightning locations" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentStyle}>
        <SegmentedControl items={locationCategories} value={category} onChange={setCategory} />
        {active ? (
          <View style={styles.detailPanel}>
            <Text numberOfLines={1} style={styles.detailKicker}>
              {active.yearLabel} · {active.year}
            </Text>
            <Text adjustsFontSizeToFit minimumFontScale={0.78} numberOfLines={2} style={styles.detailTitle}>
              {active.title}
            </Text>
            <View style={styles.factList}>
              {active.facts.map(fact => (
                <View key={fact} style={styles.factRow}>
                  <Text style={styles.factIcon}>⚡</Text>
                  <Text style={styles.factText}>{fact}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
        <Text style={styles.count}>{filtered.length} storm cards</Text>
        {filtered.map(item => (
          <LocationCard
            key={item.id}
            item={item}
            saved={isSaved(item.id)}
            onPress={() => {
              setSelected(item);
              navigation.navigate('LocationDetail', {locationId: item.id});
            }}
            onToggleSaved={() => toggleSaved(item.id)}
          />
        ))}
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  count: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 10,
    marginTop: 16,
    textTransform: 'uppercase',
  },
  detailKicker: {
    color: colors.active,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  detailPanel: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginTop: 14,
    padding: 16,
  },
  detailTitle: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 29,
    marginTop: 6,
  },
  factIcon: {
    fontSize: 14,
    marginTop: 2,
  },
  factList: {
    gap: 8,
    marginTop: 12,
  },
  factRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
  },
  factText: {
    color: colors.muted,
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 19,
  },
});
