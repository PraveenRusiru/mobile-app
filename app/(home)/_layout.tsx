import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assuming Expo, or use react-native-vector-icons

// Import your screen components
import HomeScreen from '../(home)/index';
import WorkoutScreen from '../(workout)/index';
// import ProgressScreen from './screens/ProgressScreen';
// import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Workout') {
              iconName = focused ? 'fitness' : 'fitness-outline';
            } else if (route.name === 'Progress') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'You') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF2D55', // A vibrant fitness pink/red
          tabBarInactiveTintColor: 'gray',
              headerShown: false,
          tabBarStyle: { 
      backgroundColor: '#000000', // Pure Black
      borderTopWidth: 0,          // Removes the thin line at the top
      height: 60,                 // Optional: make it slightly taller
      paddingBottom: 8,
    },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Workout" component={WorkoutScreen} />
        <Tab.Screen name="Progress" component={HomeScreen} />
        <Tab.Screen name="You" component={HomeScreen} />
      </Tab.Navigator>
    
  );
}