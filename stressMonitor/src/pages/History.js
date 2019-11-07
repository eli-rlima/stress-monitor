// Global
import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity, 
    ScrollView, Image, FlatList } from 'react-native';
import * as _ from 'lodash';
import { DrawerActions } from 'react-navigation-drawer'
import AsyncStorage from '@react-native-community/async-storage';
import { isAfter, parseISO } from 'date-fns';
// Assets
import Logo from '../assets/Logo';
import Menu from '../assets/Menu';
// Api
import Api from '../api';
import StressCard from '../components/StressCard';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stresses: [],
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

    initialState () {
        this.setState({
            stresses: [],
        });
    }

    componentDidMount() {
        this.initialState();
        AsyncStorage.getItem('user').then(user => {
            const currentUser = user;
            const stresses = [];
            Api.database().ref('Stresses/').on("value", payload => {
                payload.forEach(stress => {
                    if (stress.val().uid === currentUser) {
                        const stressL = {
                            key: stress.key,
                            data: stress.val()
                        }
                        stresses.push(stressL);
                    }
                });
                this.setState({ stresses: stresses });
            }, error => {
                console.log(error);
            });
        });
    };

    render() {
        let { stresses } = this.state;
        let stressesU = _.uniqWith(stresses, _.isEqual);
        stressesU.sort(function(a, b) {
            if (isAfter(parseISO(a.data.createdAt), parseISO(b.data.createdAt))) {
                return -1;
            }else {
                return 1;
            }                    
        });
        return (
            <Fragment>
                <StatusBar backgroundColor="#87CEFA" />
                <SafeAreaView>
                    <View style={{height: '100%'}}>
                        <View style={styles.hearder}>
                            <Text style={styles.text}>Hitórico de Estresse</Text>
                        </View>
                        <FlatList
                            data={stressesU}
                            keyExtractor={stress => stress.key}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {}}>
                                    <StressCard style={styles.fellingCard} item={item}/>
                                </TouchableOpacity>
                            )}
                        ></FlatList>
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

export default History;
