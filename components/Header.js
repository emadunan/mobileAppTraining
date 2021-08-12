import React from "react";
import { StyleSheet, View, Text, Platform} from "react-native";

import Colors from "../constants/colors";

function Header(props) {
    return(
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerAndroid: {
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerIOS: {
        backgroundColor: Colors.primary
    },
    headerTitle: {
        color: Platform.OS === 'android' ? '#f00' : '#000',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
})

export default Header;