import { useEffect, useRef, useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import NumberContainer from "../../Components/NumberContainer";
import Card from "../../Components/Card";
function generateRandom(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNUM = Math.floor(Math.random() * (max - min)) + min;
  if (rndNUM === exclude) {
    return generateRandom(min, max, exclude);
  } else {
    return rndNUM;
  }
}
const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandom(1, 100, props.userchoise)
  );
  const currentLower = useRef(1);
  const currentGreater = useRef(100);
  const nextGuessNumber = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userchoise) ||
      (direction === "greater" && currentGuess > props.userchoise)
    ) {
      Alert.alert("Do not lie");
      return;
    }
    if (direction === "lower") {
      currentGreater.current = currentGuess;
    } else {
      currentLower.current = currentGuess;
    }
    let nextNumber = generateRandom(
      currentLower.current,
      currentGreater.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    props.onCount()
  };
  useEffect(() => {
    if (currentGuess === props.userchoise) {
      props.onGameOver(true);
    }
  }, [currentGuess]);
  return (
    <View style={styles.screen}>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <Button
          title="LOWER"
          onPress={() => {
            nextGuessNumber("lower");
          }}
        />
        <Button
          title="GREATER"
          onPress={() => {
            nextGuessNumber("greater");
          }}
        />
      </Card>
    </View>
  );
};
export default GameScreen;
const styles = StyleSheet.create({
  screen: { flex: 1, padding: 10, alignItems: "center" },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
