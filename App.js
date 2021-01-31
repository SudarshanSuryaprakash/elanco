//###############EXTERNAL IMPORTS##################

import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from '@react-navigation/stack';

//###############END EXTERNAL IMPORTS##################

//###############INTERNAL IMPORTS##################
//The screen that shows a graph (either resource data or application data based on the props passed into it)
import Graph from './Components/Graph';

//The screen that lets you choose between Cost and Quantities
import Home from './Components/Home';

//The screen that lets you choose between Resources, Applications and Application Deep Dive
import FirstScreen from './Components/FirstScreen';

//The Screen that shows the Resources/Applications once the legend button is clicked
import Legend from './Components/Legend';

//The screen that shows the cost and quantities of each Resource or Application based on which screen you came through
import ResourceDetails from './Components/ResourceDetails';

//The Application Deep Dive Screen which shows all the applications
import ApplicationDeepDive from './Components/ApplicationDeepDive';

//The screen that shows all the resources used by a particular application
import ShowResourcesInApplication from './Components/ShowResourcesInApplication';

//###############END INTERNAL IMPORTS##################

//Creating the Stack navigator to move around the application
const Stack = createStackNavigator();

export default function App() {
  //Create home stack simply gives the app information about all the screens
  //- and what "name" to use to navigate from one screen to another

  createHomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name='FirstScreen'
        // props={{ }}
        component={FirstScreen}
        options={() => ({
          title: 'Elanco',
          headerStyle: {
            backgroundColor: '#433d3c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <Stack.Screen
        name='Home'
        // props={{ }}
        component={Home}
        options={() => ({
          title: 'Elanco',
          headerStyle: {
            backgroundColor: '#433d3c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <Stack.Screen
        name='ApplicationDeepDive'
        // props={{ }}
        component={ApplicationDeepDive}
        options={() => ({
          title: 'Applications',
          headerStyle: {
            backgroundColor: '#433d3c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <Stack.Screen
        name='ShowResourcesInApplication'
        // props={{ }}
        component={ShowResourcesInApplication}
        options={() => ({
          title: 'Resource Details of Application',
          headerStyle: {
            backgroundColor: '#433d3c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <Stack.Screen
        name='Graph'
        component={Graph}
        options={{
          title: 'Graphical representation',
          headerStyle: {
            backgroundColor: '#433d3c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name='Legend'
        component={Legend}
        options={{
          title: 'Resource Legend',
          headerStyle: {
            backgroundColor: '#433d3c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name='Resource'
        component={ResourceDetails}
        options={{
          title: 'Resource Detail',
          headerStyle: {
            backgroundColor: '#433d3c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );

  return (
    <LinearGradient colors={['#f4f5db', '#d9dab0']} style={styles.background}>
      <NavigationContainer>{createHomeStack()}</NavigationContainer>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
