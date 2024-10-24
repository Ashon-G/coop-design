import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const questions = [
  { id: 1, type: "text", question: "What's your name?" },
  { id: 2, type: "number", question: "How old are you?" },
  { id: 3, type: "date", question: "What is your birth date?" },
  { id: 4, type: "file", question: "Upload a profile picture" },
  {
    id: 5,
    type: "multiple-choice",
    question: "Choose your favorite color",
    options: ["Red", "Green", "Blue", "Yellow"],
  },
];

const Questionnaire: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [animation] = useState(new Animated.Value(0));
  const windowHeight = Dimensions.get("window").height;

  const slideUp = () => {
    Animated.timing(animation, {
      toValue: -windowHeight * (currentQuestionIndex + 1),
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    });
  };

  const slideDown = () => {
    Animated.timing(animation, {
      toValue: -windowHeight * (currentQuestionIndex - 1),
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    });
  };

  const handleInputChange = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = text;
    setAnswers(newAnswers);
  };

  const handleFileUpload = () => {
    // Placeholder for file upload logic
    setSelectedFile("file-uploaded-url"); // Simulating file upload
  };

  const handleMultipleChoice = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: animation }] }}>
        {questions.map((item, index) => (
          <View
            key={item.id}
            style={[styles.questionContainer, { height: windowHeight }]}
          >
            <Text style={styles.questionText}>{item.question}</Text>

            {item.type === "text" && (
              <TextInput
                style={styles.input}
                value={answers[currentQuestionIndex]}
                onChangeText={handleInputChange}
                placeholder="Type your answer here"
              />
            )}

            {item.type === "number" && (
              <TextInput
                style={styles.input}
                value={answers[currentQuestionIndex]}
                onChangeText={handleInputChange}
                placeholder="Enter a number"
                keyboardType="numeric"
              />
            )}

            {item.type === "date" && (
              <TextInput
                style={styles.input}
                value={answers[currentQuestionIndex]}
                onChangeText={handleInputChange}
                placeholder="YYYY-MM-DD"
              />
            )}

            {item.type === "file" && (
              <TouchableOpacity
                style={styles.fileUpload}
                onPress={handleFileUpload}
              >
                <Text style={styles.fileUploadText}>
                  {selectedFile ? "File Uploaded" : "Upload File"}
                </Text>
              </TouchableOpacity>
            )}

            {item.type === "multiple-choice" && item.options && (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={answers[currentQuestionIndex]}
                  onValueChange={(itemValue) => handleMultipleChoice(itemValue)}
                >
                  <Picker.Item label="Select an option" value="" />
                  {item.options.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                  ))}
                </Picker>
              </View>
            )}

            <View style={styles.buttonContainer}>
              {index > 0 && (
                <Button
                  title="Back"
                  onPress={slideDown}
                  disabled={currentQuestionIndex !== index}
                />
              )}
              <Button
                title={index === questions.length - 1 ? "Submit" : "Next"}
                onPress={slideUp}
                disabled={currentQuestionIndex !== index}
              />
            </View>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  questionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  questionText: { fontSize: 22, textAlign: "center", marginBottom: 20 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  fileUpload: {
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  fileUploadText: {
    color: "#007BFF",
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});

export default Questionnaire;
