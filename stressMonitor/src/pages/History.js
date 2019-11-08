// Global
import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity, 
    ScrollView, Image, FlatList } from 'react-native';
import * as _ from 'lodash';
import { DrawerActions } from 'react-navigation-drawer'
import AsyncStorage from '@react-native-community/async-storage';
import { isAfter, parseISO } from 'date-fns';
import { Tooltip } from 'react-native-elements';
// Assets
import Logo from '../assets/Logo';
import Menu from '../assets/Menu';
import StressCard from '../components/StressCard';
import Spinner from 'react-native-loading-spinner-overlay';
// Api
import Api from '../api';
import { Icon } from 'react-native-vector-icons/AntDesign';
import teste from '../assets/delete.png';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stresses: [],
            isVisible: false
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
            isVisible: false,
        });
    }

    handleDelete = stress => () => {
        Api.database().ref('Stresses/').child(stress.key).remove().then(() => {
            AsyncStorage.getItem('user').then(user => {
                this.setState({ isVisible: true });
                const currentUser = user;
                const stresses = [];
                Api.database().ref('Stresses/').on("value", payload => {
                    payload.forEach(stress => {
                        if (stress.val().uid === currentUser) {
                            const stressN = {
                                key: stress.key,
                                data: stress.val()
                            }
                            stresses.push(stressN);
                        }
                    });
                    this.setState({ stresses: stresses });
                    this.setState({ isVisible: false });
                }, error => {
                    this.setState({ isVisible: false });
                    console.log(error);
                });
            });
        });
    }


    componentDidMount() {
        this.initialState();
        AsyncStorage.getItem('user').then(user => {
            this.setState({ isVisible: true });
            const currentUser = user;
            const stresses = [];
            Api.database().ref('Stresses/').on("value", payload => {
                payload.forEach(stress => {
                    if (stress.val().uid === currentUser) {
                        const stressN = {
                            key: stress.key,
                            data: stress.val()
                        }
                        stresses.push(stressN);
                    }
                });
                this.setState({ stresses: stresses });
                this.setState({ isVisible: false });
            }, error => {
                this.setState({ isVisible: false });
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
                        <Spinner 
                            visible={this.state.isVisible}
                        />  
                        <FlatList
                            data={stressesU}
                            keyExtractor={stress => stress.key}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {}}>
                                    <Tooltip 
                                        popover={
                                            <TouchableOpacity 
                                                style={{display: "flex", justifyContent: 'space-between', width: '100%', height:'100%'}}
                                                onPress={this.handleDelete(item)}
                                            >
                                                <Text style={{fontSize: 16, fontFamily: 'Montserrat-Regular'}}>Excluir</Text>
                                                <Image source={teste} style={{width: 15, height: 15, left: '85%', bottom: '90%'}} />
                                            </TouchableOpacity>} 
                                        backgroundColor='rgba(207, 89, 89, 0.8)'  
                                        overlayColor='rgba(255, 255, 255, 0.95)'
                                        width={100}
                                        height={37}
                                    >
                                        <StressCard style={styles.fellingCard} item={item}/>
                                    </Tooltip>
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
