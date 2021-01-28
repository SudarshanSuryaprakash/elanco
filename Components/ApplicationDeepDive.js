import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default ({ route, navigation }) => {
  const { applications, raw, resources } = route.params;
  const [resourceDetails, setResourceDetails] = useState({});
  const [applicationDetails, setApplicationDetails] = useState({});
  const [flag, setFlag] = useState(false);

  const [finalAppData, setFinalAppData] = useState({});

  useEffect(() => {
    resources.forEach((resource) => {
      let obj = {};
      const filteredResource = raw.filter((item) => {
        return item.MeterCategory === resource;
      });

      obj[resource] = filteredResource;
      obj = Object.assign(resourceDetails, obj);
      setResourceDetails(obj);
    });
    applications.forEach((application) => {
      let obj = {};
      const filteredResource = raw.filter((item) => {
        return item.ResourceGroup === application;
      });

      obj[application] = filteredResource;
      obj = Object.assign(applicationDetails, obj);
      setApplicationDetails(obj);
    });
    getApplicationDeepData();
    setFlag(!flag);
  }, []);

  const getApplicationDeepData = () => {
    const applicationDeepInfo = {};
    for (let application in applicationDetails) {
      for (let app of applicationDetails[application]) {
        if (!applicationDeepInfo[application]) {
          applicationDeepInfo[application] = {};
        }

        if (!applicationDeepInfo[application][app.MeterCategory]) {
          applicationDeepInfo[application][app.MeterCategory] = {
            cost: 0,
            quantity: 0,
          };
        }
      }
    }

    for (let application in applicationDetails) {
      for (let app of applicationDetails[application]) {
        for (let res in applicationDeepInfo[application]) {
          if (app.MeterCategory === res) {
            applicationDeepInfo[application][res].cost += parseInt(app.Cost);
            applicationDeepInfo[application][res].quantity += parseInt(
              app.ConsumedQuantity
            );
          }
        }
      }
    }
    setFinalAppData(applicationDeepInfo);
  };

  const renderApplications = () => {
    return Object.keys(finalAppData).map((app, index) => {
      return (
        <TouchableOpacity
          style={styles.button}
          key={app}
          onPress={() =>
            navigation.navigate('ShowResourcesInApplication', {
              appData: finalAppData[app],
              app,
            })
          }
        >
          <Text style={styles.text}>
            {index + 1}. {app}
          </Text>
        </TouchableOpacity>
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
        <ScrollView>{renderApplications()}</ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    //backgroundColor: '#8fcc5a',
    backgroundColor: '#80ffdb',
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
  },
});
