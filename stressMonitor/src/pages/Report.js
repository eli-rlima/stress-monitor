// Global
import React, {Fragment, PureComponent} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity, 
    Picker, ScrollView } from 'react-native';
import * as _ from 'lodash';
import { DrawerActions } from 'react-navigation-drawer'
import AsyncStorage from '@react-native-community/async-storage';
import { parseISO, getMonth, isAfter, getYear } from 'date-fns';
import * as shape from 'd3-shape'
// lib
import Dictionary from '../lib/utils/Dictionary';
// Assets
import Frame from '../assets/Frame';
import Logo from '../assets/Logo';
import Menu from '../assets/Menu';
// Components
import Spinner from 'react-native-loading-spinner-overlay';
import { AreaChart, Grid } from 'react-native-svg-charts';
import { Circle, Path } from 'react-native-svg'
// Api
import firebase from 'react-native-firebase';
import Api from '../api';

class Main extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isVisisbleMonth: false,
            stresses: [],
            months: [],
            years: [],
            monthSelected: '',
            yearSelected: '',
            stressFilteredByMonth: [],
            stressFilteredByYear: [],
            stressesCount: [],
            stressesData: {},
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

    initialState() {
        this.setState({
            isVisible: false,
            isVisisbleMonth: false,
            stresses: [],
            months: [],
            years: [],
            monthSelected: '',
            yearSelected: '',
            stressFilteredByMonth: [],
            stressFilteredByYear: [],
            stressesCount: [],
            stressesData: {},
        });
    }

    componentDidMount() {
        this.initialState();
        this.setState({ isVisible: true });
        AsyncStorage.getItem('user').then(user => {
            const currentUser = user;
            let stresses = [];
            const years = [];
            Api.database().ref('Stresses/').on("value", payload => {
                payload.forEach(stress => {
                    if (stress.val().uid === currentUser) {
                        const stressN = {
                            key: stress.key,
                            data: stress.val()
                        }
                        stresses.push(stressN);
                        let numberYear = getYear(parseISO(stress.val().createdAt))
                        const year = {
                            year: numberYear,
                        }
                        years.push(year);
                    }
                });
                let yearsFiltered = _.uniqWith(years, _.isEqual);
                yearsFiltered.sort(function(a, b) {
                    if (a.year > b.year) {
                        return -1;
                    }else {
                        return 1;
                    }                    
                });
                this.setState({ years: yearsFiltered, stresses: stresses });
                this.setState({ isVisible: false });
                stresses = [];
            }, error => {
                this.setState({ isVisible: false });
                console.log(error);
            });
        });
    };

    handleYear = year => {
        if (year) {
            this.setState({ isVisible: true });
            AsyncStorage.getItem('user').then(user => {
                const currentUser = user;
                let stresses = [];
                const years = [];
                Api.database().ref('Stresses/').on("value", payload => {
                    payload.forEach(stress => {
                        if (stress.val().uid === currentUser) {
                            const stressN = {
                                key: stress.key,
                                data: stress.val()
                            }
                            stresses.push(stressN);
                            let numberYear = getYear(parseISO(stress.val().createdAt));
                            const year = {
                                year: numberYear,
                            }
                            years.push(year);
                        }
                    });
                    let yearsFiltered = _.uniqWith(years, _.isEqual);
                    yearsFiltered.sort(function(a, b) {
                        if (a.year > b.year) {
                            return -1;
                        }else {
                            return 1;
                        }                    
                    });
                    this.setState({ years: yearsFiltered, stresses: stresses });
                    stresses = [];
                    this.setState({ isVisible: false });
                }, error => {
                    this.setState({ isVisible: false });
                    console.log(error);
                });
            });
            const { stresses } = this.state;
            let stressFilteredByYear = stresses.filter(stress => getYear(parseISO(stress.data.createdAt)) === year);
            this.setState({ stressFilteredByYear: stressFilteredByYear });
            const months = [];
            stressFilteredByYear.map(stress => {
                let numberMonth = getMonth(parseISO(stress.data.createdAt));
                const month = {
                    name: Dictionary.get(numberMonth),
                    value: numberMonth,
                }
                months.push(month);
            });
            stressFilteredByYear = [];
            let monthsFiltered = _.uniqWith(months, _.isEqual);
            monthsFiltered.sort(function(a, b) {
                if (a.value > b.value) {
                    return -1;
                }else {
                    return 1;
                }                    
            });
            this.setState({ months: monthsFiltered, isVisisbleMonth: true });
        }
    }

    handleGenerate = (month, year) => () => {
        this.handleYear(year);
        const { stressFilteredByYear } = this.state;
        let stressFilteredByMonth = stressFilteredByYear.filter(stress => getMonth(parseISO(stress.data.createdAt)) === month);
        const countSymptoms = [];
        let spleepCount = 0;
        let muscleCount = 0;
        let tinglingCount = 0;
        let palpitationsCount = 0;
        let muscleWearCount = 0;
        let anxietyCount = 0;
        let appetiteCount = 0;
        let humorCount = 0;
        
        stressFilteredByMonth.forEach(stress => {
            let count = 0;
            if (stress.data.checkedSleep) {
                spleepCount += 1;
            }
            if (stress.data.checkedMuscle) {
                muscleCount += 1;
            }
            if (stress.data.checkedTingling) {
                tinglingCount += 1;
            }
            if (stress.data.checkedPalpitations) {
                palpitationsCount += 1;
            }
            if (stress.data.checkedMuscleWear) {
                muscleWearCount += 1;
            }
            if (stress.data.checkedAnxiety) {
                anxietyCount += 1;
            }
            if (stress.data.checkedAppetite) {
                appetiteCount += 1;
            }
            if (stress.data.checkedHumor) {
                humorCount += 1;
            }
            for (let key in stress.data) {
                if (typeof(stress.data[key]) === "boolean") {
                    if (stress.data[key]) {
                        count += 1;
                    }
                }
            }
            countSymptoms.push(count);
        });
        
        const stresses = {
            spleep: {name: 'Alteração no sono', count: spleepCount},
            muscle: {name: 'Tensão Muscular', count: muscleCount},
            tingling: {name: 'Formigamentos', count: tinglingCount},
            palpitations: {name: 'Palpitações', count: palpitationsCount},
            muscleWear: {name: 'Desgaste Muscular', count: muscleWearCount},
            anxiety: {name: 'Ansiedade', count: anxietyCount},
            appetite: {name: 'Mudança de Apetite', count: appetiteCount},
            humor: {name: 'Alterações de humor', count: humorCount},
        }
        this.setState({ stressesCount: countSymptoms, stressesData: stresses });
    }

    render() {
        const { months, years, stressesCount, stressesData } = this.state;
        const data = [];
        const stresses = [];

        stressesCount.forEach(stress => {
                data.push(stress);
        });

        for (let key in stressesData) {
            stresses.push(stressesData[key]);
        }

        const Line = ({ line }) => (
            <Path
                d={ line }
                stroke={ 'rgba(133, 205, 250)' }
                fill={ 'none' }
            />
        );

        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 4 }
                    stroke={ 'rgb(133, 205, 250)' }
                    fill={ 'white' }
                />
            ))
        };
        
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
                                            this.handleYear(item);
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
                                    style={{ height: 40, width: 150 }}
                                    onValueChange={(item) => {
                                            this.setState({ monthSelected: item });
                                        }
                                    }
                                    mode="dropdown"
                                    // enabled={this.state.isVisisbleMonth}
                                >
                                    {months.map(item => {
                                        return(<Picker.Item label={`${item.name}`} value={item.value} key={item.value} />);
                                    })}
                                </Picker>
                            </View>
                            <View style={{ justifyContent: "flex-start", alignItems: "flex-end", bottom: '35%', right: '5%' }}>
                                <TouchableOpacity 
                                    style={{ width: 90, height: 30, backgroundColor: 'rgba(133, 205, 250, 0.7)', borderRadius: 5 }}
                                    onPress={this.handleGenerate(this.state.monthSelected, this.state.yearSelected)}
                                    >
                                    <Text style={{ textAlign: "center", fontSize: 20, top: '12%', fontFamily: 'Montserrat-Regular' }}>
                                        Gerar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ paddingVertical: '2%' }}>
                            {data.length > 0
                            && <View style={{ padding: '3%' }}>
                                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, textDecorationLine: 'underline', textAlign: 'center', paddingBottom: '1%' }}>
                                        Quantidade de vezes que o sintomas surgiram durante o mês
                                    </Text>
                                    {stresses.map(stress => {
                                        return (
                                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, paddingBottom: 2 }} key={stress.name}>{stress.name}: {stress.count}</Text>
                                        );
                                    })}
                                </View>}
                                {data.length > 3 && <View>
                                    <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
                                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, textDecorationLine: 'underline', textAlign: 'center' }}>
                                            Curva da quantidade sintomas por estresse
                                        </Text>
                                    </View>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <AreaChart
                                            style={{ height: 200 }}
                                            data={ data }
                                            curve={shape.curveCardinal}
                                            svg={{ fill: 'rgba(133, 205, 250, 0.2)' }}
                                            contentInset={{ top: 20, bottom: 30 }}
                                        >
                                            <Line/>
                                            <Decorator/>
                                        </AreaChart>
                                    </View>
                                </View>}
                            </View>
                        </ScrollView>
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
