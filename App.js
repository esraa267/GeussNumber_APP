import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./Components/Header";
import StartGame from "./Screens/StartGame";
import GameScreen from "./Screens/GameScreen";
import GameOver from "./Screens/GameOver";
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [isOver, setIsOver] = useState(false);
  const [count, setCount] = useState(false);

  const StartGameHandler = (selectednum) => {
    setUserNumber(selectednum);
    setIsOver(false);
  };
  let content;
  if (userNumber && !isOver) {
    content = (
      <GameScreen
        userchoise={userNumber}
        onGameOver={() => {
          setIsOver(true);
        }}
        onCount={() => {
          setCount((count) => count + 1);
        }}
      />
    );
  } else if (userNumber && isOver) {
    content = <GameOver count={count} userChoise={userNumber} onStartGame={StartGameHandler} />;
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
