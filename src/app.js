import React, {Component} from 'react';
import {
  View
} from 'react-native';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

import { registerScreens } from './screens';
registerScreens(store, Provider);

import {iconsMap, iconsLoaded} from './utils/AppIcons';

const navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#831d19',
    navigationBarColor: '#831d19',
    navBarBackgroundColor: '#ad241f',
    navBarTextColor: '#ffffff',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light'
}

class App {

    constructor() {
        iconsLoaded().then(() => {
            this.startApp();
        });
    }
    startApp() {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'Movies',
                    screen: 'mobile21.MoviesPage',
                    icon: iconsMap['md-videocam'],
                    selectedIcon: iconsMap['md-videocam'],
                    title: '21MOBILE',
                    navigatorStyle
                },
                {
                    label: 'Cinemas',
                    screen: 'mobile21.CinemasPage',
                    icon: iconsMap['md-pin'],
                    selectedIcon: iconsMap['md-pin'],
                    title: 'CINEMAS',
                    navigatorStyle
                },
                {
                    label: 'Schedule',
                    screen: 'mobile21.SchedulePage',
                    icon: iconsMap['md-calendar'],
                    selectedIcon: iconsMap['md-calendar'],
                    title: 'SCHEDULES',
                    navigatorStyle
                }
            ],
            tabsStyle: {
                tabBarButtonColor: '#999999',
                tabBarSelectedButtonColor: '#ffffff',
                tabBarBackgroundColor: '#ad241f'
            },
        });
    }
}

export default App;