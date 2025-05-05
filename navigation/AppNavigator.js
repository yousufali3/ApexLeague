import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from './screens/HomeScreen';
import MyLeaguesScreen from './screens/MyLeaguesScreen';
import SupportScreen from './screens/SupportScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'MyLeagues') iconName = 'trophy';
            else if (route.name === 'Support') iconName = 'help-circle';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#8B0000',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="MyLeagues" component={MyLeaguesScreen} />
        <Tab.Screen name="Support" component={SupportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
