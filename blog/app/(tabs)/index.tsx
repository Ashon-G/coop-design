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
import { CardItem } from "@/components/CardItem"; // Import the CardItem

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

// Sample card data
const CARD_DATA = [
  {
    title: "Card Title 1",
    description: "This is a description for Card 1.",
    imageUrl: "https://picsum.photos/id/4/800/600",
  },
  {
    title: "Card Title 2",
    description: "This is a description for Card 2.",
    imageUrl: "https://picsum.photos/id/5/800/600",
  },
  {
    title: "Card Title 3",
    description: "This is a description for Card 3.",
    imageUrl: "https://picsum.photos/id/6/800/600",
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
            source={require("@/assets/images/workdesk-coffee.gif")}
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

        {/* Card Items Section */}
        <ThemedView>
          {CARD_DATA.map((card, index) => (
            <CardItem
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              onPress={() => console.log(`${card.title} pressed`)}
              style={styles.cardItem}
            />
          ))}
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
    borderRadius: 50,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    borderRadius: 10,
  },
  reactLogo: {
    height: 300,
    width: 490,
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
    borderColor: "#000",
  },
  storyUsername: {
    marginTop: 5,
    fontSize: 12,
  },
  cardItem: {
    marginBottom: 16,
  },
});
