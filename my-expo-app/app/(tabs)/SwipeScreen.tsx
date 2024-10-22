// app/(tabs)/SwipeScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Swiper from "react-native-deck-swiper";
import { auth, db } from "../../firebaseConfig"; // Import initialized services
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useTheme } from "../../components/ThemeProvider";
import { Profile } from "../../types/Profile";

const SwipeScreen: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const { theme } = useTheme();

  // Fetch user profile
  const fetchUserProfile = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Not Authenticated", "Please log in to view profiles.");
      return null;
    }

    const userDoc = await getDoc(doc(db, "profiles", user.uid));
    if (userDoc.exists()) {
      return userDoc.data() as Profile;
    }
    return null;
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      const currentUserProfile = await fetchUserProfile();
      if (!currentUserProfile) return;

      const q = query(
        collection(db, "profiles"),
        where("role", "!=", currentUserProfile.role)
      );
      const querySnapshot = await getDocs(q);
      const fetchedProfiles = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Profile)
      );
      setProfiles(fetchedProfiles);
    };
    fetchProfiles();
  }, []);

  const handleSwipeRight = async (cardIndex: number) => {
    const swipedProfile = profiles[cardIndex];
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Not Authenticated", "Please log in to swipe profiles.");
      return;
    }

    await addDoc(collection(db, "matches"), {
      user1: user.uid,
      user2: swipedProfile.id,
      timestamp: new Date(),
    });
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={profiles}
        renderCard={(card: Profile) => (
          <View style={styles.card}>
            <Text style={styles.name}>{card.name}</Text>
            <Text style={styles.role}>{card.role}</Text>
            <Text style={styles.description}>{card.description}</Text>
          </View>
        )}
        onSwipedRight={handleSwipeRight}
        cardIndex={0}
        backgroundColor="white"
        stackSize={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  role: {
    fontSize: 18,
    color: "gray",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});

export default SwipeScreen;
