// Global
import React, { Component, Fragment } from 'react';
import { StyleSheet, View, SafeAreaView , StatusBar, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import { CheckBox } from 'react-native-elements';
import * as _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import { format, parseISO } from 'date-fns';
// Assets
import Logo from '../assets/Logo';

class Stress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        }
    }

    static navigationOptions = () => ({
        headerTitle: (Logo),
    });

    render() {
        const { navigation } = this.props;
        const { stress, handleDelete } = navigation.state.params;

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
                                    Seu Estresse no dia {format(parseISO(stress.data.createdAt), "dd/MM/yyyy 'ás' HH:mm'h")}
                                </Text> 
                                <Spinner 
                                    visible={this.state.isVisible}
                                />
                            </View>
                            <View>
                                <View style={styles.columnLeft}>
                                    <CheckBox 
                                        title='Alteração no sono' 
                                        checked={stress.data.checkedSleep} 
                                        containerStyle={styles.containerLeft}
                                        checkedColor='black'
                                        textStyle={styles.line}
                                    />
                                    <CheckBox 
                                        title='Tensão Muscular' 
                                        checked={stress.data.checkedMuscle} 
                                        containerStyle={styles.containerLeft}
                                        checkedColor='black'
                                        textStyle={styles.line}
                                        
                                    />
                                    <CheckBox 
                                        title='Formigamentos' 
                                        checked={stress.data.checkedTingling} 
                                        containerStyle={styles.containerLeft}
                                        checkedColor='black'
                                        textStyle={styles.line}
                                        
                                    />
                                    <CheckBox 
                                        title='Palpitações' 
                                        checked={stress.data.checkedPalpitations} 
                                        containerStyle={styles.containerLeft}
                                        checkedColor='black'
                                        textStyle={styles.line}
                                        
                                    />
                                </View>
                                <View style={styles.columnRight}>
                                    <CheckBox 
                                        title='Desgaste muscular' 
                                        checked={stress.data.checkedMuscleWear} 
                                        containerStyle={styles.containerRight}
                                        checkedColor='black'
                                        textStyle={styles.line}
                                        
                                    />
                                    <CheckBox 
                                        title='Ansiedade' 
                                        checked={stress.data.checkedAnxiety} 
                                        containerStyle={styles.containerRight}
                                        checkedColor='black'
                                        textStyle={styles.line}
                                        
                                    />
                                    <CheckBox 
                                        title='Mudança no apetite' 
                                        checked={stress.data.checkedAppetite} 
                                        containerStyle={styles.containerRight}
                                        checkedColor='black'
                                        textStyle={styles.line}
                                        
                                    />
                                    <CheckBox 
                                        title='Alterações de humor' 
                                        checked={stress.data.checkedHumor} 
                                        containerStyle={styles.containerRight}
                                        checkedColor='black'
                                        textStyle={styles.line}
                                        
                                    />
                                </View>
                            </View>
                            <View style={styles.containerInput}>
                                <TextInput 
                                    style={styles.input}
                                    numberOfLines={11}
                                    textAlignVertical='top'
                                    value={stress.data.commenter}
                                    multiline
                                    editable={false}
                                />
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={handleDelete(stress)}
                                >
                                    <Text style={styles.textButton}>
                                        Deletar
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
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        borderColor: '#d3d3d3'
    },
    containerInput: {
        paddingHorizontal: 15,
        top: '7%',
    },
    button: {
        backgroundColor:'#d56d6d',
        width: "30%",
        height: "29%",
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
        padding: 12,
        fontFamily: 'Montserrat-Regular'
    },
    containerButton:{
        alignItems: 'center',
        top: '13%'
    },
    errorText: {
        color: 'red',
        fontFamily: 'Montserrat-SemiBold'
    },
    line: {
        fontFamily: 'Montserrat-Medium', 
        fontSize: 14, 
        fontWeight: '200'
    },
    columnRight: {
        justifyContent: "flex-start", 
        alignItems: "flex-end"
    },
    columnLeft: {
        justifyContent: "flex-start", 
        alignItems: "flex-start", 
        height: 0
    },
    containerLeft: {
        backgroundColor: 'transparent', 
        width: 150, 
        height: 30, 
        borderWidth: 0
    },
    containerRight: {
        backgroundColor: 'transparent', 
        width: 170, 
        height: 30, 
        borderWidth: 0
    },
    header: {
        top: '40%'
    }
});

export default Stress;
