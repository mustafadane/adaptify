/** @format */
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux'
import store from './store'

const Provided = () => {
    return (
        <Provider store={store}>
            <App></App>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Provided);
