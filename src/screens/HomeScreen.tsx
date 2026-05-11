import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {images} from '../assets';
import {AppBackground} from '../components/AppBackground';
import {HeaderBar} from '../components/HeaderBar';
import {PrimaryButton} from '../components/PrimaryButton';
import {StatPill} from '../components/StatPill';
import {factSections, locations} from '../data/content';
import {useSavedLocations} from '../context/SavedLocationsContext';
import {colors, radii} from '../styles/theme';
import {useScreenInsets} from '../styles/useScreenInsets';
import type {MainTabParamList} from '../navigation/types';

type Nav = BottomTabNavigationProp<MainTabParamList>;

export function HomeScreen() {
  const insets = useScreenInsets();
  const navigation = useNavigation<Nav>();
  const {savedIds} = useSavedLocations();
  const dailyFact = useMemo(() => factSections[0].facts[new Date().getDate() % factSections[0].facts.length], []);
  const topLocation = locations.find(item => item.id === 'lake-maracaibo') ?? locations[0];
  const contentStyle = useMemo(
    () => ({
      paddingBottom: insets.bottom,
      paddingHorizontal: insets.horizontal,
      paddingTop: 18,
    }),
    [insets.bottom, insets.horizontal],
  );

  return (
    <AppBackground source={images.backgroundHome} overlay={0.5}>
      <HeaderBar
        eyebrow="Strike Storm Explorer"
        title="Lightning field guide"
        right={
          <View style={styles.savedBadge}>
            <Text style={styles.savedIcon}>💾</Text>
            <Text style={styles.savedCount}>{savedIds.length}</Text>
          </View>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentStyle}>
        <View style={styles.heroPanel}>
          <Text style={styles.heroIcon}>⚡</Text>
          <Text adjustsFontSizeToFit minimumFontScale={0.78} numberOfLines={2} style={styles.heroTitle}>
            Track towers, storms and thunder science
          </Text>
          <Text style={styles.heroCopy}>
            Explore mapped strike zones, save favorite places, read storm stories and answer lightning questions.
          </Text>
          <View style={styles.heroActions}>
            <PrimaryButton icon="🗺️" label="Open map" onPress={() => navigation.navigate('Map')} style={styles.heroButton} />
            <PrimaryButton icon="📚" label="Quiz" onPress={() => navigation.navigate('Learn')} style={styles.heroButton} tone="ghost" />
          </View>
        </View>

        <View style={styles.stats}>
          <StatPill label="Locations" value={`${locations.length}`} />
          <StatPill label="Quiz" value="30" />
          <StatPill label="Facts" value="40" />
        </View>

        <Text style={styles.sectionTitle}>Daily spark</Text>
        <View style={styles.infoPanel}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoText}>{dailyFact}</Text>
        </View>

        <Text style={styles.sectionTitle}>Featured storm route</Text>
        <View style={styles.routePanel}>
          <View style={styles.routeCopy}>
            <Text numberOfLines={1} style={styles.routeKicker}>
              {topLocation.city}
            </Text>
            <Text adjustsFontSizeToFit minimumFontScale={0.76} numberOfLines={2} style={styles.routeTitle}>
              {topLocation.title}
            </Text>
            <Text numberOfLines={3} style={styles.routeDescription}>
              {topLocation.description}
            </Text>
          </View>
          <PrimaryButton icon="🗼" label="View" onPress={() => navigation.navigate('Locations')} />
        </View>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  heroActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  heroButton: {
    flex: 1,
  },
  heroCopy: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 21,
    marginTop: 10,
  },
  heroIcon: {
    fontSize: 38,
  },
  heroPanel: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    padding: 18,
  },
  heroTitle: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 31,
    marginTop: 10,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoPanel: {
    alignItems: 'flex-start',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  infoText: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 21,
  },
  routeCopy: {
    flex: 1,
    paddingRight: 12,
  },
  routeDescription: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 19,
    marginTop: 8,
  },
  routeKicker: {
    color: colors.active,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  routePanel: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 16,
  },
  routeTitle: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 25,
    marginTop: 4,
  },
  savedBadge: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    minHeight: 42,
    paddingHorizontal: 12,
  },
  savedCount: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
  },
  savedIcon: {
    fontSize: 17,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 10,
    marginTop: 22,
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
});
