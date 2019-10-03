import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation'; // 1.1.2

import AppNavigator from './AppNavigation';

const defaultGetStateForAction = AppNavigator.router.getStateForAction;

export default class App extends Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      AppNavigator.router.getStateForAction = (action, state) => {
        const screen = state ? state.routes[state.index] : null;
        const tab = screen && screen.routes ? screen.routes[screen.index] : null;
        const tabScreen = tab && tab.routes ? tab.routes[tab.index] : null;

        if (
            action.type === NavigationActions.BACK &&
            tab && tab.routeName === 'Login'
        ) {
          // Option 1: will close the application
          // return null;
          
          // Option 2: will keep the app open
          const newRoutes = state.routes.filter(r => r.routeName !== 'auth');
          
          const newIndex = newRoutes.length - 1;
          return defaultGetStateForAction(action, {
            index: newIndex,
            routes: newRoutes
          });
        }

        return defaultGetStateForAction(action, state);
      };
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    );
  }
}