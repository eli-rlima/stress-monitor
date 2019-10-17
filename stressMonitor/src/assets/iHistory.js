import {Svg, Image, Pattern, Use, Defs, Rect} from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import React from 'react';


const Icon = () => (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns xlink="http://www.w3.org/1999/xlink">
        <Rect width="25" height="25" fill="url(#pattern0)"/>
        <Defs>
        <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <Use xlink href="#image0" transform="scale(0.0125)"/>
        </Pattern>
        <Image id="image0" width="80" height="80" xlink href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAQAAAAkGDomAAAAAmJLR0QA/4ePzL8AAAITSURBVGje7Zq9ThRRFMd/TCIJaGXgIQhPIWgvFGBgX0A+XHsqt0WhgycAHoCGwgpCaURIEAIa8QmQDWa2MH+LXcdlmLkszOfCOVPc3MnJmd/OOfd/bu4smJmZmZl1tSmH6/4DZp0hAzRAAzRAAzTA0gF6VKjQU17ACkJM33JDYYD/rYdppsqcYlvFBmg6aDpoOmir2ABNB00Hu0QHi68RA3x4gDu3Oh7eyV8HcwFMKjOd5KXD3HUpYFIdTPEDRTaruCsAM02xARYNeInod3o8RtSLA/yGGHJ6DCNOigNcR8w6PeYRa0lF4O6fXScRX/Bas91WQ9sNGpvHAWKiOMBezhAzQXfevjLCHOIHj/JMazjmGMJnNNL3BQ3Ey3zr7nrMD4gG861E/0uvxxsaiMWbg4UrI9l4HdDjPUIcUQ3S+5ZjhFh09/lmsHBlJBujs7Iaqs7mbKUIaYl6g8sIcUg1uFflK0IsBSs80i4QT1IGrCOeXrmzjPCZDaF4zOEjllzBPiOepQy4h3jeNh9H+DFPGcVHjMUHqyE2UwasIbbadPAn4nWs9wziLF4HB/mFWEgVcJBzRK01e4XYc3aSfcRkfLhx/iA2GUmxFpsxPwKw0dZHojpJs5esu8OdZ9jwvne0mzl1/+IB3vGJeiaAvxF9TnnvR1yW4bwiTt4LPnRJccv/gAEz/2fhvQe0GizJAWbhgH8BqnXynkt/w48AAAAASUVORK5CYII="/>
        </Defs>
    </Svg>
);

const History = () => (
    <View>
        <Icon />
    </View>
);

export default History;
