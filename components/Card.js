import React from "react";
import { View, StyleSheet } from "react-native";
function Card(props) {
    return(
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 8,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 4
    }
})

export default Card;