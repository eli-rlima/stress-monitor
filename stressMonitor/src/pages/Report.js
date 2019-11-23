// Global
import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity, 
    Picker } from 'react-native';
import * as _ from 'lodash';
import { DrawerActions } from 'react-navigation-drawer'
import AsyncStorage from '@react-native-community/async-storage';
import { parseISO, getMonth } from 'date-fns';
import Dictionary from '../lib/utils/Dictionary';
// Assets
import Frame from '../assets/Frame';
import Logo from '../assets/Logo';
import Menu from '../assets/Menu';
// Components
import Spinner from 'react-native-loading-spinner-overlay';
// Api
import firebase from 'react-native-firebase';
import Api from '../api';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            stresses: [],
            months: [],
            monthSelected: '',
        }
    };

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (Logo),
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Menu />
            </TouchableOpacity>
        )
    });

    componentDidMount() {
        this.setState({ isVisible: true });
        AsyncStorage.getItem('user').then(user => {
            const currentUser = user;
            const stresses = [];
            const months = [];
            Api.database().ref('Stresses/').on("value", payload => {
                payload.forEach(stress => {
                    if (stress.val().uid === currentUser) {
                        const stressN = {
                            key: stress.key,
                            data: stress.val()
                        }
                        stresses.push(stressN);
                        let numberMonth = getMonth(parseISO(stress.val().createdAt));
                        const month = {
                            name: Dictionary.get(numberMonth),
                            value: numberMonth
                        }
                        months.push(month);
                    }
                });
                this.setState({ months: months });
                this.setState({ stresses: stresses });
                this.setState({ isVisible: false });
            }, error => {
                this.setState({ isVisible: false });
                console.log(error);
            });
        });
    };

    handleMonth = month => {
        const { data } = this.state.stresses;
    }

    render() {
        const { months } = this.state;
        
        return (
            <Fragment>
                <StatusBar backgroundColor="#87CEFA" />
                <SafeAreaView>
                    <View style={{ height: '100%' }}>
                        <View style={styles.hearder}>
                            <Text style={styles.text}>Relatórios</Text>
                        </View>
                        <Spinner 
                            visible={this.state.isVisible}
                        />
                        <View>
                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start", height: 0, top: '26%', left: '10%' }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20 }}>
                                    Mês:
                                </Text>
                            </View>
                            <View style={{ justifyContent: "flex-start", alignItems: "center", top: '10%' }}>
                                <Picker
                                    selectedValue={this.state.monthSelected}
                                    style={{height: 50, width: 150 }}
                                    onValueChange={(item) => {
                                            this.setState({ monthSelected: item });
                                        }
                                    }
                                    mode="dropdown"
                                >
                                    {months.map(item => {
                                        return(<Picker.Item label={`${item.name}`} value={item.value} key={item.value} />);
                                    })}
                                </Picker>
                            </View>
                            <View style={{ justifyContent: "flex-start", alignItems: "flex-end", bottom: '40%', right: '3%' }}>
                                <TouchableOpacity style={{ width: 90, height: 30, backgroundColor: 'rgba(133, 205, 250, 0.7)', borderRadius: 5 }}>
                                    <Text style={{textAlign: "center", fontSize: 20, top: '12%'}}>
                                        Gerar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        paddingVertical: 15,
        fontFamily: 'Montserrat-SemiBold'
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
    hearder: {
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: 'rgba(133, 205, 250, 0.6)'
    }
});

export default Main;
