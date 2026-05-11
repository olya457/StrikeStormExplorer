import React, {useMemo, useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {images} from '../assets';
import {PrimaryButton} from '../components/PrimaryButton';
import {colors, radii} from '../styles/theme';
import {useScreenInsets} from '../styles/useScreenInsets';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const slides = [
  {
    image: images.backgroundOnboardingOne,
    eyebrow: 'Explore',
    title: 'Follow the brightest storm routes',
    body: 'Open legendary towers, storm zones and lightning hotspots with saved places that stay after restart.',
  },
  {
    image: images.backgroundOnboardingTwo,
    eyebrow: 'Learn',
    title: 'Quiz yourself through thunder science',
    body: 'Facts, travel stories, engineering notes and a full lightning quiz are ready inside one clean library.',
  },
  {
    image: images.backgroundMap,
    eyebrow: 'Save',
    title: 'Keep favorite strikes until you remove them',
    body: 'Saved locations persist after reload and the saved tab lets you delete only what you choose.',
  },
];

export function OnboardingScreen({navigation}: Props) {
  const insets = useScreenInsets();
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  const dots = useMemo(
    () =>
      slides.map((_, dotIndex) => (
        <View key={dotIndex} style={[styles.dot, dotIndex === index && styles.dotActive]} />
      )),
    [index],
  );

  return (
    <ImageBackground source={slide.image} resizeMode="cover" style={styles.background}>
      <View style={styles.scrim} />
      <View style={[styles.screen, {paddingBottom: insets.edgeBottom, paddingHorizontal: insets.horizontal, paddingTop: insets.top}]}>
        <Pressable accessibilityRole="button" onPress={() => navigation.replace('Main')} style={[styles.skip, insets.small && styles.skipSmall]}>
          <Text style={[styles.skipText, insets.small && styles.skipTextSmall]}>Skip</Text>
        </Pressable>
        <View style={[styles.hero, insets.small && styles.heroSmall]}>
          <Text style={[styles.eyebrow, insets.small && styles.eyebrowSmall]}>{slide.eyebrow}</Text>
          <Text adjustsFontSizeToFit minimumFontScale={0.74} numberOfLines={3} style={[styles.title, insets.small && styles.titleSmall]}>
            {slide.title}
          </Text>
          <Text style={[styles.body, insets.small && styles.bodySmall]}>{slide.body}</Text>
        </View>
        <View style={[styles.bottom, insets.small && styles.bottomSmall]}>
          <View style={styles.dots}>{dots}</View>
          <PrimaryButton
            label={isLast ? 'Start exploring' : 'Next'}
            onPress={() => (isLast ? navigation.replace('Main') : setIndex(current => current + 1))}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  body: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 23,
    marginTop: 14,
    maxWidth: 330,
    textAlign: 'center',
  },
  bodySmall: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 10,
    maxWidth: 310,
  },
  bottom: {
    gap: 18,
    marginBottom: 20,
    width: '100%',
  },
  bottomSmall: {
    gap: 12,
    marginBottom: 12,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.34)',
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  dotActive: {
    backgroundColor: colors.active,
    width: 28,
  },
  dots: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  eyebrow: {
    color: colors.active,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  eyebrowSmall: {
    fontSize: 11,
  },
  hero: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  heroSmall: {
    paddingBottom: 16,
  },
  screen: {
    flex: 1,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 9, 20, 0.48)',
  },
  skip: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  skipSmall: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  skipText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
  },
  skipTextSmall: {
    fontSize: 12,
  },
  title: {
    color: colors.ink,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 40,
    marginTop: 8,
    maxWidth: 350,
    textAlign: 'center',
  },
  titleSmall: {
    fontSize: 27,
    lineHeight: 31,
    maxWidth: 318,
  },
});
