import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";

interface Story {
  id: string;
  imageUrl: string;
  username: string;
}

interface StoriesViewerProps {
  stories: Story[];
  onClose?: () => void;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = 120;

const StoriesViewer: React.FC<StoriesViewerProps> = ({ stories, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.Value(0)).current;
  const [isProgressVisible, setIsProgressVisible] = useState(true);

  // Progress bar animation
  const progressAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    startProgressAnimation();
  }, [currentIndex]);

  const startProgressAnimation = () => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000, // 5 seconds per story
      useNativeDriver: false,
    }).start(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onClose?.();
      }
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue(gesture.dy);
    },
    onPanResponderRelease: (_, gesture) => {
      if (Math.abs(gesture.dy) > SWIPE_THRESHOLD) {
        if (gesture.dy > 0 && currentIndex > 0) {
          // Swipe down - go to previous story
          slideStory(-1);
        } else if (gesture.dy < 0 && currentIndex < stories.length - 1) {
          // Swipe up - go to next story
          slideStory(1);
        } else {
          resetPosition();
        }
      } else {
        resetPosition();
      }
    },
  });

  const slideStory = (direction: number) => {
    Animated.timing(position, {
      toValue: direction * SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      position.setValue(0);
      setCurrentIndex(currentIndex + direction);
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const getNextStory = () => {
    if (currentIndex < stories.length - 1) {
      return (
        <Animated.View style={[styles.nextStory]}>
          <Image
            source={{ uri: stories[currentIndex + 1].imageUrl }}
            style={styles.image}
          />
        </Animated.View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        {stories.map((_, index) => (
          <View key={index} style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width:
                    index === currentIndex
                      ? progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0%", "100%"],
                        })
                      : index < currentIndex
                      ? "100%"
                      : "0%",
                },
              ]}
            />
          </View>
        ))}
      </View>

      {/* User info */}
      <View style={styles.header}>
        <Text style={styles.username}>{stories[currentIndex].username}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Current story */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.story,
          {
            transform: [{ translateY: position }],
          },
        ]}
      >
        <Image
          source={{ uri: stories[currentIndex].imageUrl }}
          style={styles.image}
        />
      </Animated.View>

      {/* Next story preview */}
      {getNextStory()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  story: {
    flex: 1,
    zIndex: 2,
  },
  nextStory: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  progressContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    zIndex: 3,
    gap: 5,
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    zIndex: 3,
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default StoriesViewer;
