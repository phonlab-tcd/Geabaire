import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import useBoard from "../../state/hooks/useBoard";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

export default function WordFinderScreen({navigation}) {
    const { loadedBoard } = useBoard();
    
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const filtered = paths.filter(item =>
          item.label.toLowerCase().includes(searchInput.toLowerCase()),
        );

        if (searchInput === '') {
          return setSearchResults(paths);
        }
    
        setSearchResults(filtered);
      }, [searchInput]);

    const paths = loadedBoard.paths;

    function toPathString(path) {
        let s = "";

        for (let i = 0; i < path.length - 1; i++) {
            s += path[i] + " » ";
        }

        return s + path[path.length-1];
    }

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.headerLabel}>Board Settings</Text>
                <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigation.toggleDrawer()}>
                    <FAIcon
                        name="bars"
                        size={30}
                        color="#F2F2F2"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.finderContainer}>
                <Text style={styles.finderHeader}>Aimsigh an Focal:</Text>
                <TextInput 
                    value={searchInput} 
                    onChangeText={setSearchInput}
                    style={styles.finderInput}
                />
                <FlatList
                    data={searchResults}
                    style={styles.finderList}
                    renderItem={({ item} ) => (
                        <View style={styles.finderItem}>
                            <Text style={styles.finderItemText}>{item.label}</Text>
                            <Text> {toPathString(item.path)} </Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F2F2",
        flex: 1
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
    },
    finderHeader: {
        fontSize: 25
    },
    finderInput: {
        fontSize: 18,
        backgroundColor: "#E2E2E2",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        width: 460,
        borderRadius: 6,

    },
    finderContainer: {
        paddingLeft: 20,
        paddingTop: 20,
        alignItems: "center",
    },
    finderList: {
        paddingTop: 10
    },
    finderItem: {
        backgroundColor: "#E8E8E8",
        width: 600,
        margin: 3,
        marginLeft: 0,
        padding: 6,
    },
    finderItemText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})