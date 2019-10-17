import {Svg, Path} from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const HomeIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <Path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M45 18L45 46 5 46 5 18"/>
        <Path fill="none" stropke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M19 46L19 27 31 27 31 46"/>
        <Path d="M35 6L35 9.016 37 11.094 37 8 39 8 39 13.203 41 15.266 41 6z"/>
        <Path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M2 20L25 2.053 48 20"/>
    </Svg>
);

const Home = () => (
    <View style={styles.container}>
        <HomeIcon /> 
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        backgroundColor: '#c6c6c6'
    }
});

export default Home;