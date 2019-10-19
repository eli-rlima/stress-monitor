// Global
import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity, 
    ScrollView, Image } from 'react-native';
import * as _ from 'lodash';
import { DrawerActions } from 'react-navigation-drawer'
// Assets
import Frame from '../assets/Frame';
import Logo from '../assets/Logo';
import Menu from '../assets/Menu';
// Api
import firebase from 'react-native-firebase';

class Main extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (Logo),
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Menu />
            </TouchableOpacity>
        )
    });

    render() {
        return (
            <Fragment>
                <StatusBar backgroundColor="#87CEFA" />
                <SafeAreaView>
                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        <Text>History</Text>
                    </View>
                </SafeAreaView>
            </Fragment>
        );        
    }
}
const styles = StyleSheet.create({
    text:{
        fontStyle: "normal",
        textAlign: "justify",
        fontSize: 20,
        paddingHorizontal: 35,
        bottom: 250,
        fontFamily: 'Montserrat-Regular'
    },
    button: {
        backgroundColor:'#87CEFA',
        width: 253,
        height: "30%",
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 8},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 4,
    },
    textButton: {
        textAlign:'center',
        fontWeight: "100",
        fontSize: 18,
        alignItems: "center",
        padding: 14,
        fontFamily: 'Montserrat-Regular'
    },
    containerButton:{
        paddingVertical: 20,
        alignItems: 'center',
        bottom: 100,
    },
});

export default Main;
