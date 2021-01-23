import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default Home = ({ navigation }) => {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#1E2923', '#08130D']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <Text style={styles.headText}>Welcome to the Elanco Data Matrix</Text>
        </View>
        <View style={styles.pillsContainer}>
          <TouchableOpacity
            style={{ ...styles.costsButton, backgroundColor: 'red' }}
            onPress={() => navigation.navigate('Graph', { display: 'cost' })}
          >
            <Text style={styles.costsText}>Costs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.costsButton, backgroundColor: 'blue' }}
            onPress={() =>
              navigation.navigate('Graph', { display: 'quantity' })
            }
          >
            <Text style={styles.costsText}>Quantities</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'black',
  },
  headContainer: {
    height: 100,
    width: '100%',
    backgroundColor: '#5ccc5a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText: {
    fontSize: 25,
  },
  pillsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  costsText: {
    color: 'rgb(26, 255, 146)',
  },
  costsButton: {
    padding: 10,
    margin: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 100,
    alignItems: 'center',
  },
});
