import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity, 
    ScrollView } from 'react-native';
import * as _ from 'lodash';

import Frame from '../assets/Frame';

class Login extends Component {

    render() {
        return (
            <Fragment>
                <StatusBar backgroundColor="#87CEFA" />
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <Frame />
                            <Text style={styles.text}>
                                É muito importante que você envie as informações de estresse, 
                                só assim será possível a realização das análises e gerações
                                de relatórios.
                                {"\n\n"}Seja assíduo!
                            </Text>
                        </View>
                        <View style={styles.containerButton}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.textButton}>
                                    Enviar Estresse
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
        paddingHorizontal: 40,
        bottom: 250,
        fontFamily: "Montserrat"
        
    },
    button: {
        backgroundColor:'#87CEFA',
        width: 253,
        height: "30%"
    },
    textButton: {
        textAlign:'center',
        fontWeight: "bold",
        fontSize: 16,
        alignItems: "center",
        padding: 14
    },
    containerButton:{
        paddingVertical:30,
        alignItems: 'center',
        bottom: 100
    },
});

export default Login;
