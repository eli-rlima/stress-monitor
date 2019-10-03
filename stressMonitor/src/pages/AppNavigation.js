import Login from './Login';
import Main from './Main';
import Register from './Register';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Logo from '../assets/Logo';
import Menu from '../assets/Menu';

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
            header: null,
            gesturesEnabled: false,
        }
    }
}, {

});

export default createAppContainer(AppNavigator);