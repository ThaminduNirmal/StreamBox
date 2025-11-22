import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Details from '../screens/Details';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen 
        name="Details" 
        component={Details}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

