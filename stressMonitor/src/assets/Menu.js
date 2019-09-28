import {Svg, Path} from 'react-native-svg';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const Content = () => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fill-rule="evenodd" 
            clip-rule="evenodd"
            d="M3.5 18H21.5V16H3.5V18ZM3.5 13H21.5V11H3.5V13ZM3.5 6V8H21.5V6H3.5Z" 
            fill="black"/>
    </Svg>
);

const Menu = () => (
    <View style={styles.menuContainer}>
        <TouchableOpacity>
            <Content />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    menuContainer: {
        marginRight: 20
    },
});

export default Menu;