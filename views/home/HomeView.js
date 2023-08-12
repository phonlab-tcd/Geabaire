import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";
import useProfile from "../../state/hooks/useProfile";

export default function HomeView({ navigation }) {
    const {name} = useProfile();

    const boards = [{
        label: "AAC don Gaeilge",
        lastAccessed: new Date(),
        id: "abcdefg",
        version: 1
    }]

    const goToBoard = (boardId) => {
        alert("Going to board: " + boardId);
        navigation.navigate("BoardNavigator", { boardId })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerLabel}>Geabaire: AAC don Gaeilge</Text>
                <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigation.toggleDrawer()}>
                    <FontAwesomeIcon
                        icon={faBars}
                        size={30}
                        color="#F2F2F2"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcome} numberOfLines={2}>
                        Welcome, <Text style={{ fontWeight: "bold" }}>{name}</Text> to Geabaire.
                        The first Irish-first Alternative and Augmentative Communication (AAC) Tool.
                    </Text>
                </View>

                <View style={styles.columns}>
                    <View style={styles.column}>
                        <Text style={styles.columnHeader}>News</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.columnHeader}>Get Started</Text>
                        <View style={styles.actionList}>
                            <View style={styles.actionGroup}>
                                {boards.map(board => (
                                    <TouchableOpacity key={board.id} style={styles.boardCard} onPress={() => goToBoard(board.id)}>
                                        <Text style={styles.boardLabel}>{board.label}</Text>
                                        <Text>
                                            <Text style={styles.boardKey}>Last Accessed: </Text> {format(board.lastAccessed, "MMMM do, yyyy H:mma")}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F2F2",
        flex: 1
    },
    content: {
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
        fontSize: 32,
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "bold"
    },
    welcomeContainer: {
        marginTop: 12,
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 12,
        borderBottomColor: "#CCCC",
        borderBottomWidth: 1
    },
    welcome: {
        fontSize: 24
    },
    columns: {
        marginTop: 12,
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
        flex: 1,
    },
    column: {
        flex: 1,
        marginLeft: 32,
        marginRight: 32
    },
    columnHeader: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        borderBottomColor: "#CCC",
        borderBottomWidth: 1,
        paddingBottom: 6,
    },
    actionList: {
    },
    actionGroup: {
        marginTop: 6,
        marginBottom: 6,
    },
    actionGroupHeader: {
        fontSize: 24,
        paddingLeft: 16,
        fontWeight: 600
    },
    boardCard: {
        backgroundColor: "white",
        margin: 16,
        padding: 16,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
        borderRadius: 12
    },
    boardLabel: {
        fontSize: 23,
        fontWeight: 600,
    },
    boardKey: {
        fontSize: 16,
        fontWeight: 600
    }
});