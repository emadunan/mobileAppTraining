import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../components/MainButton";
import TextBody from "../components/TextBody";
import * as ScreenOrientation from "expo-screen-orientation";

function generateRandomBetween(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

function renderListItem(listLength, itemData) {
  return (
    <View key={itemData.item} style={styles.listItem}>
      <TextBody>#{listLength - itemData.index}</TextBody>
      <TextBody>{itemData.item}</TextBody>
    </View>
  );
}

function GameScreen(props) {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initGuess);

  const [pastGuesses, setPastGuesses] = useState([initGuess]);

  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

  const currentLow = useRef(1);
  const currentHight = useRef(100);

  useEffect(() => {

    const updateLayout = () => {
      setDeviceWidth(Dimensions.get('window').width);
      setDeviceHeight(Dimensions.get('window').height);
    }

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });


  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHight.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHight.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPastGuesses((prev) => [nextNumber, ...prev]);
  }

  let listContainerStyles = styles.listContainer;
  if (deviceWidth < 300) {
    listContainerStyles = styles.listContainerSmall;
  }

  if (deviceHeight < 600) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's guess</Text>
        <View style={{width: '80%', flexDirection: 'row', justifyContent: 'space-around'}}>
          <MainButton style={styles.buttonLandscape} onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="black" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton style={styles.buttonLandscape} onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="black" />
          </MainButton>
        </View>

        <View style={listContainerStyles}>

          <FlatList
            keyExtractor={(item) => item.toString()}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="black" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="black" />
        </MainButton>
      </Card>
      <View style={listContainerStyles}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, (pastGuesses.length - index)))}
        </ScrollView> */}

        <FlatList
          keyExtractor={(item) => item.toString()}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%",
  },
  buttonLandscape: {
    margin: 12
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  listContainerSmall: {
    flex: 1,
    width: "100%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});

export default GameScreen;
