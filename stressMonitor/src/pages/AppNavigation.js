// Global
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
// Views
import Login from './Login';
import Main from './Main';
import Register from './Register';
import Logo from '../assets/Logo';
import Menu from '../assets/Menu';
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

const AppNavigator = createStackNavigator({
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
    initialRouteName: 'main'
});

export default createAppContainer(AppNavigator);