import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/HomeScreen'
import User from '../screens/UserScreen'
import Settings from '../screens/SettingsScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Login'
        screenOptions={{
          gestureEnabled: true,
          headerShown: false,
          headerBackTitleVisible: false
        }}
        headerMode='float'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name='User'
          component={User}
          options={({ route }) => ({
            title: 'route.params.item.name'
          })}
        />
        <Stack.Screen
          name='Settings'            header='null'
          component={Settings}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name='Login'            header='null'
          component={LoginScreen}
          options={{ title: 'LoginScreen' }}
        />
        <Stack.Screen
          name='Register'            header='null'
          component={RegisterScreen}
          options={{ title: 'RegisterScreen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator
