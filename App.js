import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Graph from './Components/Graph';
import Home from './Components/Home';
import Legend from './Components/Legend';
import ResourceDetails from './Components/ResourceDetails';
import Test1 from './Extra/Test1';

const Stack = createStackNavigator();

import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  createHomeStack = () => (
    <Stack.Navigator>
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
      {/* <LinearGradient colors={['#1E2923', '#08130D']} style={styles.background}> */}
      <NavigationContainer>{createHomeStack()}</NavigationContainer>
    </LinearGradient>
    // <Test1 />
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
