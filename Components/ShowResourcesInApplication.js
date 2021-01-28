import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

import { LinearGradient } from 'expo-linear-gradient';

export default ({ route }) => {
  const { appData, app } = route.params;
  console.log(appData);

  const renderResources = () => {
    return Object.keys(appData).map((resource) => {
      return (
        <View style={styles.resourceContainer}>
          <View style={styles.resourceHeadingContainer}>
            <Text style={styles.resourceHeading}>{resource}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              Total Cost: {appData[resource].cost}
            </Text>
            <Text style={styles.detailText}>
              Total Quantity: {appData[resource].quantity}
            </Text>
          </View>
        </View>
      );
    });
  };

  return (
    <LinearGradient
      colors={['#007965', '#00af91']}
      //colors={['#1E2923', '#08130D']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>{app}</Text>
        </View>
        <View style={styles.subHeading}>
          <Text style={styles.subHeadingText}>Resources Used:</Text>
        </View>

        <ScrollView>{renderResources()}</ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    alignItems: 'center',
    height: HEIGHT / 10,
    justifyContent: 'center',
    backgroundColor: '#80ffdb',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
  },
  headingText: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeading: {
    alignItems: 'center',
    marginVertical: 20,
  },
  subHeadingText: {
    fontSize: 26,
    fontWeight: '600',
    color: '#80ffdb',
  },
  resourceContainer: {
    backgroundColor: '#a6f0c6',
    marginVertical: 10,
    width: Dimensions.get('window').width,
    borderRadius: 10,
  },
  resourceHeadingContainer: {
    alignItems: 'center',
  },
  resourceHeading: {
    fontSize: 24,
    fontWeight: '700',
  },
  detailsContainer: {
    flexDirection: 'row',

    height: HEIGHT / 25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
