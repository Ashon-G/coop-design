import React from "react";
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get("window");

export default function ModalScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        alt=""
        style={styles.background}
        source={{
          uri: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        }}
      />
      <View style={[styles.background, styles.overflow]} />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.paywall}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.paywallClose}
          >
            <FeatherIcon color="#fff" name="x" size={30} />
          </TouchableOpacity>
          <Text style={styles.paywallBadge}>Limited time offer</Text>
          <Text style={styles.paywallTitle}>NewsApp+</Text>
          <Text style={styles.paywallMessage}>
            Don't miss out on the full story. Unlock detailed reports, special
            features, and more by subscribing to our premium service.
          </Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Subscribe for $3.99 / mo</Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.btnSecondary}>
                <Text style={styles.btnSecondaryText}>Skip for now</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  overflow: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  container: {
    paddingVertical: 6,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Paywall */
  paywall: {
    position: "relative",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-end",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  paywallClose: {
    alignSelf: "flex-end",
    marginBottom: "auto",
  },
  paywallBadge: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  paywallTitle: {
    fontSize: 42,
    textAlign: "center",
    lineHeight: 44,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  paywallMessage: {
    textAlign: "center",
    marginBottom: 36,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: "#fff",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#000",
  },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
