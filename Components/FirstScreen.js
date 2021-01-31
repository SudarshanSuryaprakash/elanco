//############### EXTERNAL IMPORTS ##################
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
//############### END EXTERNAL IMPORTS ##################

export default Home = ({ navigation }) => {
  //raw is the raw api data.
  const [raw, setRaw] = useState([]);
  //resources is the resources api data
  const [resources, setResources] = useState([]);
  //applications is the applications api data
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    //FUNCTION TO FETCH DATA FROM PROVIDED API AND SET RESPECTIVE STATE
    (async () => {
      try {
        const res = await fetch(
          'https://engineering-task.elancoapps.com/api/raw'
        );
        const rawTemp = await res.json();

        setRaw(rawTemp);
        const res2 = await fetch(
          'https://engineering-task.elancoapps.com/api/resources'
        );
        const resourcesTemp = await res2.json();
        setResources(resourcesTemp);

        const res3 = await fetch(
          'https://engineering-task.elancoapps.com/api/applications'
        );
        const applicationsTemp = await res3.json();
        setApplications(applicationsTemp);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <LinearGradient colors={['#ffeebb', '#fdffbc']} style={{ flex: 1 }}>
      {raw.length && applications.length && resources.length ? (
        // (above) Making sure that the data is received from the api and the state is set. Otherwise - Line 119
        <View style={styles.container}>
          <View style={styles.headContainer}>
            <Text style={styles.headText}>
              Welcome to the Elanco Data Display
            </Text>
          </View>
          <View style={styles.pillsContainer}>
            <TouchableOpacity
              style={{ ...styles.costsButton, backgroundColor: '#c70039' }}
              onPress={() =>
                navigation.navigate('Home', {
                  //Navigate to the Home screen, pass along the state, and set "main" to "resource"
                  main: 'resource',
                  raw,
                  applications,
                  resources,
                })
              }
            >
              <Text style={styles.costsText}>Resources</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.costsButton, backgroundColor: '#19456b' }}
              onPress={() =>
                navigation.navigate('Home', {
                  //Navigate to the Home screen, pass along the state, and set "main" to "application"
                  main: 'application',
                  raw,
                  applications,
                  resources,
                })
              }
            >
              <Text style={styles.costsText}>Applications</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                ...styles.costsButton,
                backgroundColor: '#f88f01',
                width: Dimensions.get('window').width / 2,
              }}
              onPress={() =>
                navigation.navigate('ApplicationDeepDive', {
                  //Navigate to ApplicationDeepDive and pass the state along
                  raw,
                  applications,
                  resources,
                })
              }
            >
              <Text
                style={{
                  ...styles.costsText,
                  color: '#fdffbc',
                  textAlign: 'center',
                }}
              >
                Application Deep Dive
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        //If the state is not set, Display a loading indicator
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <ActivityIndicator size='large' color='#58391c' />
        </View>
      )}
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
    marginTop: 20,
    height: 100,
    width: '100%',
    backgroundColor: '#f0c38e',
    //backgroundColor: '#00af91',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#58391c',
    textAlign: 'center',
  },
  pillsContainer: {
    flex: 1,
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
