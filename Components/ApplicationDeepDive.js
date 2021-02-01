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
  //getting the application, raw and resources api data from the previous screen
  const { applications, raw, resources } = route.params;
  const [resourceDetails, setResourceDetails] = useState({});
  const [applicationDetails, setApplicationDetails] = useState({});
  const [flag, setFlag] = useState(false);

  const [finalAppData, setFinalAppData] = useState({});
  console.log(finalAppData);

  //Filters the raw data by application and resource and sets applicationDetails and resourceDetails respectively
  useEffect(() => {
    //for each resource,
    resources.forEach((resource) => {
      let obj = {};
      //filter the raw data and obtain the items based on the current resource
      const filteredResource = raw.filter((item) => {
        return item.MeterCategory === resource;
      });

      //insert into obj the key of the current resource in the loop
      //and the value of all the items in the raw data with that particular resource
      obj[resource] = filteredResource;
      //copy into obj all the already assigned resources from the state
      obj = Object.assign(resourceDetails, obj);
      //set the state with the new resource included in the resourceDetails

      setResourceDetails(obj);
    });

    //same as the above, but with applications
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

  //This function gets all the resources used by a particular application
  const getApplicationDeepData = () => {
    const applicationDeepInfo = {};
    //going through each application in applicationDetails (which has the raw api data organised by their application)
    for (let application in applicationDetails) {
      //checking if the application is not present in applicationDeepInfo
      if (!applicationDeepInfo[application]) {
        applicationDeepInfo[application] = {}; //if not, initialize it
      }
      //for each item in the current application
      for (let app of applicationDetails[application]) {
        //checking if the resource used in the item (api data) is not present as a key inside the application key in applicationDeepInfo
        //which itself is a key
        if (!applicationDeepInfo[application][app.MeterCategory]) {
          //initialize the cost and quantity of that resource to 0
          applicationDeepInfo[application][app.MeterCategory] = {
            cost: 0,
            quantity: 0,
          };
        }
      }
    }

    //For each application in applicationDetails,
    for (let application in applicationDetails) {
      //for each entry (item) in applicationDetails, which has filtered the raw data based on its applications
      for (let app of applicationDetails[application]) {
        //for each reource inside applicationDeepInfo in each application,
        for (let res in applicationDeepInfo[application]) {
          //if the items resource is the resource in applicationDeepInfo of the current application, add to its cost and quantity
          if (app.MeterCategory === res) {
            applicationDeepInfo[application][res].cost += parseInt(app.Cost);
            applicationDeepInfo[application][res].quantity += parseInt(
              app.ConsumedQuantity
            );
          }
        }
      }
    }

    //finally, set the application deep info to finalAppData
    setFinalAppData(applicationDeepInfo);
  };

  //This function simply renders all the applications
  const renderApplications = () => {
    return Object.keys(finalAppData).map((app, index) => {
      return (
        <TouchableOpacity
          style={styles.button}
          key={app}
          onPress={() =>
            //Navigate to ShowResourcesInApplication and pass along the clicked applications' data and its name
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
    <LinearGradient colors={['#ffeebb', '#fdffbc']} style={{ flex: 1 }}>
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
