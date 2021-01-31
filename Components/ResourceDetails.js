import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

//Simply displays the Application/Resource name and the total cost/quantity passed in through Legend
// which in turn got this information from graph.
export default ({ route }) => {
  return (
    <LinearGradient colors={['#ffeebb', '#fdffbc']} style={{ flex: 1 }}>
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
    backgroundColor: '#f0c38e',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 30,
    borderRadius: 15,
  },
  resourceText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  costContainer: {
    flexDirection: 'row',
    margin: 30,
    height: 80,
    backgroundColor: '#6a492b',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 5,
  },
  costText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fdffbc',
  },
  quantityContainer: {
    flexDirection: 'row',
  },
});
