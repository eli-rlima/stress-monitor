// Global
import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity, 
    Picker } from 'react-native';
import * as _ from 'lodash';
import { DrawerActions } from 'react-navigation-drawer'
import AsyncStorage from '@react-native-community/async-storage';
import { parseISO, getMonth, isAfter, getYear } from 'date-fns';
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
            years: [],
            monthSelected: '',
            yearSelected: '',
            stressFiltered: [],
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
            const years = [];
            Api.database().ref('Stresses/').on("value", payload => {
                payload.forEach(stress => {
                    if (stress.val().uid === currentUser) {
                        const stressN = {
                            key: stress.key,
                            data: stress.val()
                        }
                        stresses.push(stressN);
                        let numberMonth = getMonth(parseISO(stress.val().createdAt));
                        let numberYear = getYear(parseISO(stress.val().createdAt))
                        const month = {
                            name: Dictionary.get(numberMonth),
                            value: numberMonth,
                        }
                        months.push(month);
                        const year = {
                            year: numberYear,
                        }
                        years.push(year);
                    }
                });
                const monthsFiltered = _.uniqWith(months, _.isEqual);
                const yearsFiltered = _.uniqWith(years, _.isEqual);
                this.setState({ months: monthsFiltered, years: yearsFiltered, stresses: stresses });
                this.setState({ isVisible: false });
            }, error => {
                this.setState({ isVisible: false });
                console.log(error);
            });
        });
    };

    handleMonth = month => () => {
        const { stresses } = this.state;
        const stressFiltered = stresses.filter(stress => getMonth(parseISO(stress.data.createdAt)) === month);
        this.setState({ stressFiltered: stressFiltered });
    }

    render() {
        const { months, years } = this.state;
        
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
                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start", height: 0, top: '20%', left: '5%' }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20 }}>
                                    Ano:
                                </Text>
                            </View>
                            <View style={{ justifyContent: "flex-start", alignItems: "center", top: '13%', right: '5%' }}>
                                <Picker
                                    selectedValue={this.state.yearSelected}
                                    style={{height: 40, width: 150 }}
                                    onValueChange={(item) => {
                                            this.setState({ yearSelected: item });
                                        }
                                    }
                                    mode="dropdown"
                                >
                                    {years.map(item => {
                                        return(<Picker.Item label={`${item.year}`} value={item.year} key={item.year} />);
                                    })}
                                </Picker>
                            </View>
                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start", height: 0, top: '20%', left: '5%' }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20 }}>
                                    Mês:
                                </Text>
                            </View>
                            <View style={{ justifyContent: "flex-start", alignItems: "center", top: '13%', right: '5%' }}>
                                <Picker
                                    selectedValue={this.state.monthSelected}
                                    style={{height: 40, width: 150 }}
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
                            <View style={{ justifyContent: "flex-start", alignItems: "flex-end", bottom: '35%', right: '5%' }}>
                                <TouchableOpacity 
                                    style={{ width: 90, height: 30, backgroundColor: 'rgba(133, 205, 250, 0.7)', borderRadius: 5 }}
                                    onPress={this.handleMonth(this.state.monthSelected)}
                                    >
                                    <Text style={{ textAlign: "center", fontSize: 20, top: '12%', fontFamily: 'Montserrat-Regular' }}>
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
