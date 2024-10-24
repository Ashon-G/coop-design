import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  PanResponder,
  ImageBackground,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  Colors,
  Fonts,
  screenHeight,
  screenWidth,
  Sizes,
} from "@/constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { usersList } from "@/components/usersList";

interface User {
  id: number; // Change this to number
  name: string;
  age: number;
  profession: string;
  address: string;
  distance: string;
  isFavorite: boolean;
  image: any; // Adjust this type according to your image source
}

interface HomeScreenProps {
  navigation: {
    push: (screen: string) => void;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>(usersList); // Direct initialization
  const [search, setSearch] = useState<string>("");
  const searchFieldRef = useRef<TextInput | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<string>("");

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        {searchInfo()}
        <View style={{ flex: 1 }}>{usersInfo()}</View>
      </View>
    </View>
  );

  function usersInfo() {
    const SwipeableCard: React.FC<{
      item: User;
      removeCard: () => void;
      swipedDirection: (direction: string) => void;
    }> = ({ item, removeCard, swipedDirection }) => {
      const [xPosition] = useState(new Animated.Value(0));
      let swipeDirection = "";
      const cardOpacity = new Animated.Value(1);
      const rotateCard = xPosition.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ["-20deg", "0deg", "20deg"],
      });

      const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => false,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (evt, gestureState) => {
            xPosition.setValue(gestureState.dx);
            if (gestureState.dx > screenWidth - 250) {
              swipeDirection = "Right";
            } else if (gestureState.dx < -screenWidth + 250) {
              swipeDirection = "Left";
            }
          },
          onPanResponderRelease: (evt, gestureState) => {
            if (
              gestureState.dx < screenWidth - 150 &&
              gestureState.dx > -screenWidth + 150
            ) {
              swipedDirection("--");
              Animated.spring(xPosition, {
                toValue: 0,
                speed: 5,
                bounciness: 10,
                useNativeDriver: false,
              }).start();
            } else if (gestureState.dx > screenWidth - 150) {
              Animated.parallel([
                Animated.timing(xPosition, {
                  toValue: screenWidth,
                  duration: 200,
                  useNativeDriver: false,
                }),
                Animated.timing(cardOpacity, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: false,
                }),
              ]).start(() => {
                swipedDirection(swipeDirection);
                removeCard();
              });
            } else if (gestureState.dx < -screenWidth + 150) {
              Animated.parallel([
                Animated.timing(xPosition, {
                  toValue: -screenWidth,
                  duration: 200,
                  useNativeDriver: false,
                }),
                Animated.timing(cardOpacity, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: false,
                }),
              ]).start(() => {
                swipedDirection(swipeDirection);
                removeCard();
              });
            }
          },
        })
      ).current;

      return (
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            {
              height: screenHeight / 1.7,
              width: screenWidth - 40,
              position: "absolute",
            },
            {
              opacity: cardOpacity,
              transform: [{ translateX: xPosition }, { rotate: rotateCard }],
            },
          ]}
        >
          <ImageBackground
            source={item.image}
            style={{ height: "100%", width: "100%" }}
            resizeMode="cover"
            borderRadius={Sizes.fixPadding * 3.0}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.push("ProfileDetail");
              }}
              style={{
                height: screenHeight / 1.7,
                width: "100%",
                justifyContent: "space-between",
                borderRadius: Sizes.fixPadding * 3.0,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  margin: Sizes.fixPadding,
                }}
              >
                <MaterialIcons
                  name="location-pin"
                  size={18}
                  color={Colors.whiteColor}
                />
                <Text
                  style={{
                    ...Fonts.whiteColor15Regular,
                    marginLeft: Sizes.fixPadding - 5.0,
                  }}
                >
                  {item.address} • {item.distance}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: Sizes.fixPadding + 8.0,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    removeCard();
                  }}
                  style={styles.closeAndShortlistIconWrapStyle}
                >
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={Colors.primaryColor}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    maxWidth: screenWidth - 190,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: Sizes.fixPadding,
                  }}
                >
                  <Text numberOfLines={1} style={{ ...Fonts.whiteColor20Bold }}>
                    {item.name}, {item.age}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.whiteColor15Regular }}
                  >
                    {item.profession}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    changeShortlist({ id: item.id });
                  }}
                  style={styles.closeAndShortlistIconWrapStyle}
                >
                  <MaterialIcons
                    name={item.isFavorite ? "favorite" : "favorite-border"}
                    size={24}
                    color={Colors.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </Animated.View>
      );
    };

    const removeCard = (id: number) => {
      const newUsers = users.filter((item) => item.id !== id);
      setUsers(newUsers);
    };

    const lastSwipedDirection = (direction: string) => {
      setSwipeDirection(direction);
    };

    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            ...styles.photoBackDeviderStyle,
            ...styles.imageBacklLayer1Style,
          }}
        />
        <View
          style={{
            ...styles.photoBackDeviderStyle,
            ...styles.imageBackLayer2Style,
          }}
        />
        {users.map((item) => (
          <SwipeableCard
            key={item.id}
            item={item}
            removeCard={() => removeCard(item.id)}
            swipedDirection={lastSwipedDirection}
          />
        ))}
      </View>
    );
  }

  function changeShortlist({ id }: { id: number }) {
    const newUsers = users.map((item) => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    setUsers(newUsers);
  }

  function searchInfo() {
    return (
      <View style={styles.searchInfoWrapStyle}>
        <View style={styles.searchFieldWrapStyle}>
          <MaterialIcons name="search" size={22} color={Colors.grayColor} />
          <TextInput
            ref={searchFieldRef}
            placeholder="Search Partner..."
            placeholderTextColor={Colors.grayColor}
            style={{
              marginLeft: Sizes.fixPadding - 2.0,
              ...Fonts.blackColor15Regular,
              height: 20.0,
            }}
            cursorColor={Colors.primaryColor}
            value={search}
            onChangeText={(value) => {
              setSearch(value);
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.push("Filter");
          }}
          style={styles.filterButtonStyle}
        >
          <MaterialCommunityIcons
            name="tune-variant"
            size={26}
            color={Colors.whiteColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                ...Fonts.grayColor15Regular,
                marginRight: Sizes.fixPadding - 5.0,
              }}
            >
              Location
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={18}
              color={Colors.primaryColor}
            />
          </View>
          <View
            style={{
              marginTop: Sizes.fixPadding - 5.0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="location-pin"
              size={20}
              color={Colors.primaryColor}
            />
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                ...Fonts.blackColor18Bold,
                marginLeft: Sizes.fixPadding - 5.0,
              }}
            >
              Irvine, California
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => searchFieldRef.current?.focus()}
            style={styles.iconWrapStyle}
          >
            <MaterialIcons
              name="search"
              size={22}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.push("Notifications");
            }}
            style={{
              ...styles.iconWrapStyle,
              marginLeft: Sizes.fixPadding + 5.0,
            }}
          >
            <MaterialCommunityIcons
              name="bell-badge-outline"
              size={22}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  iconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: Colors.bgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  photoBackDeviderStyle: {
    position: "absolute",
    left: 20.0,
    right: 20.0,
    borderRadius: Sizes.fixPadding * 3.0,
  },
  searchInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 3.0,
  },
  searchFieldWrapStyle: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.bgColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    borderRadius: Sizes.fixPadding,
  },
  filterButtonStyle: {
    width: 50.0,
    height: 50.0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.primaryColor,
    marginLeft: Sizes.fixPadding + 5.0,
  },
  closeAndShortlistIconWrapStyle: {
    width: 43.0,
    height: 43.0,
    borderRadius: 21.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  imageBacklLayer1Style: {
    backgroundColor: Colors.lightPinkColor,
    height: screenHeight / 1.7 + 40,
    marginHorizontal: Sizes.fixPadding * 4.5,
  },
  imageBackLayer2Style: {
    marginHorizontal: Sizes.fixPadding * 2.5,
    height: screenHeight / 1.7 + 20,
    backgroundColor: Colors.pinkColor,
  },
  imageStyle: {
    height: screenHeight / 1.9,
    width: "100%",
    position: "absolute",
    justifyContent: "space-between",
  },
});
