import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import useProfile from "../state/hooks/useProfile";

export default function LoadingView() {
    // Loads user profile into Recoil
    useProfileEffect();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading Boards...</Text>
            <ActivityIndicator style={styles.indicator} size={90}/>
        </View>
    );
}

function useProfileEffect() {
    const navigation = useNavigation();
    const { id, onOpenBoard } = useProfile();
  
    useEffect(() => {
      if (!id || !onOpenBoard) return;
  
      async function load() {
        if (onOpenBoard) {
          console.log("Opening Default Board: " + onOpenBoard);
          navigation.navigate("BoardNavigator", { boardId: onOpenBoard });
        } else {
          console.log("No Default Board.")
          navigation.navigate("HomeNavigator");
        }
      }
  
      load();
    }, [id, navigation, onOpenBoard]);
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
        fontSize: 120,
    },
    indicator: {
        paddingTop: 25,
        marginLeft: 25
    }
});
