import { Image, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CardItem as CardItemType } from "../constants/types";

interface CardItemProps extends Omit<CardItemType, "id"> {
  onPress: () => void;
  style?: ViewStyle;
}

export const CardItem: React.FC<CardItemProps> = ({
  title,
  description,
  imageUrl,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.cardContainer, style]}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.cardImage}
        accessibilityLabel={`Image for ${title}`}
      />
      <ThemedView style={styles.cardContent}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          {title}
        </ThemedText>
        <ThemedText style={styles.cardDescription}>{description}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%", // Make the card container full width
    backgroundColor: "#fff",
    resizeMode: "cover",
    borderRadius: 2,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    paddingHorizontal: 0, // Remove any horizontal padding
  },
  cardImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 1,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
});
