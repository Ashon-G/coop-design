import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { useTheme } from "../../components/ThemeProvider";
import { RouteProp, useRoute } from "@react-navigation/native";

// Define the expected type of your route parameters
type ChatScreenRouteProp = RouteProp<
  { ChatScreen: { matchId: string } },
  "ChatScreen"
>;

const ChatScreen: React.FC = () => {
  const auth = getAuth();
  const db = getFirestore();
  const route = useRoute<ChatScreenRouteProp>(); // Use the typed route here
  const { matchId } = route.params; // Now TypeScript recognizes matchId

  useEffect(() => {
    if (!matchId) {
      Alert.alert("Error", "No match ID provided.");
      return;
    }

    const fetchMessages = async () => {
      const q = query(
        collection(db, "messages"),
        where("matchId", "==", matchId)
      );
      const querySnapshot = await getDocs(q);
      // Handle the fetched data
    };

    fetchMessages();
  }, [matchId, db]);

  return (
    <View style={styles.container}>
      <Text>Chat Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default ChatScreen;
