import {Svg, Ellipse, Line, Path} from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const Content = () => (
    <Svg width="299" height="310" viewBox="0 0 299 310" fill="none" xmlns="http://www.w3.org/2000/Svg">
        <Ellipse cx="139" cy="121" rx="76" ry="77" fill="#87CEFA" fill-opacity="0.5"/>
        <Line x1="138.776" y1="249.553" x2="254.776" y2="191.553" stroke="#87CEFA" stroke-opacity="0.5"/>
    </Svg>
);

const Frame = () => (
    <View style={styles.container}>
        <Content />
    </View>
);

const styles = StyleSheet.create({
    container:{
        paddingTop: "10%",
        paddingLeft: "20%",
        opacity: 0.4
    }
});

export default Frame;
