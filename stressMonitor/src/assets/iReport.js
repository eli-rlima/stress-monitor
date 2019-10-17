import {Svg, Path} from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const Icon = () => (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M1 4.82353L11 1L21 4.82353M1 4.82353L11 9.23529M1 4.82353V17.1765L11 21M11 9.23529V21M11 9.23529L21 4.82353M11 21L21 17.1765V4.82353" stroke="black" stroke-linecap="square"/>
    </Svg>
);

const Report = () => (
    <View>
        <Icon />
    </View>
);

export default Report;
