// Global
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, Alert, KeyboardAvoidingView, StatusBar } from 'react-native';
import * as _ from 'lodash';
// Views
import Rectangle from '../../assets/Rectangle';
// Api
import firebase from 'react-native-firebase';

class ForgerPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            visible: false,
        }
    }

    forgetPass = () => {
        const { email } = this.state;
        if (email) {
            firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                this.setState({ isVisibleModal: false });
                Alert.alert('Verifique seu e-mail.');
            })
            .catch(() => Alert.alert('Email não cadastrado'));
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={{flex:1}}
                behavior='padding'
                enabled
            >
                <View style={styles.container}>
                    <View style={styles.image}>
                        <Rectangle />
                    </View>
                    <View style={styles.forgetContainer}>
                        <Text style={styles.forgetText}>
                            Recuperação de Senha
                        </Text>
                    </View>
                    <View style={styles.containerTextInput}>
                        <TextInput 
                            style={styles.textInput}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={this.state.email}
                            onChangeText={email => this.setState({email: email})}
                            placeholder='Email'
                        />
                    </View>
                    <View style={styles.containerButton}>
                        <TouchableOpacity 
                            onPress={this.forgetPass} 
                            style={styles.button}
                        >
                            <Text style={styles.textButton}>
                                Enviar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );     
    }
}
const styles = StyleSheet.create({
    container: {
        top: '2%'
    },
    textInput: {
        borderStyle: 'solid',
        fontSize:18,
        marginHorizontal: 35,
        borderBottomWidth: 2,
        borderColor: "#87CEFA",
        fontFamily: 'Montserrat-Regular'
    },
    image: {
        alignItems: "center",
        justifyContent: "center"
    },
    containerButton:{
        top: '20%',
        alignItems: 'center',
    }, 
    button: {
        alignItems: "center",
        justifyContent: "center",
        top: '3%',
        backgroundColor:'#87CEFA',
        width: '30%',
        height: "30%"
    },
    textButton: {
        textAlign:'center',
        fontWeight: '100',
        fontSize: 15,
        alignItems: "center",
        padding: 14,
        fontFamily: 'Montserrat-Regular'
    },
    forgetText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 25
    },
    forgetContainer: {
        alignItems: "center",
        top: "2%"
    },
    containerTextInput: {
        top: '12%'
    }
});

export default ForgerPassword;
