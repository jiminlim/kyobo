import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import DetailScreen from './DetailScreen';
import ShowScreen from './ShowScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
     <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="ShowScreen" component={ShowScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
