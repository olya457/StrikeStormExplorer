import React from 'react';
import {ImageBackground, ImageSourcePropType, StyleSheet, View} from 'react-native';

type Props = {
  children: React.ReactNode;
  overlay?: number;
  source: ImageSourcePropType;
};

export function AppBackground({children, overlay = 0.52, source}: Props) {
  return (
    <ImageBackground source={source} resizeMode="cover" style={styles.background}>
      <View style={[StyleSheet.absoluteFillObject, {backgroundColor: `rgba(4, 9, 20, ${overlay})`}]} />
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
