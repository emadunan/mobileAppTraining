import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

import Colors from "../constants/colors";

function MainButton(props) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableNativeFeedback activeOpacity={0.7} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});
export default MainButton;
