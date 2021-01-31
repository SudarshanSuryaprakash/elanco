//############### EXTERNAL IMPORTS ##################
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';

//############### END EXTERNAL IMPORTS ##################

//Obtaining the size of the mobile ro dynamically layout the app
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Graph({ navigation, route }) {
  //############## COMPONENT STATE ##################
  //getting "main" which could be either "resource" or "application" from the previous component -
  //This decides what shows on the graph. Resource data OR Application data
  const { main } = route.params;

  //The numbers at the bottom of the graph
  const [graphLabels, setGraphLabels] = useState([]);

  //The cost of each resource/application is inserted into this array.
  const [finalCostData, setFinalCostData] = useState([]);
  //The quantity of each resource/application is inserted into this array.
  const [finalQuantityData, setFinalQuantityData] = useState([]);

  const [flag, setFlag] = useState(false);

  //The summation of all the costs of each resource/application
  const [totalCost, setTotalCost] = useState(0);
  //The summation of all the quantities of each resource/application
  const [totalQuantity, setTotalQuantity] = useState(0);

  //The raw data filtered by each resource/application
  const [resourceDetails, setResourceDetails] = useState({});
  //############## END COMPONENT STATE ##################

  //obtaining raw, applications and resources data from the previous component
  const { raw, applications, resources } = route.params;

  //FUNCTION TO SET THE resourceDetails state - which is the main state in this component
  //this state is an object, with each key being either a resource or an application, and the value being the total cost and quantity
  //of the key
  useEffect(() => {
    //count is used simply to get the number of data points for the graph
    let count = 0;
    //labels for the graph
    let labels = [];

    if (main === 'resource') {
      //if the client wants to see "Resources"
      resources.forEach(async (resource) => {
        //for each resource in the resource api,
        count = count + 1;
        labels.push(count);
        let obj = {}; //initialte an empty object - this will hold all the raw data filtered by resource

        //Filtering the raw data and returning only those items
        //that are of the current resource in the loop.
        const filteredResource = raw.filter((item) => {
          return item.MeterCategory === resource;
        });

        //To calculate the total cost and quantity of the data obtained after filtering the raw data
        //returning only those items that have their resource === the current resource in the loop
        let cost = 0;
        let quantity = 0;

        //Calculating the total cost of the filtered resource
        filteredResource.map((item) => {
          quantity = quantity + parseInt(item.ConsumedQuantity);
          cost = cost + parseInt(item.Cost);
        });

        //setting the object obj at key "resource" to hold the total cost and quantity of that resource
        obj[resource] = { cost, quantity };
        //copying the previous state of resourceDetails into obj
        obj = Object.assign(resourceDetails, obj);
        //setting the state with obj
        setResourceDetails(obj);
      });
    } else {
      //!!!!!!!!!SAME AS ABOVE, BUT WITH APPLICATION DATA instead of resource data!!!!!!!!!!!!!!
      applications.forEach(async (application) => {
        count = count + 1;
        labels.push(count);
        let obj = {};
        const filteredResource = raw.filter((item) => {
          return item.ResourceGroup === application;
        });

        let cost = 0;
        let quantity = 0;
        filteredResource.map((item) => {
          quantity = quantity + parseInt(item.ConsumedQuantity);
          cost = cost + parseInt(item.Cost);
        });

        obj[application] = { cost, quantity };

        obj = Object.assign(resourceDetails, obj);
        setResourceDetails(obj);
      });
    }

    //setting the graph labels with the numbers (label array calculated with count)
    setGraphLabels(labels);
  }, []);

  //function to set the data for the graph - each data value. it returns these data values in an array.
  const setData = (costOrQuantity) => {
    //takes in either "cost" or "quantity" and pulls data from resourceDetails accordingly
    if (Object.keys({}) !== Object.keys(resourceDetails)) {
      //Checking whether the Object has items
      const data = []; //initializing the data array
      if (main === 'resource') {
        //If the user had selected "resources",

        //pushing either cost or quantity of each resource into data[]
        resources.forEach((resource) => {
          data.push(resourceDetails[resource][costOrQuantity]);
        });
      } else {
        //do the same if the user selected applications, except go through each application
        if (applications.length) {
          applications.forEach((application) => {
            data.push(resourceDetails[application][costOrQuantity]);
          });
        }
      }
      return data; //return the data array which holds either all the costs or all the quantities
    }
  };

  //function to set the labels and data (cost or quantity) for the graph
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

  //chart configuration
  const chartConfig = {
    backgroundGradientFrom: '#ffeebb',
    backgroundGradientTo: '#fdffbc',

    color: () => `#58391c`,
  };

  //function to set the finalCostData (The data[] array consisting of all the costs) and finalQuantityData
  //Also calculates the total cost/quantity
  useEffect(() => {
    if (Object.keys(resourceDetails).length !== 0) {
      //Flag simply prevents an infinite re-render loop as this function sets the FinalCost / Quantity state
      //and also watches for changes in those states in order to rerender.
      if (flag === false) {
        setFinalCostData(setData('cost'));
        setFinalQuantityData(setData('quantity'));
        setFlag(true);
      }

      //calculates the total cost or quantity based on the "display" param passed in be the previous screen
      if (route.params.display === 'cost') {
        if (finalCostData[0] !== undefined) {
          let tc = 0;
          finalCostData.map((item) => {
            //mapping through each cost item and adding the cost to tc
            tc = tc + item;
          });
          setTotalCost(tc); //setting the total cost
        }
      } else {
        //same as above, but for quantity
        if (finalQuantityData[0] !== undefined) {
          let tq = 0;
          finalQuantityData.map((item) => {
            tq = tq + item;
          });
          setTotalQuantity(tq);
        }
      }
    }
  }, [finalCostData, finalQuantityData, resourceDetails]); //run this function each time finalCostData/finalQuantityData or resourceDetails
  // is updated

  return (
    <LinearGradient colors={['#ffeebb', '#fdffbc']} style={{ flex: 1 }}>
      <View style={styles.container}>
        {flag === true ? ( //Checking if all the data is ready to be displayed
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
              onPress={
                main === 'resource'
                  ? () =>
                      navigation.navigate('Legend', {
                        //if the 'main' from the previous screen is "resource"
                        //Navigate to Legend
                        //passing the resources api data in as main in order to display them
                        main: resources,
                        finalCostData,
                        finalQuantityData,
                      })
                  : () =>
                      navigation.navigate('Legend', {
                        //if the 'main' from the previous screen is "application"
                        //Navigate to Legend
                        //Passing the applications api data in
                        main: applications,
                        finalCostData,
                        finalQuantityData,
                      })
              }
            >
              <Text style={styles.legendText}>Legend</Text>
            </TouchableOpacity>

            {route.params.display === 'cost' ? (
              //displaying the total cost if the "display from the previous screen is "cost""
              <Text style={styles.totalText}>Total Cost: {totalCost}</Text>
            ) : (
              //otherwise, display total quantity
              <Text style={styles.totalText}>
                Total Quantity: {totalQuantity}
              </Text>
            )}
          </View>
        ) : (
          <ActivityIndicator color='#58391c' size='large' />
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
    backgroundColor: '#fdffbc',
  },
  legendText: {
    color: '#f88f01',
    fontWeight: 'bold',
  },
  legendButton: {
    position: 'absolute',
    bottom: 500,
    right: 30,
    backgroundColor: '#58391c',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  totalText: {
    color: '#58391c',

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
    color: '#f88f01',
  },
});
