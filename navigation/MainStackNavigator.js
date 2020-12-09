import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/HomeScreen'
import GamesScreen from '../screens/GamesScreen'
import TeamScreen from '../screens/TeamScreen'
import SpecialTeamScreen from '../screens/SpecialTeamScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import JobsScreen from '../screens/JobsScren'
import StoreScreen from '../screens/StoreScreen'

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
          name='Login' header='null'
          component={LoginScreen}
          options={{ title: 'LoginScreen' }}
        />
        <Stack.Screen
          name='Register' header='null'
          component={RegisterScreen}
          options={{ title: 'RegisterScreen' }}
        />


        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name='User'
          component={GamesScreen}
          options={({ route }) => ({
            title: 'route.params.item.name'
          })}
        />
        <Stack.Screen
          name='TeamScreen' header='null'
          component={TeamScreen}
          options={{ title: 'TeamScreen' }}
        />
        <Stack.Screen
          name='SpecialTeamScreen' header='null'
          component={SpecialTeamScreen}
          options={{ title: 'SpecialTeamScreen' }}
        />

        <Stack.Screen
          name='StoreScreen' header='null'
          component={StoreScreen}
          options={{ title: 'StoreScreen' }}
        />

        <Stack.Screen
          name='JobsScreen' header='null'
          component={JobsScreen}
          options={{ title: 'Empleos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator
