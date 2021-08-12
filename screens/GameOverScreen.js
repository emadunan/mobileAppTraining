import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import TextBody from "../components/TextBody";
import TextTitle from "../components/TextTitle";
import MainButton from "../components/MainButton";

function GameOverScreen(props) {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TextTitle>The Game is OVER!</TextTitle>
        <Image
          source={require("../assets/img/success.png")}
          style={styles.image}
        />
        <TextBody style={styles.textRapper}>
          Your phone needed{" "}
          <Text style={styles.resultText}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.resultText}>{props.userNumber}</Text>
        </TextBody>

        {/* <TextBody>Number of rounds: {props.roundsNumber}</TextBody>
      <TextBody>Number was: {props.userNumber}</TextBody> */}

        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textRapper: {
    width: "70%",
    textAlign: "center",
  },
  resultText: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
  },
  image: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    overflow: "hidden",
    borderColor: "#000",
    borderWidth: 3,
    marginVertical: Dimensions.get("window").height / 20,
  },
});

export default GameOverScreen;
