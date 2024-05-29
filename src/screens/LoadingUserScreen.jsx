import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import useProfile from "../state/hooks/useProfile";
import { useEffect } from "react";
import { supabase } from "../state/supabase";

// LoadingUserScreen component
export default function LoadingUserScreen() {
    const navigation = useNavigation(); // Navigation object
    const { id, onOpenBoard } = useProfile(); // User profile data
  
    useEffect(() => {
      // Effect to execute when user profile is loaded
      if (!id) return; // Return if user id is not available
  
      async function load() {
        // Load user profile
        console.log("[LoadingUserScreen] Loaded Profile.")

        // If there's a default board to open, navigate to BoardRouter with boardId param
        if (onOpenBoard) {
          console.log("[LoadingUserScreen] Opening Default Board: " + onOpenBoard);
          navigation.navigate("BoardRouter", { boardId: onOpenBoard });
        } else {
          // If no default board, navigate to HomeRouter
          console.log("[LoadingUserScreen] No Default Board, going to home screen.")
          navigation.navigate("HomeRouter");
        }
      }
  
      load(); // Call the load function
    }, [id, navigation, onOpenBoard]); // Dependancies for the effect


    // Render the loading indicator
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