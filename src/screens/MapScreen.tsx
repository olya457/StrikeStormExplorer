import React, {useMemo, useRef, useState} from 'react';
import {Platform, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {images} from '../assets';
import {AppBackground} from '../components/AppBackground';
import {HeaderBar} from '../components/HeaderBar';
import {PrimaryButton} from '../components/PrimaryButton';
import {StatPill} from '../components/StatPill';
import {locations} from '../data/content';
import {useSavedLocations} from '../context/SavedLocationsContext';
import {colors, radii} from '../styles/theme';
import {useScreenInsets} from '../styles/useScreenInsets';
import type {RootStackParamList} from '../navigation/types';
import type {LocationItem} from '../types/content';

const initialRegion = {
  latitude: 18,
  latitudeDelta: 98,
  longitude: 12,
  longitudeDelta: 150,
};

export function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const insets = useScreenInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {isSaved, toggleSaved} = useSavedLocations();
  const [selectedId, setSelectedId] = useState('lake-maracaibo');
  const [sheetVisible, setSheetVisible] = useState(true);
  const selected = useMemo(
    () => locations.find(item => item.id === selectedId) ?? locations[0],
    [selectedId],
  );
  const mapWrapStyle = useMemo(
    () => ({
      marginHorizontal: insets.horizontal,
    }),
    [insets.horizontal],
  );
  const sheetStyle = useMemo(
    () => ({
      left: insets.horizontal,
      right: insets.horizontal,
      top: Math.max(insets.top + 112, Math.round((insets.height - (insets.small ? 236 : 256)) / 2)),
    }),
    [insets.height, insets.horizontal, insets.small, insets.top],
  );

  function focusLocation(item: LocationItem) {
    setSelectedId(item.id);
    setSheetVisible(true);
    mapRef.current?.animateToRegion(
      {
        latitude: item.coordinate.latitude,
        latitudeDelta: 8,
        longitude: item.coordinate.longitude,
        longitudeDelta: 8,
      },
      650,
    );
  }

  return (
    <AppBackground source={images.backgroundMap} overlay={0.22}>
      <HeaderBar eyebrow="Global map" title="Storm strike atlas" />
      <View style={[styles.mapWrap, mapWrapStyle]}>
        <MapView
          ref={mapRef}
          initialRegion={initialRegion}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          style={styles.map}
          toolbarEnabled={false}>
          {locations.map(item => (
            <Marker
              coordinate={item.coordinate}
              key={item.id}
              onPress={() => focusLocation(item)}
              title={item.title}>
              <View style={[styles.marker, selectedId === item.id && styles.markerActive]}>
                <Text style={styles.markerText}>{item.category === 'Storm zones' ? '⛈️' : '⚡'}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
      {sheetVisible ? (
        <View style={[styles.sheet, sheetStyle]}>
          <View style={styles.sheetTop}>
            <View style={styles.sheetCopy}>
              <Text numberOfLines={1} style={styles.city}>
                {selected.city}
              </Text>
              <Text adjustsFontSizeToFit minimumFontScale={0.78} numberOfLines={2} style={styles.title}>
                {selected.title}
              </Text>
            </View>
            <View style={styles.sheetButtons}>
              <Pressable
                accessibilityRole="button"
                onPress={() => toggleSaved(selected.id)}
                style={[styles.save, isSaved(selected.id) && styles.saveActive]}>
                <Text style={styles.saveIcon}>{isSaved(selected.id) ? '💾' : '🤍'}</Text>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={() => setSheetVisible(false)} style={styles.close}>
                <Text style={styles.closeIcon}>×</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.stats}>
            <StatPill label="Rating" value={`★ ${selected.rating.toFixed(1)}`} />
            <StatPill label="Height" value={selected.height} />
            <StatPill label="Strikes" value={selected.strikes} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
            {locations.map(item => (
              <Pressable
                accessibilityRole="button"
                key={item.id}
                onPress={() => focusLocation(item)}
                style={[styles.railItem, selectedId === item.id && styles.railItemActive]}>
                <Text numberOfLines={1} style={[styles.railText, selectedId === item.id && styles.railTextActive]}>
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <PrimaryButton
            icon="📖"
            label="Details"
            onPress={() => navigation.navigate('LocationDetail', {locationId: selected.id})}
          />
        </View>
      ) : null}
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  city: {
    color: colors.active,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  close: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  closeIcon: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: '800',
    includeFontPadding: false,
    lineHeight: 30,
  },
  map: {
    flex: 1,
  },
  mapWrap: {
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flex: 1,
    marginBottom: 12,
    marginTop: 14,
    overflow: 'hidden',
  },
  marker: {
    alignItems: 'center',
    backgroundColor: colors.panelStrong,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  markerActive: {
    backgroundColor: colors.active,
    borderColor: colors.ink,
  },
  markerText: {
    fontSize: 18,
  },
  rail: {
    gap: 8,
    paddingVertical: 12,
  },
  railItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    maxWidth: 170,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  railItemActive: {
    backgroundColor: colors.activeSoft,
    borderColor: colors.active,
  },
  railText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
  },
  railTextActive: {
    color: colors.ink,
  },
  save: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  saveActive: {
    backgroundColor: colors.activeSoft,
    borderColor: colors.active,
  },
  saveIcon: {
    fontSize: 18,
  },
  sheet: {
    backgroundColor: colors.panelStrong,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: 14,
    position: 'absolute',
  },
  sheetCopy: {
    flex: 1,
    paddingRight: 10,
  },
  sheetButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sheetTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
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
    marginTop: 4,
  },
});
