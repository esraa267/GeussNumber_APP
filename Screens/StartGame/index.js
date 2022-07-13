import { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import NumberContainer from "../../Components/NumberContainer";
import colors from "../../Constants/colors";

const StartGame = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmedValue, setComfirmedValue] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const onChangeText = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  let ConfirmedOutPut;
  if (confirmedValue) {
    ConfirmedOutPut = (
      <Card style={styles.Container}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="START GAME"
          onPress={() => props.onStartGame(selectedNumber)}
        />
      </Card>
    );
  }
  const ResetHandler = () => {
    setEnteredValue("");
    setComfirmedValue(false);
  };
  const ConfirmHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number!", "Number has been between 1 and 99.", [
        { text: "Okay", style: "destructive", onPress: ResetHandler },
      ]);
      return;
    }
    setComfirmedValue(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(); //for 'IOS
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start New Game</Text>
        <Card style={styles.inputContainer}>
          <Text>Select number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            value={enteredValue}
            onChangeText={onChangeText}
          />
          <View style={styles.btnsContainer}>
            <View style={styles.btn}>
              <Button
                title="Reset"
                onPress={ResetHandler}
                color={colors.secondary}
              />
            </View>
            <View style={styles.btn}>
              <Button
                title="Confirm"
                onPress={ConfirmHandler}
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        {ConfirmedOutPut}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default StartGame;
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
    width: 300,
    maxwidth: "80%",
    alignItems: "center",
  },
  btnsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  btn: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  Container: {
    marginTop: 20,
    alignItems: "center",
  },
});
