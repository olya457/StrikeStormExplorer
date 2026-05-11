import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/navigation/AppNavigator';
import {SavedLocationsProvider} from './src/context/SavedLocationsContext';

function App(): React.JSX.Element {
  return (
    <View style={styles.root}>
      <SafeAreaProvider>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <SavedLocationsProvider>
          <AppNavigator />
        </SavedLocationsProvider>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
