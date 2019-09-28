import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, 
    ScrollView, KeyboardAvoidingView } from 'react-native';
import * as _ from 'lodash';

import Rectangle from '../assets/Rectangle';

import firebase from 'react-native-firebase';

class Login extends Component {
    
    state = {
        email: '',
        password: '',
        isAuthenticated: false
    }
    
    login = async () => {
        const { email, password } = this.state;
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            firebase.
            this.setState({ isAuthenticated: true, email: '', password: '' });
            console.log(user.user.email);
            console.log(this.state.isAuthenticated);
        } catch (error) {
            console.log(error);
        }
    }

    register = async () => {
        const { email, password } = this.state;
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            console.log(user);
        }catch (error) {
            console.log(error);
        }
    }
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
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder="Email" 
                                    keyboardType="email-address"
                                    value={this.state.email}
                                    onChangeText={email => this.setState({email: email})}
                                    />
                                <TextInput 
                                    style={styles.textInput2} 
                                    placeholder="Senha" 
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={password => this.setState({password: password})}
                                    />
                                <Text style={styles.senhaText}>
                                    Esqueceu sua senha?
                                </Text>
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={this.register}
                                    >
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
