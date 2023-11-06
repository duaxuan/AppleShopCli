import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import SlpastScreen from './screens/SlpastScreen';
import LoginScreen from './screens/LoginScreen';
import SigupScreen from './screens/SigupScreen';
import HomeScreen from './screens/HomeScreen';
import OrderPayScreen from './screens/Order/OrderPayScreen';
import NotificationScreen from './screens/NotificationScreen';
import OrderScreen from './screens/OrderScreen';
import BillScreen from './screens/Order/BillScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductdetailsScreen from './screens/Order/ProductdetailsScreen';
import OrderHistory from './screens/Profile/OrderHistory';
import FavouriteScreen from './screens/Profile/FavouriteScreen';
import EditAccountScreen from './screens/Profile/EditAccountScreen';
import AccountScrren from './screens/Profile/AccountScrren';
import InfoBlog from './screens/Order/InfoBlog';

// Bottom Tab
const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  const renderTabIcon = (name, label, focused, color, size) => (
    <View style={styles.boxIcon}>
      <MaterialCommunityIcons
        name={name}
        color={focused ? 'black' : color}
        size={size}
      />
      <Text style={focused ? styles.showTxt : styles.hiddenTxt}>{label}</Text>
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: 55},
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: '#EEEEEE',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            renderTabIcon('home', 'Home', focused, color, size),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            renderTabIcon('bell', 'Blog', focused, color, size),
        }}
      />
      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            renderTabIcon('receipt', 'Order', focused, color, size),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            renderTabIcon('account', 'Profile', focused, color, size),
        }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator
const Stack = createNativeStackNavigator();
const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="SplastScreen"
        component={SlpastScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SigupScreen"
        component={SigupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductdetailsScreen"
        component={ProductdetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BillScreen"
        component={BillScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderPayScreen"
        component={OrderPayScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InfoBlog"
        component={InfoBlog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditAccountScreen"
        component={EditAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountScrren"
        component={AccountScrren}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default StackNavigator;

const styles = StyleSheet.create({
  boxIcon: {
    alignItems: 'center',
  },
  showTxt: {
    display: 'flex',
  },
  hiddenTxt: {
    display: 'none',
  },
});
