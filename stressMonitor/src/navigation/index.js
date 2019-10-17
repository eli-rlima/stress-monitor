// Global
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Image } from 'react-native';
// Views
import Login from '../pages/Login';
import Main from '../pages/Main';
import React from 'react';
import History from '../pages/History';
import Register from '../pages/Register';
import Report from '../pages/Report';
// Assets
import Home from '../assets/home.png';
import iHistory from '../assets/iHistory';
import iReport from '../assets/iReport';
import Logout from '../assets/Logout';

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
    },
}, {
    initialRouteName: 'Main',
    mode: "modal"
});

const HistoryNavigator = createStackNavigator({
    History: {
        screen: History,
    },
}, {
    initialRouteName: 'History',
    mode: "modal"
});

const ReportNavigator = createStackNavigator({
    Report: {
        screen: Report,
    },
}, {
    initialRouteName: 'Report',
    mode: "modal"
});

const MenuNavigator = createDrawerNavigator({
    Home: {
        screen: MainNavigator,
        navigationOptions: {
            drawerIcon: (<Image source={Home} style={{height: 20, width: 20}}/>),
        }
    },
    History: {
        screen: HistoryNavigator,
        navigationOptions: {
            drawerLabel: 'Histórico de Estresse',
            drawerIcon: iHistory,
        }
    },
    Report: {
        screen: ReportNavigator,
        navigationOptions: {
            drawerLabel: 'Gerar Relatórios',
            drawerIcon: iReport,
        }
    },
    Logout: {
        screen: Login,
        navigationOptions: {
            drawerLabel: 'Logout',
            drawerIcon: Logout,
        }
    },
}, {
    drawerBackgroundColor: '#87CEFA',
    contentOptions: {
        activeTintColor: 'white'
    },
    drawerWidth: '80%',
    drawerType: "back"
});

const AppNavigator = createSwitchNavigator({
    auth: {
        screen: AuthNavigator, 
        navigationOptions:{
            header: null,
            gesturesEnabled: false,
        }
    },
    menu: {
        screen: MenuNavigator,
    }
}, {
    initialRouteName: 'auth'
});

export default createAppContainer(AppNavigator);