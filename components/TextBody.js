import React from "react";
import {Text, StyleSheet} from "react-native";

function TextBody(props) {
  return <Text style={{...props.style, ...styles.textBody}}>{props.children}</Text>
}

const styles = StyleSheet.create({
  textBody: {
    fontFamily: 'open-sans',
    color: '#00f'
  }
})

export default TextBody;