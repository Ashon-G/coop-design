import React, { useState, useEffect } from "react";
import { FlatList, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import styled from "styled-components/native";
import { Profile } from "../../types/Profile";
import { NavigationProp } from "@react-navigation/native";

interface Match {
  id: string;
  profile: Profile;
}

interface MatchesScreenProps {
  navigation: NavigationProp<any>; // Adjust based on your navigator setup
}

const MatchesScreen: React.FC<MatchesScreenProps> = ({ navigation }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    const user = auth.currentUser; // Get the current user

    if (!user) {
      Alert.alert("Not Authenticated", "Please log in to view matches.");
      return;
    }

    try {
      const q = query(
        collection(db, "matches"),
        where("user1", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      const matchPromises = querySnapshot.docs.map(async (docSnapshot) => {
        const matchedUserId = docSnapshot.data().user2;
        const userDocRef = doc(db, "profiles", matchedUserId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          return {
            id: docSnapshot.id,
            profile: userDoc.data() as Profile,
          };
        } else {
          console.error(`User profile not found for ID: ${matchedUserId}`);
          return null; // Handle user not found case
        }
      });

      const fetchedMatches = await Promise.all(matchPromises);
      setMatches(fetchedMatches.filter((match) => match !== null) as Match[]); // Filter out null values
    } catch (error) {
      console.error("Error fetching matches: ", error);
      Alert.alert("Error", "There was an error fetching matches.");
    }
  };

  const handleBlock = async (matchId: string, profileId: string) => {
    Alert.alert("Block User", "Are you sure you want to block this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Block",
        onPress: async () => {
          await deleteDoc(doc(db, "matches", matchId));
          await addDoc(collection(db, "blockedUsers"), {
            blocker: auth.currentUser?.uid, // Use optional chaining for safety
            blocked: profileId,
            timestamp: new Date(),
          });
          fetchMatches(); // Refresh the matches list
        },
      },
    ]);
  };

  const handleReport = async (profileId: string) => {
    Alert.alert("Report User", "Are you sure you want to report this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Report",
        onPress: async () => {
          await addDoc(collection(db, "reports"), {
            reporter: auth.currentUser?.uid, // Use optional chaining for safety
            reported: profileId,
            timestamp: new Date(),
          });
          Alert.alert(
            "Report Submitted",
            "Thank you for your report. We will review it shortly."
          );
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Match }) => (
    <MatchItem>
      <MatchImage
        source={{
          uri: item.profile.photoURL || "https://via.placeholder.com/50",
        }}
      />
      <MatchInfo>
        <MatchName>{item.profile.name}</MatchName>
        <MatchRole>{item.profile.role}</MatchRole>
      </MatchInfo>
      <ButtonsContainer>
        <ActionButton
          onPress={() =>
            navigation.navigate("Chat", {
              matchId: item.id,
              name: item.profile.name,
            })
          }
        >
          <ButtonText>Chat</ButtonText>
        </ActionButton>
        <ActionButton onPress={() => handleBlock(item.id, item.profile.id)}>
          <ButtonText>Block</ButtonText>
        </ActionButton>
        <ActionButton onPress={() => handleReport(item.profile.id)}>
          <ButtonText>Report</ButtonText>
        </ActionButton>
      </ButtonsContainer>
    </MatchItem>
  );

  return (
    <Container>
      <FlatList
        data={matches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props: { theme: { background: any } }) =>
    props.theme.background};
`;

const MatchItem = styled.View`
  flex-direction: row;
  padding: 15px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: { theme: { border: any } }) =>
    props.theme.border};
`;

const MatchImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

const MatchInfo = styled.View`
  flex: 1;
`;

const MatchName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props: { theme: { text: any } }) => props.theme.text};
`;

const MatchRole = styled.Text`
  font-size: 14px;
  color: ${(props: { theme: { secondaryText: any } }) =>
    props.theme.secondaryText};
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
`;

const ActionButton = styled.TouchableOpacity`
  padding: 5px 10px;
  background-color: ${(props: { theme: { primary: any } }) =>
    props.theme.primary};
  border-radius: 5px;
  margin-left: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 12px;
`;

export default MatchesScreen;
