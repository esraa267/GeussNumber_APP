import { Button, StyleSheet, Text, View } from "react-native";

const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Text>Number of rounds:{}</Text>
      <Text>Number was :{}</Text>
      <Button title="New Game" onPress={() => props.onStartGame(0)} />
    </View>
  );
};
export default GameOver;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
