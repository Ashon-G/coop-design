import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import StoriesViewer from "@/components/StoriesViewer";

// Sample stories data
const STORIES_DATA = [
  {
    id: "1",
    imageUrl: "https://picsum.photos/id/1/800/1200",
    username: "john_doe",
  },
  {
    id: "2",
    imageUrl: "https://picsum.photos/id/2/800/1200",
    username: "jane_smith",
  },
  {
    id: "3",
    imageUrl: "https://picsum.photos/id/3/800/1200",
    username: "robert_johnson",
  },
];

export default function HomeScreen() {
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        {/* Stories Row */}
        <ThemedView style={styles.storiesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.storiesScroll}
          >
            {STORIES_DATA.map((story) => (
              <TouchableOpacity
                key={story.id}
                style={styles.storyBubble}
                onPress={() => setIsStoriesOpen(true)}
              >
                <Image
                  source={{ uri: story.imageUrl }}
                  style={styles.storyBubbleImage}
                />
                <ThemedText style={styles.storyUsername}>
                  {story.username}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit{" "}
            <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
            to see changes. Press{" "}
            <ThemedText type="defaultSemiBold">
              {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
            </ThemedText>{" "}
            to open developer tools.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in this
            starter app.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            When you're ready, run{" "}
            <ThemedText type="defaultSemiBold">
              npm run reset-project
            </ThemedText>{" "}
            to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
            directory. This will move the current{" "}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>

      {/* Stories Viewer Modal */}
      {isStoriesOpen && STORIES_DATA.length > 0 && (
        <StoriesViewer
          stories={STORIES_DATA}
          onClose={() => setIsStoriesOpen(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  storiesContainer: {
    marginBottom: 16,
  },
  storiesScroll: {
    flexGrow: 0,
  },
  storyBubble: {
    alignItems: "center",
    marginRight: 15,
  },
  storyBubbleImage: {
    width: 112,
    height: 170,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
  storyUsername: {
    marginTop: 5,
    fontSize: 12,
  },
});
