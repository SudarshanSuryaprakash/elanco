//############### EXTERNAL IMPORTS ##################
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//############### END EXTERNAL IMPORTS ##################

export default Home = ({ navigation, route }) => {
  //destructure the state from the previous screen
  const { raw, applications, resources, main } = route.params;

  return (
    <LinearGradient colors={['#ffeebb', '#fdffbc']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <Text style={styles.headText}>Choose your path</Text>
        </View>
        <View style={styles.pillsContainer}>
          <TouchableOpacity
            style={{ ...styles.costsButton, backgroundColor: '#c70039' }}
            onPress={() =>
              navigation.navigate('Graph', {
                //Navigate to Graph, (where most of the calculations happen) and set the display to cost,
                //send the main (which could be either "resource" or "application") from the previous component (FirstScreen)
                //send the state (api data)
                display: 'cost',
                main,
                raw,
                applications,
                resources,
              })
            }
          >
            <Text style={styles.costsText}>Costs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.costsButton, backgroundColor: '#19456b' }}
            onPress={() =>
              navigation.navigate('Graph', {
                //Navigate to Graph, (where most of the calculations happen) and set the display to quantity,
                //send the main (which could be either "resource" or "application") from the previous component (FirstScreen)
                //send the state (api data)
                display: 'quantity',
                main,
                raw,
                applications,
                resources,
              })
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

    alignItems: 'center',
  },
  headContainer: {
    marginTop: 20,
    height: 100,
    width: '100%',
    backgroundColor: '#f0c38e',

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#58391c',
  },
  pillsContainer: {
    height: Dimensions.get('window').height / 2.6,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  costsText: {
    color: '#fdffbc',
    fontWeight: 'bold',
    fontSize: 20,
  },
  costsButton: {
    padding: 10,
    margin: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 150,
    alignItems: 'center',
  },
});
