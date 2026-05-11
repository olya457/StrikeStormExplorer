import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator, type BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {HomeScreen} from '../screens/HomeScreen';
import {LearnScreen} from '../screens/LearnScreen';
import {LocationDetailScreen} from '../screens/LocationDetailScreen';
import {LocationsScreen} from '../screens/LocationsScreen';
import {MapScreen} from '../screens/MapScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {SavedScreen} from '../screens/SavedScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {colors, navBottomGap, radii, tabBarHeight} from '../styles/theme';
import type {MainTabParamList, RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.dark,
  },
};

const tabIcons: Record<keyof MainTabParamList, string> = {
  Home: '⚡',
  Locations: '🗼',
  Map: '🗺️',
  Learn: '📚',
  Saved: '💾',
};

function FloatingTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <View style={styles.tabOuter} pointerEvents="box-none">
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const options = descriptors[route.key].options;
          const label = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : route.name;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={focused ? {selected: true} : {}}
              key={route.key}
              onPress={() => {
                const event = navigation.emit({
                  canPreventDefault: true,
                  target: route.key,
                  type: 'tabPress',
                });

                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              style={({pressed}) => [styles.tabItem, pressed && styles.tabPressed]}>
              <View style={[styles.iconBubble, focused && styles.iconBubbleActive]}>
                <Text style={styles.tabIcon}>{tabIcons[route.name as keyof MainTabParamList]}</Text>
              </View>
              <Text numberOfLines={1} style={[styles.tabLabel, focused && styles.tabLabelActive]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function renderTabBar(props: BottomTabBarProps) {
  return <FloatingTabBar {...props} />;
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Locations" component={LocationsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{animation: 'fade', headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="LocationDetail" component={LocationDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconBubble: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  iconBubbleActive: {
    backgroundColor: colors.activeSoft,
    borderColor: colors.active,
    borderWidth: 1,
  },
  tabBar: {
    alignItems: 'center',
    backgroundColor: colors.panelStrong,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    flexDirection: 'row',
    height: tabBarHeight,
    paddingHorizontal: 6,
  },
  tabIcon: {
    fontSize: 21,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    gap: 3,
    justifyContent: 'center',
    minWidth: 0,
  },
  tabLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0,
  },
  tabLabelActive: {
    color: colors.ink,
  },
  tabOuter: {
    bottom: navBottomGap,
    left: 14,
    position: 'absolute',
    right: 14,
  },
  tabPressed: {
    opacity: 0.72,
  },
});
