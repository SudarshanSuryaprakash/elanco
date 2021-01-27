import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import { LinearGradient } from 'expo-linear-gradient';

import { LineChart } from 'react-native-chart-kit';

export default function Graph({ navigation, route }) {
  const [graphLabels, setGraphLabels] = useState([]);
  const [finalCostData, setFinalCostData] = useState([]);
  const [finalQuantityData, setFinalQuantityData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [finished, setFinished] = useState(false);
  const [raw, setRaw] = useState([]);
  const [resources, setResources] = useState([]);
  const [applications, setApplications] = useState([]);

  const [resourceDetails, setResourceDetails] = useState({});

  useEffect(() => {
    //FUNCTION TO FETCH DATA FROM PROVIDED API
    (async () => {
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
    })();
  }, []);

  useEffect(() => {
    let count = 0;
    let labels = [];
    resources.forEach(async (resource) => {
      count = count + 1;
      labels.push(count);
      let obj = {};
      const filteredResource = raw.filter((item) => {
        return item.MeterCategory === resource;
      });

      let cost = 0;
      let quantity = 0;
      filteredResource.map((item) => {
        quantity = quantity + parseInt(item.ConsumedQuantity);
        cost = cost + parseInt(item.Cost);
      });
      obj[resource] = { cost, quantity };
      obj = Object.assign(resourceDetails, obj);
      setResourceDetails(obj);
    });
    setGraphLabels(labels);
  }, [raw, resources]);

  const setData = (temp) => {
    if (Object.keys({}) !== Object.keys(resourceDetails)) {
      const data = [];
      if (resources.length) {
        resources.forEach((resource) => {
          data.push(resourceDetails[resource][temp]);
        });
      }
      return data;
    }
  };

  const setGraphData = () => {
    if (resourceDetails !== {} && resources.length) {
      const data = {
        labels: graphLabels,
        datasets: [
          {
            data: setData(route.params.display),
          },
        ],
      };
      return data;
    }
  };

  const chartConfig = {
    // backgroundGradientFrom: '#1E2923',
    // backgroundGradientTo: '#08130D',
    backgroundGradientFrom: '#007965',
    backgroundGradientTo: '#00af91',
    //color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    color: (opacity = 1) => `#80ffdb`,
  };

  useEffect(() => {
    if (Object.keys(resourceDetails).length !== 0) {
      if (flag === false) {
        setFinalCostData(setData('cost'));
        setFinalQuantityData(setData('quantity'));
        setFlag(true);
      }
      if (route.params.display === 'cost') {
        if (finalCostData[0] !== undefined && finished === false) {
          let tc = 0;
          finalCostData.map((item) => {
            tc = tc + item;
          });
          setTotalCost(tc);
          setFinished(true);
        }
      } else {
        if (finalQuantityData[0] !== undefined && finished === false) {
          let tc = 0;
          finalQuantityData.map((item) => {
            tc = tc + item;
          });
          setTotalQuantity(tc);
          setFinished(true);
        }
      }
    }
  }, [resources, finalCostData, finalQuantityData]);

  //console.log(flag);

  return (
    <LinearGradient
      // Background Linear Gradient
      //colors={['#1E2923', '#08130D']}
      colors={['#00af91', '#007965']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {flag === true ? (
          <View>
            <LineChart
              data={setGraphData()}
              width={screenWidth}
              height={screenHeight / 1}
              chartConfig={chartConfig}
              bezier
            />
            <TouchableOpacity
              style={styles.legendButton}
              onPress={() =>
                navigation.navigate('Legend', {
                  resources,
                  finalCostData,
                  finalQuantityData,
                })
              }
            >
              <Text style={styles.legendText}>Legend</Text>
            </TouchableOpacity>

            {route.params.display === 'cost' ? (
              <Text style={styles.totalText}>Total Cost: {totalCost}</Text>
            ) : (
              <Text style={styles.totalText}>
                Total Quantity: {totalQuantity}
              </Text>
            )}
          </View>
        ) : (
          <ActivityIndicator color='#433d3c' size='large' />
        )}
        <Text style={styles.note}>Note: these are discrete values.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight / 9.6,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00af91',
  },
  legendText: {
    // color: 'rgb(26, 255, 146)',
    color: 'black',
    fontWeight: 'bold',
  },
  legendButton: {
    position: 'absolute',
    bottom: 500,
    right: 30,
    backgroundColor: '#80ffdb',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  totalText: {
    color: '#80ffdb',
    //color: 'rgb(26, 255, 146)',
    position: 'absolute',
    right: 10,
    top: 20,
    fontWeight: 'bold',
    fontSize: 24,
  },
  note: {
    bottom: 30,
    right: 20,
    position: 'absolute',
    color: 'white',
  },
});