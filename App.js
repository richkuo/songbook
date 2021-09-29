import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import SearchScreen from './screens/SearchScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
