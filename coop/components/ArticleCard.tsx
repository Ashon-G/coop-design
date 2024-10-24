import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

interface ArticleCardProps {
  authorName: string;
  articleCount: string;
  title: string;
  timeAgo: string;
  likes: string;
  comments: string;
  shares: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  authorName,
  articleCount,
  title,
  timeAgo,
  likes,
  comments,
  shares,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.authorSection}>
        <Image
          resizeMode="contain"
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/64a42c42fe7e83b6de5e8282bd746f918bbfcb22607752036956441401694eee?placeholderIfAbsent=true&apiKey=aa19eef6d1f1473ba394866de3aadd86" }}
          style={styles.authorAvatar}
        />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{authorName}</Text>
          <Text style={styles.articleCount}>{articleCount} Articles</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.articleContent}>
        <View style={styles.articleImageContainer}>
          <Image
            resizeMode="contain"
            source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5f0c9ed4a10e12a175bc586db125873d3034babcdd3dedfb40ceb122fc925fc2?placeholderIfAbsent=true&apiKey=aa19eef6d1f1473ba394866de3aadd86" }}
            style={styles.articleImage}
          />
          <View style={styles.articleOverlay}>
            <Text style={styles.articleTitle}>{title}</Text>
            <Text style={styles.articleTime}>{timeAgo}</Text>
          </View>
        </View>
        <View style={styles.interactionSection}>
          <View style={styles.interactionGroup}>
            {['like', 'comment', 'share'].map((type, index) => (
              <TouchableOpacity key={type} style={styles.interactionItem}>
                <Image
                  resizeMode="contain"
                  source={{ uri: `http://b.io/ext_${index + 3}-` }}
                  style={styles.interactionIcon}
                />
                <Text style={styles.interactionCount}>
                  {type === 'like' ? likes : type === 'comment' ? comments : shares}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity>
            <Image
              resizeMode="contain"
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/148af2c4760a3bedcdbea1504f1195c9d30329b1756cde3a1b8ef86c795e7103?placeholderIfAbsent=true&apiKey=aa19eef6d1f1473ba394866de3aadd86" }}
              style={styles.moreIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
  },
  authorSection: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    flexDirection: "row",
  },
  authorAvatar: {
    width: 38,
    aspectRatio: 1,
  },
  authorInfo: {
    display: "flex",
    flexDirection: "column",
  },
  authorName: {
    fontSize: 14,
    fontWeight: "700",
  },
  articleCount: {
    fontSize: 13,
    fontWeight: "200",
  },
  divider: {
    height: 21,
    marginTop: 10,
    marginBottom: 10,
  },
  articleContent: {
    display: "flex",
    width: "100%",
    maxWidth: 280,
    flexDirection: "column",
  },
  articleImageContainer: {
    position: "relative",
  },
  articleImage: {
    borderRadius: 17,
    width: "100%",
    aspectRatio: 1.72,
  },
  articleOverlay: {
    position: "absolute",
    display: "flex",
    gap: 15,
    right: 10,
    bottom: 14,
  },
  articleTitle: {
    fontWeight: "700",
    width: 225,
    color: "white",
    fontSize: 16,
  },
  articleTime: {
    fontWeight: "200",
    color: "white",
    fontSize: 16,
  },
  interactionSection: {
    display: "flex",
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  interactionGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 22,
  },
  interactionItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  interactionIcon: {
    width: 18,
    aspectRatio: 1,
  },
  interactionCount: {
    fontSize: 13,
    color: "rgba(0, 0, 0, 0.6)",
    fontWeight: "200",
  },
  moreIcon: {
    width: 18,
    aspectRatio: 1,
  },
});

export default ArticleCard;