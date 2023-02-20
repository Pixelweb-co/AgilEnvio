import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import CarForm from '../requisitions/forms/CarForm';

const Tab = createBottomTabNavigator();

export default TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search';
              break;
            case 'Cart':
              iconName = focused ? 'shopping-cart' : 'shopping-cart';
              break;
            case 'Profile':
              iconName = focused ? 'user' : 'user';
              break;
            case 'Settings':
              iconName = focused ? 'cog' : 'cog';
              break;
            case 'Notifications':
              iconName = focused ? 'bell' : 'bell';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart';
              break;
            case 'Messages':
              iconName = focused ? 'envelope' : 'envelope';
              break;
            default:
              iconName = 'question';
              break;
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        tabStyle: {
          width: 100,
        },
        showLabel: false,
        style: {
          backgroundColor: 'white',
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={CarForm} />
      <Tab.Screen name="Search" component={CarForm} />
      <Tab.Screen name="Cart" component={CarForm } />
      <Tab.Screen name="Profile" component={CarForm } />
      <Tab.Screen name="Settings" component={CarForm} />
      <Tab.Screen name="Notifications" component={CarForm} />
      <Tab.Screen name="Favorites" component={CarForm} />
      <Tab.Screen name="Messages" component={CarForm} />
    </Tab.Navigator>
  );
};
