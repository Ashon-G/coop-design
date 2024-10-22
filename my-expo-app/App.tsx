// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import LoginScreen from "./app/screens/LoginScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import SwipeScreen from "./app/screens/SwipeScreen";
import MatchesScreen from "./app/screens/MatchesScreen";
import ChatScreen from "./app/(tabs)/ChatScreen";
import { ThemeProvider } from "./components/ThemeProvider";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKbfMM6ne16s2gVYlfjXEZLpv0d_BAJOI",
  authDomain: "lunch-1b2c1.firebaseapp.com",
  projectId: "lunch-1b2c1",
  storageBucket: "lunch-1b2c1.appspot.com",
  messagingSenderId: "63769526563",
  appId: "1:63769526563:web:d1ecfe4ff4c06e9ea08c96",
  measurementId: "G-JL2H5HCLNQ",
};
initializeApp(firebaseConfig);

// Define the parameter types for the navigation stack
export type RootStackParamList = {
  Swipe: undefined;
  Profile: undefined;
  Matches: undefined;
  Chat: { matchId: string; name?: string }; // Include matchId as a required parameter
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return unsubscribe;
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#4A90E2" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          {user ? (
            <>
              <Stack.Screen
                name="Swipe"
                component={SwipeScreen}
                options={{ title: "Find Matches" }}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Matches" component={MatchesScreen} />
              <Stack.Screen
                name="Chat"
                component={ChatScreen} // This should now accept the correct props
                options={({ route }) => ({
                  title: route.params?.name || "Chat",
                })}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
