import {useMemo} from 'react';
import {Dimensions, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navBottomGap, tabBarHeight} from './theme';

export function useScreenInsets() {
  const safe = useSafeAreaInsets();
  const {width, height} = Dimensions.get('window');

  return useMemo(() => {
    const small = width < 370 || height < 720;
    const horizontal = small ? 14 : 18;
    const top = Platform.OS === 'android' ? 30 : Math.max(safe.top, small ? 12 : 16);
    const edgeBottom = Platform.OS === 'android' ? 30 : 20;
    const bottom = tabBarHeight + navBottomGap + (small ? 18 : 26);

    return {
      bottom,
      edgeBottom,
      height,
      horizontal,
      small,
      top,
      width,
    };
  }, [height, safe.top, width]);
}
