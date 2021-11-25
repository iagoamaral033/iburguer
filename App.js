import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, LogBox } from 'react-native';
import { Routes } from './src/routes';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="auto" translucent={false} backgroundColor="#F9F9F9"/>
      <Routes />
    </SafeAreaView>
  );
}