/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { StackNavigator } from 'react-navigation'

import Login from './screens/Login'
import Home from './screens/Home'


const App = StackNavigator({
  initial: {screen:Login},
  home: {screen:Home},
  },
  {
    headerMode: 'none',
  }
)

// export default (<Provider store={store}><App /></Provider>)
export default App


