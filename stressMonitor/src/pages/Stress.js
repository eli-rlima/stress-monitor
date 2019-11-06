// Global
import React, { Component, Fragment } from 'react';
import { StyleSheet, View, SafeAreaView , StatusBar, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import { CheckBox } from 'react-native-elements';
import * as _ from 'lodash';
import { DrawerActions } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
// Api
import Api from '../api';
// Assets
import Logo from '../assets/Logo';
import Menu from '../assets/Menu';
import Spinner from 'react-native-loading-spinner-overlay';

class Stress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedSpleep: false,
            checkedMuscle: false,
            checkedTingling: false,
            checkedPalpitations: false,
            checkedMuscleWear: false,
            checkedAnxiety: false,
            checkedAppetite: false,
            checkedHumor: false,
            commenter: '',
            isVisible: false,
            error: false,
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (Logo),
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Menu />
            </TouchableOpacity>
        )
    });

    initialState = () => {
        this.setState({
            checkedSpleep: false,
            checkedMuscle: false,
            checkedTingling: false,
            checkedPalpitations: false,
            checkedMuscleWear: false,
            checkedAnxiety: false,
            checkedAppetite: false,
            checkedHumor: false,
            commenter: '',
            isVisible: false,
            error: false,
        });
    }

    createStress = () => {
        const { checkedMuscle, checkedSpleep, checkedAnxiety, checkedAppetite, checkedHumor
            , checkedMuscleWear, checkedPalpitations, checkedTingling, commenter } = this.state;
        AsyncStorage.getItem('user').then(user => {
            this.setState({ isVisible: true });
            const currentUser = user;
            if (!checkedMuscle && !checkedSpleep && !checkedAnxiety && !checkedAppetite 
                && !checkedHumor && !checkedMuscleWear && !checkedPalpitations && !checkedTingling) {
                this.setState({ isVisible: false });
                this.setState({ error: true });
            } else {
                this.setState({ error: false });
                Api.database().ref('Stresses/').push({
                    checkedAnxiety,
                    checkedMuscle,
                    checkedSpleep,
                    checkedAppetite,
                    checkedHumor, 
                    checkedMuscleWear,
                    checkedPalpitations,
                    checkedTingling,
                    commenter,
                    uid: currentUser,
                }).then(payload => {
                    this.initialState();
                    this.props.navigation.navigate('History');
                    console.log(payload);
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    }

    createCommenter = event => {
        event.persist();
        this.setState({commenter: event.nativeEvent.text});
    }

    render() {
        return (
            <Fragment>
                <StatusBar backgroundColor="#87CEFA" />
                <SafeAreaView>
                    <KeyboardAvoidingView
                            behavior='position'
                            enabled
                        >
                        <View>
                            <View style={styles.container}>
                                <Text style={styles.text}>
                                    Marque se você sentiu algum desses sintomas:
                                </Text> 
                                <Spinner 
                                    visible={this.state.isVisible}
                                />                   
                                <View style={{top: '40%'}}>
                                    {this.state.error 
                                    ? <Text style={styles.errorText}>Preencha os campos adequadamente</Text> 
                                    : <Text></Text>}
                                </View>
                            </View>
                            <View>
                                <View style={{justifyContent: "flex-start", alignItems: "flex-start", height: 0}}>
                                    <CheckBox 
                                        title='Alteração no sono' 
                                        checked={this.state.checkedSpleep} 
                                        onPress={() => {this.setState({checkedSpleep: !this.state.checkedSpleep})}}
                                        containerStyle={{backgroundColor: 'transparent', width: 150, height: 30, borderWidth: 0}}
                                        checkedColor='black'
                                        textStyle={{fontFamily: 'Montserrat-Medium', fontSize: 14, fontWeight: '200'}}
                                    />
                                    <CheckBox 
                                        title='Tensão Muscular' 
                                        checked={this.state.checkedMuscle} 
                                        onPress={() => {this.setState({checkedMuscle: !this.state.checkedMuscle})}}
                                        containerStyle={{backgroundColor: 'transparent', width: 150, height: 30, borderWidth: 0}}
                                        checkedColor='black'
                                        textStyle={{fontFamily: 'Montserrat-Medium', fontSize: 14, fontWeight: '200'}}
                                    />
                                    <CheckBox 
                                        title='Formigamentos' 
                                        checked={this.state.checkedTingling} 
                                        onPress={() => {this.setState({checkedTingling: !this.state.checkedTingling})}}
                                        containerStyle={{backgroundColor: 'transparent', width: 150, height: 30, borderWidth: 0}}
                                        checkedColor='black'
                                        textStyle={{fontFamily: 'Montserrat-Medium', fontSize: 14, fontWeight: '200'}}
                                    />
                                    <CheckBox 
                                        title='Palpitações' 
                                        checked={this.state.checkedPalpitations} 
                                        onPress={() => {this.setState({checkedPalpitations: !this.state.checkedPalpitations})}}
                                        containerStyle={{backgroundColor: 'transparent', width: 150, height: 30, borderWidth: 0}}
                                        checkedColor='black'
                                        textStyle={{fontFamily: 'Montserrat-Medium', fontSize: 14, fontWeight: '200'}}
                                    />
                                </View>
                                <View style={{justifyContent: "flex-start", alignItems: "flex-end"}}>
                                    <CheckBox 
                                        title='Desgaste muscular' 
                                        checked={this.state.checkedMuscleWear} 
                                        onPress={() => {this.setState({checkedMuscleWear: !this.state.checkedMuscleWear})}}
                                        containerStyle={{backgroundColor: 'transparent', width: 150, height: 30, borderWidth: 0}}
                                        checkedColor='black'
                                        textStyle={{fontFamily: 'Montserrat-Medium', fontSize: 14, fontWeight: '200'}}
                                    />
                                    <CheckBox 
                                        title='Ansiedade' 
                                        checked={this.state.checkedAnxiety} 
                                        onPress={() => {this.setState({checkedAnxiety: !this.state.checkedAnxiety})}}
                                        containerStyle={{backgroundColor: 'transparent', width: 150, height: 30, borderWidth: 0}}
                                        checkedColor='black'
                                        textStyle={{fontFamily: 'Montserrat-Medium', fontSize: 14, fontWeight: '200'}}
                                    />
                                    <CheckBox 
                                        title='Mudança no apetite' 
                                        checked={this.state.checkedAppetite} 
                                        onPress={() => {this.setState({checkedAppetite: !this.state.checkedAppetite})}}
                                        containerStyle={{backgroundColor: 'transparent', width: 150, height: 30, borderWidth: 0}}
                                        checkedColor='black'
                                        textStyle={{fontFamily: 'Montserrat-Medium', fontSize: 14, fontWeight: '200'}}
                                    />
                                    <CheckBox 
                                        title='Alterações de humor' 
                                        checked={this.state.checkedHumor} 
                                        onPress={() => {this.setState({checkedHumor: !this.state.checkedHumor})}}
                                        containerStyle={{backgroundColor: 'transparent', width: 150, height: 30, borderWidth: 0}}
                                        checkedColor='black'
                                        textStyle={{fontFamily: 'Montserrat-Medium', fontSize: 14, fontWeight: '200'}}
                                    />
                                </View>
                            </View>
                            <View style={styles.containerInput}>
                                <TextInput 
                                    placeholder='adicione um comentário de como foi o seu dia' 
                                    style={styles.input}
                                    numberOfLines={10}
                                    textAlignVertical='top'
                                    value={this.state.commenter}
                                    onChange={this.createCommenter}
                                    multiline
                                />
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.createStress}
                                >
                                    <Text style={styles.textButton}>
                                        Enviar Estresse
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Fragment>
        );     
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: '5%',
    },
    text: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        fontSize: 18,
    },
    containerInput: {
        paddingHorizontal: 15,
        top: '7%',
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
        alignItems: 'center',
        top: '12%'
    },
    errorText: {
        color: 'red',
        fontFamily: 'Montserrat-SemiBold'
    },
});

export default Stress;
