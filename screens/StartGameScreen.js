import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions
} from "react-native";

import Colors from "../constants/colors";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import TextTitle from "../components/TextTitle";
import defaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";

function StartGameScreen(props) {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  function numberInputHandler(inputText) {
    setEnteredNumber(inputText.replace(/[^0-9]/g, ""));
  }

  function resetInputHandler() {
    setEnteredNumber("");
    setConfirmed(false);
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number", "Number has to be between 1 and 99", [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler},
      ]);
      return;
    }

    setConfirmed(true);
    setEnteredNumber("");
    setSelectedNumber(chosenNumber);
  }

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={{...styles.title, ...defaultStyles.titleText}}>The Game screen</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredNumber}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>
              <Button
                title="Reset"
                color={Colors.accent}
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Confirm"
                color={Colors.primary}
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  buttonView: {
    width: Dimensions.get('window').width / 4,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;
