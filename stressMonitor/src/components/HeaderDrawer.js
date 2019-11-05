import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';

import Logo from '../assets/Logo';

const HeaderDrawer = props => (
    <SafeAreaView>
        <View style={styles.container}>
            <Logo />
        </View>
        <ScrollView>
            <DrawerNavigatorItems {...props} />
        </ScrollView>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default HeaderDrawer;