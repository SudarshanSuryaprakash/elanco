import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default ({ route }) => {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#1E2923', '#08130D']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.resourceContainer}>
          <Text style={styles.resourceText}>{route.params.resource}</Text>
        </View>
        <View style={styles.costContainer}>
          <Text style={styles.costText}>Total Cost: </Text>
          <Text style={styles.costText}>{route.params.cost}</Text>
        </View>
        <View style={styles.costContainer}>
          <Text style={styles.costText}>Total Quantity: </Text>
          <Text style={styles.costText}>{route.params.quantity}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  resourceContainer: {
    height: 100,
    backgroundColor: '#5ccc5a',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 30,
  },
  resourceText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  costContainer: {
    flexDirection: 'row',
    margin: 30,
    height: 80,
    backgroundColor: '#5acc86',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  costText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
  },
});
