import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/PostsScreen'
import PostsShowScreen from '../screens/PostsShowScreen'
import PodcastScreen from '../screens/PodcastScreen'
import PodcastShowScreen from '../screens/PodcastShowScreen'
import ProccessPeopleScreen from '../screens/ProccessPeopleScreen'
import ContactScreen from '../screens/ContactScreen'
import GameShowScreen from '../screens/GameShowScreen'
import DenounceScreen from '../screens/DenounceScreen'

import FlashImagesScreen from '../screens/FlashImagesScreen'
import GamesScreen from '../screens/GamesScreen'
import TeamScreen from '../screens/TeamScreen'
import SpecialTeamScreen from '../screens/SpecialTeamScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import JobsScreen from '../screens/JobsScren'
import StoreScreen from '../screens/StoreScreen'
import JobShowScreen from '../screens/JobShowScreen'
import HomeShowScreen from '../screens/HomeShowScreen'

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
          name='PodcastScreen'
          component={PodcastScreen}
          options={{ title: 'PodcastScreen Screen' }}
        />

        <Stack.Screen
          name='PodcastShowScreen'
          component={PodcastShowScreen}
          options={{ title: 'PodcastShowScreen Screen' }}
        />

        <Stack.Screen
          name='FlashImagesScreen'
          component={FlashImagesScreen}
          options={{ title: 'FlashImagesScreen Screen' }}
        />

        <Stack.Screen
          name='GamesScreen'
          component={GamesScreen}
          options={({ route }) => ({
            title: 'route.params.item.name'
          })}
        />

        <Stack.Screen
          name='GameShowScreen'
          component={GameShowScreen}
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
          options={{ title: 'Agencias' }}
        />

        <Stack.Screen
          name='JobsScreen' header='null'
          component={JobsScreen}
          options={{ title: 'Empleos' }}
        />

        <Stack.Screen
          name='JobShowScreen' header='null'
          component={JobShowScreen}
          options={{ title: 'Empleos' }}
        />
        <Stack.Screen
          name='ContactScreen' header='null'
          component={ContactScreen}
          options={{ title: 'Empleos' }}
        />

        <Stack.Screen
          name='DenounceScreen' header='null'
          component={DenounceScreen}
          options={{ title: 'Empleos' }}
        />

        <Stack.Screen
          name='ProccessPeopleScreen' header='null'
          component={ProccessPeopleScreen}
          options={{ title: 'Empleos' }}
          />

        <Stack.Screen
          name='PostsShowScreen' header='null'
          component={PostsShowScreen}
          options={{ title: 'Noticia' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator
