import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

import Colors from "../constants/colors";

function MainButton(props) {
    return(
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'open-sans',
        fontSize: 18
    }
});
export default MainButton;