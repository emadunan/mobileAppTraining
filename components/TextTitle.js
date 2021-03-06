import React from "react";
import {Text, StyleSheet} from "react-native";

function TextTitle(props) {
  return <Text style={{...styles.title, ...props.style}}>{props.children}</Text>
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22
  }
});

export default TextTitle;