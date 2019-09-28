import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, 
    ScrollView, KeyboardAvoidingView } from 'react-native';
import * as _ from 'lodash';

import Rectangle from '../assets/Rectangle';

import { NavigationActions } from 'react-navigation'

class Login extends Component {
    onNavigation = NavigationActions.navigate({
        routeName: 'Main',
        params: {},
    });

    render() {
        return (
            <Fragment>
                <StatusBar backgroundColor="#87CEFA" />
                <SafeAreaView>
                    <ScrollView>
                        <KeyboardAvoidingView
                            style={{flex:1}}
                            behavior='position'
                            enabled
                        >
                            <View style={styles.header}>
                               <Rectangle />
                            </View>

                            <View style={styles.viewInput}>
                                <TextInput style={styles.textInput} placeholder="Email" keyboardType="email-address"/>
                                <TextInput style={styles.textInput2} placeholder="Senha" keyboardType="default" secureTextEntry={true}/>
                                <Text style={styles.senhaText}>
                                    Esqueceu sua senha?
                                </Text>
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.textButton}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.contaText}>
                                        Não tem uma conta?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );        
    }
}
const styles = StyleSheet.create({
    header: {
        margin: 0,
        top: "10%",
        alignItems: "center",

    },
    textInput: {
        borderStyle: 'solid',
        fontSize:20,
        marginHorizontal: 35,
        backgroundColor: "#87CEFA",
        marginTop: "30%"
    },
    textInput2: {
        borderStyle: 'solid',
        fontSize:20,
        marginHorizontal: 35,
        backgroundColor: "#87CEFA",
        marginTop: "4%",
        justifyContent: "center",
    },
    viewInput: {
        paddingHorizontal: "5%"
    },
    senhaText: {
        paddingTop: "3%",
        alignSelf: "flex-end",
        paddingRight: 40,
        fontSize: 14,
        textDecorationLine: "underline"
    },
    containerButton:{
        paddingVertical:30,
        alignItems: 'center',
    },
    button: {
        backgroundColor:'#87CEFA',
        width: 253,
        height: "26%"
    },
    textButton: {
        textAlign:'center',
        fontWeight: "bold",
        fontSize: 16,
        alignItems: "center",
        padding: 16
    },
    contaText: {
        paddingTop: "3%",
        alignItems: "flex-start",
        fontSize: 14,
        textDecorationLine: "underline"
    },
});

export default Login;
