// Global
import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, 
    ScrollView, KeyboardAvoidingView, Button } from 'react-native';
import * as _ from 'lodash';
// Views
import Rectangle from '../assets/Rectangle';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
// Utils
import Dicitionary from '../lib/utils/Dictionary';
// Api
import firebase from 'react-native-firebase';
import Api from '../api';

class Register extends Component {
    
    state = {
        nome: '',
        email: '',
        password: '',
        error: false,
        date: new Date('2009-01-01T00:00:00'),
        show: false,
        dateText:'',
        isVisible: false,
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    setDate = (event, date) => {
        date = date || this.state.date;
        
        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });

        this.setDateText();
        
    }

    setDateText = () => {
        let year;
        let month;
        let day;
        let diaSemana;

        const date = this.state.date.toString();
        
        [diaSemana, month, day, year] = date.split(' ');
        
        const monthDic = Dicitionary.get(month);

        const data = {
            date: day + ' de ' + monthDic + ' de ' + year,
        }

        this.setState({dateText: data.date});

    }

    datepicker = () => {
        this.show('date');
    }

    createUser = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(payload => {
            console.log(payload);
            this.props.navigation.navigate('Main');
            firebase.auth().currentUser.sendEmailVerification();
            this.setState({ isVisible: false });
        })
        .catch(err => {
            this.setState({error: true});
            console.log(err);
        });
    }

    register =  () => {
        this.setState({ error: false });
        const { email, password, nome, date} = this.state;
        try {
            this.setState({ isVisible: true });
            if (email && password && nome && date) {
                this.createUser(email, password);
                Api.database().ref('Users/').push({
                    nome,
                    email,
                    dataNascimeto: date,
                }).then(payload => {
                    console.log(payload);
                }).catch(err => {
                    this.setState({ isVisible: false });
                    console.log(err);
                });
            } else {
                this.setState({ isVisible: false });
                this.setState({ error: true });
            }
        }catch (error) {
            this.setState({ isVisible: false });
            console.log(error);
        }
    }
    render() {
        const { show, date, mode, isVisible, error } = this.state;
    
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
                            <Spinner 
                                visible={isVisible}
                                />
                            <View style={styles.header}>
                                <Rectangle />
                            </View>
                            <View style={styles.registerContainer}>
                                <Text style={styles.registerText}>
                                    Cadastro
                                </Text>
                            </View>
                            <View style={styles.header}>
                                {error 
                                ? <Text style={styles.errorText}>Preencha os campos adequadamente</Text> 
                                : <Text></Text>}
                            </View>
                            <View style={styles.viewInput}>
                                <TextInput  
                                    style={styles.textInput} 
                                    placeholder="Nome"
                                    autoCapitalize = "words"
                                    value={this.state.nome}
                                    onChangeText={nome => this.setState({nome: nome})}
                                    />
                            </View>
                            <View style={styles.viewInput}>
                                <TextInput  
                                    style={styles.textInput} 
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={this.state.email}
                                    onChangeText={email => this.setState({email: email})}
                                    />
                            </View>
                            
                            <View style={styles.viewInput}>
                                <TextInput  
                                    style={styles.textInput} 
                                    placeholder="Data de Nascimento"
                                    value={this.state.dateText}
                                    onTouchStart={this.datepicker}
                                />
                            </View>
                            <View style={styles.viewInput}>
                                <TextInput  
                                    style={styles.textInput} 
                                    placeholder="Senha"
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={password => this.setState({password: password})}
                                    />
                            </View>
                            <View>
                                <View>                               
                                    { show && <DateTimePicker value={date}
                                                mode={mode}
                                                display="spinner"
                                                onChange={this.setDate}
                                                minimumDate={new Date(1940, 0, 0)}
                                                maximumDate={new Date(2010, 0, 0)}
                                                />
                                    }
                                </View>
                                
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={this.register}
                                    >
                                    <Text 
                                        style={styles.textButton}
                                    >
                                        Cadastrar
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
        alignItems: "center",
    },
    textInput: {
        fontSize: 19,
        marginHorizontal: 35,
        fontFamily: 'Montserrat-Regular',
        borderBottomWidth: 2,
        borderColor: "#87CEFA",
        marginTop: "2%",
    },
    viewInput: {
        paddingHorizontal: "3%",
        height: '8%'
    },
    containerButton:{
        paddingTop: '12%',
        alignItems: 'center',
    },
    button: {
        backgroundColor:'#87CEFA',
        width: 253,
        height: "32%"
    },
    textButton: {
        textAlign:'center',
        fontWeight: '100',
        fontSize: 20,
        alignItems: "center",
        padding: 12,
        fontFamily: 'Montserrat-Regular'
    },
    errorText: {
        color: 'red',
        fontFamily: 'Montserrat-Medium'
    },
    registerText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 30
    },
    registerContainer: {
        paddingLeft: '13%',
        top: "-2%"
    },
});

export default Register;
