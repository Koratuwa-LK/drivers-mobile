import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deliverynav from './nav/Deliverynav';

export default function App() {
  return (
    <Deliverynav></Deliverynav>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
