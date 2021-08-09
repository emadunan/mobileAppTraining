import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import TextBody from "../components/TextBody";
import TextTitle from "../components/TextTitle";

function GameOverScreen(props) {
  return (
    <View style={styles.screen}>
      <TextTitle>The Game is OVER!</TextTitle>
      <Image source={require('../assets/img/success.png')}/>
      <TextBody>Number of rounds: {props.roundsNumber}</TextBody>
      <TextBody>Number was: {props.userNumber}</TextBody>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
