import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// Region
// Speaker
// Synth Type
// Speak eeach word
// Speak full sentence
// show images 
// correct sentences
// display corrected sentence
// speed
// pitch
// delay
export default function BoardSettingsView({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerLabel}>Board Settings</Text>
                <TouchableOpacity style={{marginRight: 12}} onPress={() => navigation.toggleDrawer()}>
                    <FontAwesomeIcon
                        icon={faBars}
                        size={30}
                        color="#F2F2F2"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.settingsContainer}>
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F2F2"
    },
    settingsContainer: {
        paddingLeft: 35,
        paddingRight: 35
    },
    header: {
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#6a994e",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8,
    },
    headerLabel: {
        color: "#F2F2F2",
        fontSize: 25,
        marginLeft: 60
    }
})