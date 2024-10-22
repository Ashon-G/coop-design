import React, { useState, useEffect } from "react";
import { Alert, ScrollView } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import { Profile } from "../../types/Profile";

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    id: "",
    name: "",
    role: "intern",
    description: "",
    skills: [],
    interests: [],
    experience: 0,
    goals: [],
    photoURL: "",
  });

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, "profiles", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile({ ...(docSnap.data() as Profile), id: docSnap.id });
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "profiles", auth.currentUser.uid), profile);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to grant camera roll permissions to upload an image."
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      const response = await fetch(pickerResult.uri);
      const blob = await response.blob();
      const fileRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
      await uploadBytes(fileRef, blob);
      const photoURL = await getDownloadURL(fileRef);
      setProfile({ ...profile, photoURL });
    }
  };

  return (
    <ScrollView>
      <Container>{/* Rest of the Profile Screen Code */}</Container>
    </ScrollView>
  );
};

// Styled components as in the original code...

export default ProfileScreen;
