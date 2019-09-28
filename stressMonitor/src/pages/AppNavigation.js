import Login from './Login';
import Main from './Main';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Logo from '../assets/Logo';
import Menu from '../assets/Menu';

const AppNavigation = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    Main: {
        screen: Main,
        navigationOptions: {
            headerLeft: Logo,
            headerRight: Menu
        }
    },
}, {
    initialRouteName: 'Login',
    mode: "modal"
});

export default createAppContainer(AppNavigation);