import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./Components/Header";
import StartGame from "./Screens/StartGame";
import GameScreen from "./Screens/GameScreen";
import GameOver from "./Screens/GameOver";
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [isOver, setIsOver] = useState(false);
  const StartGameHandler = (selectednum) => {
    setUserNumber(selectednum);
  };
  let content;
  if (userNumber && !isOver) {
    content = (
      <GameScreen
        userchoise={userNumber}
        onGameOver={(res) => {
          if (res) setIsOver(true);
        }}
      />
    );
  } else if (userNumber && isOver) {
    content = <GameOver onStartGame={StartGameHandler} />;
  } else {
    content = <StartGame onStartGame={StartGameHandler} />;
  }
  return (
    <View style={styles.container}>
      <Header title="Guess Number" />

      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
