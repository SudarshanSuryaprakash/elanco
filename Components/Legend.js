import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

//Simply shows a list of all the resources/applications (based on what was passed in as "main" from the Graph screen)
//Passes in the total cost and quantity to the Resourcedetail screen
export default Legend = ({ route, navigation }) => {
  const { main } = route.params;

  const numberedResources = () => {
    let count = 0;
    return main.map((item) => {
      count = count + 1;
      return count + '. ' + item;
    });
  };

  return (
    <LinearGradient colors={['#ffeebb', '#fdffbc']} style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          {numberedResources().map((item, index) => {
            let count = numberedResources().indexOf(item);

            return (
              <TouchableOpacity
                style={styles.resourceButton}
                onPress={() =>
                  navigation.navigate('Resource', {
                    resource: item,
                    cost: route.params.finalCostData[count],
                    quantity: route.params.finalQuantityData[count],
                  })
                }
                key={index}
              >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#7ec263',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  resourceButton: {
    backgroundColor: '#f0c38e',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 350,
    borderWidth: 1,
    borderColor: 'black',
    margin: 3,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    color: '#58391c',
  },
});
