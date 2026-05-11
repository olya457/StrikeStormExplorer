import {Platform} from 'react-native';

export const colors = {
  ink: '#F8FBFF',
  muted: '#AFC1D8',
  panel: 'rgba(9, 17, 33, 0.76)',
  panelStrong: 'rgba(9, 17, 33, 0.9)',
  border: 'rgba(255, 255, 255, 0.18)',
  active: '#8DE7FF',
  activeSoft: 'rgba(141, 231, 255, 0.22)',
  amber: '#FFD36E',
  danger: '#FF7B8B',
  success: '#86F7B5',
  dark: '#07101F',
  map: '#12263D',
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 22,
  xl: 30,
};

export const navBottomGap = Platform.OS === 'ios' ? 20 : 30;
export const tabBarHeight = 72;
export const androidEdgeGap = Platform.OS === 'android' ? 30 : 0;
