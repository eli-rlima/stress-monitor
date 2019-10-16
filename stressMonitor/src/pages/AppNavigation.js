// Global
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Views
import Login from './Login';
import Logo from '../assets/Logo';
import Main from './Main';
import Menu from '../assets/Menu';
import React from 'react';
import Register from './Register';
import { createStackNavigator } from 'react-navigation-stack';

// Assets

const AuthNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null,
        }
    },
}, {
    initialRouteName: 'Login',
    mode: "modal"
});

const MainNavigator = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            headerLeft: Logo,
            headerRight: Menu
        }
    },
}, {
    initialRouteName: 'Main',
    mode: "modal"
});

const AppNavigator = createSwitchNavigator({
    auth: {
        screen: AuthNavigator, 
        navigationOptions:{
            header: null,
            gesturesEnabled: false,
        }
    },
    main: {
        screen: MainNavigator,
        navigationOptions:{
            // headerLeft:
            header: null,
            gesturesEnabled: false,
        }
    }
}, {
    initialRouteName: 'auth'
});

export default createAppContainer(AppNavigator);