import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { format, parseISO } from 'date-fns';

const StressCard = ({ item }) =>{
    return(
        <View style={styles.stressCard}>
            <View style={styles.fellingItem}>
                <View style={styles.fellingItemHeader}>
                    <Text style={styles.date}>Seu estresse dia {format(parseISO(item.data.createdAt), "dd/MM/yyyy 'ás' HH:mm'h")}</Text> 
                    {/* <Text style={styles.stress}>{item.stress}</Text> */}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fellingItem: {
        padding: 10,
    },
    fellingItemHeader:{
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date:{
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#87CEFA',
    },
    stress:{
        borderRadius: 50,
        width: 30,
        height: 30,
        padding: 6,
        backgroundColor: '#87CEFA',
        borderStyle: 'solid',
        borderWidth:1,
        color: '#ffffff',
        textAlign: 'center',
        fontSize:16,
    }, 
    stressCard:{
        borderStyle: 'solid',
        borderWidth:1,
        borderRadius: 8,
        margin:10,
    }
});

export default StressCard;