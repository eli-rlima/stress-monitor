// Global
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Image } from 'react-native';
// Views
import Login from '../pages/Login';
import Main from '../pages/Main';
import History from '../pages/History';
import Register from '../pages/Register';
import Report from '../pages/Report';
import Home from '../pages/Home';
import GoodBye from '../pages/GoodBye';
import HeaderDrawer from '../components/HeaderDrawer';
import ForgetPass from '../components/Modal/ForgetPassword';
import Stress from '../pages/Stress';
// Assets
import iHome from '../assets/home.png';
import iHistory from '../assets/iHistory';
import iReport from '../assets/iReport';
import Logout from '../assets/Logout';
import Icon from 'react-native-vector-icons/AntDesign';

const AuthNavigator = createStackNavigator({
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register,
    },
    ForgetPass: {
        screen: ForgetPass,
    }
}, {
    initialRouteName: 'Login',
    mode: "modal",
    defaultNavigationOptions: {
        header: null,
    }
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
    Open: {
        screen: Main,
    }
}, {
    initialRouteName: 'History',
    mode: "modal"
});

const StressNavigator = createStackNavigator({
    Stress: {
        screen: Stress,
    },
}, {
    initialRouteName: 'Stress',
    mode: "modal"
});
const ReportNavigator = createStackNavigator({
    Report: {
        screen: Report,
    },
}, {
    initialRouteName: 'Report',
    mode: "modal",
});

const MenuNavigator = createDrawerNavigator({
    Home: {
        screen: MainNavigator,
        navigationOptions: {
            drawerIcon: (<Image source={iHome} style={{height: 20, width: 20}}/>),
        }
    },
    Stress: {
        screen: StressNavigator,
        navigationOptions: {
            drawerLabel: 'Cadastrar Estresse',
            drawerIcon: (<Icon name="plus" size={25}></Icon>),
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
        screen: GoodBye,
        navigationOptions: {
            drawerLabel: 'Logout',
            drawerIcon: Logout,
        },
    },
}, {
    drawerBackgroundColor: 'rgba(133, 205, 250, 0.6)',
    contentOptions: {
        activeTintColor: 'white',
        labelStyle: {
            fontSize: 16,
            fontFamily: 'Montserrat-Regular',
            fontWeight: '200',
        }
    },
    navigationOptions: {
        
    },
    drawerWidth: '80%',
    drawerType: "slide",
    contentComponent: HeaderDrawer,
    initialRouteName: 'Home'
});

const AppNavigator = createSwitchNavigator({
    home: {
        screen: Home,
        navigationOptions: {
            header: null,
        }
    },
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
    initialRouteName: 'home'
});

export default createAppContainer(AppNavigator);