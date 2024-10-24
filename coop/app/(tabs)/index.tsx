import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";
import StoriesViewer from "@/components/StoriesViewer"; // Import StoriesViewer
import { ThemedText } from "@/components/ThemedText"; // Assuming you have ThemedText
import { ThemedView } from "@/components/ThemedView"; // Assuming you have ThemedView

// Define an interface for places
interface Place {
  id: number;
  img: string;
  name: string;
  dates: string;
  price: number;
  rating: number;
  reviews: number;
}

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

// Sample places data
const places: Place[] = [
  {
    id: 1,
    img: "https://picsum.photos/id/10/800/1200",
    name: "Beautiful Place",
    dates: "Available from Jan 1",
    price: 100,
    rating: 4.5,
    reviews: 200,
  },
  // Add more places as needed
];

export default function Example() {
  const [saved, setSaved] = useState<number[]>([]);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);

  const handleSave = useCallback(
    (id: number) => {
      if (saved.includes(id)) {
        setSaved(saved.filter((val) => val !== id));
      } else {
        setSaved([...saved, id]);
      }
    },
    [saved]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerAction} />
          <View style={styles.headerAction}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <FeatherIcon color="#000" name="sliders" size={21} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.headerTitle}>Places to stay</Text>
      </View>

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

      <ScrollView contentContainerStyle={styles.content}>
        {places.map(({ id, img, name, dates, price, rating, reviews }) => {
          const isSaved = saved.includes(id);

          return (
            <TouchableOpacity
              key={id}
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.card}>
                <View style={styles.cardLikeWrapper}>
                  <TouchableOpacity onPress={() => handleSave(id)}>
                    <View style={styles.cardLike}>
                      <FontAwesome
                        color={isSaved ? "#ea266d" : "#222"}
                        name="heart"
                        solid={isSaved}
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardTop}>
                  <Image
                    alt=""
                    resizeMode="cover"
                    style={styles.cardImg}
                    source={{ uri: img }}
                  />
                </View>
                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{name}</Text>
                    <FontAwesome
                      color="#ea266d"
                      name="star"
                      solid={true}
                      size={12}
                      style={{ marginBottom: 2 }}
                    />
                    <Text style={styles.cardStars}>{rating}</Text>
                    <Text style={{ color: "#595a63" }}>
                      ({reviews} reviews)
                    </Text>
                  </View>
                  <Text style={styles.cardDates}>{dates}</Text>
                  <Text style={styles.cardPrice}>
                    <Text style={{ fontWeight: "600" }}>${price} </Text>/ night
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Stories Viewer Modal */}
      {isStoriesOpen && STORIES_DATA.length > 0 && (
        <StoriesViewer
          stories={STORIES_DATA}
          onClose={() => setIsStoriesOpen(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
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
  card: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#232425",
    marginRight: "auto",
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 4,
    fontSize: 15,
    fontWeight: "500",
    color: "#232425",
  },
  cardDates: {
    marginTop: 4,
    fontSize: 16,
    color: "#595a63",
  },
  cardPrice: {
    marginTop: 6,
    fontSize: 16,
    color: "#232425",
  },
});
