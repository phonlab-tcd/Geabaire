import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import useProfile from "../state/hooks/useProfile";
import { useEffect } from "react";

export default function LoadingUserScreen() {
    const navigation = useNavigation();
    const { id, onOpenBoard } = useProfile();
  
    useEffect(() => {
      if (!id || !onOpenBoard) return;
  
      async function load() {
        console.log("[LoadingUserScreen] Loaded Profile.")

        if (onOpenBoard) {
          console.log("[LoadingUserScreen] Opening Default Board: " + onOpenBoard);
          navigation.navigate("BoardRouter", { boardId: onOpenBoard });
        } else {
          console.log("[LoadingUserScreen] No Default Board, going to home screen.")
          navigation.navigate("HomeRouter");
        }
      }
  
      load();
    }, [id, navigation, onOpenBoard]);


    return (

        <View style={styles.container}>
            <Text style={styles.text}>Loading User Profile...</Text>
            <ActivityIndicator style={styles.indicator} size={150} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    text: {
        color: "black",
        fontSize: 90,
    },
    indicator: {
        paddingTop: 25,
        marginLeft: 25
    }
});