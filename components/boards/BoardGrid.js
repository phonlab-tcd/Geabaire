import { KeyboardAvoidingView, Platform, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import useSentence from "../../state/hooks/useSentence";
import BoardButton from "./BoardButton";
import EmptyButton from "./EmptyButton";
import { faMagnifyingGlass, faMicrophoneLines, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function BoardGrid({ board, openFolder, setSettingsVisable, boardId }) {
    const { addButtonPress, sentence } = useSentence();
    const navigation = useNavigation();
    const sideBarControls = createSideBarControls(navigation, setSettingsVisable, sentence, board);
    const buttons = board.buttons;

    const rows = [];

    for (let rowIndex = 0; rowIndex < board.grid.rows; rowIndex++) {
        const columns = [];

        for (let columnIndex = 0; columnIndex < board.grid.columns; columnIndex++) {
            const buttonIndex = rowIndex * board.grid.columns + columnIndex;

            if (buttonIndex - 1 > buttons.length) {
                break;
            }

            columns.push(
                <Col key={columnIndex}>
                    <BoardButton
                        item={buttons[buttonIndex]}
                        images={board.images}
                        addButtonPress={addButtonPress}
                        openFolder={openFolder}
                        boardId={boardId}
                    />
                </Col>
            );
        }

        rows.push((<Row key={rowIndex} style={styles.row}>{columns}</Row>));
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Grid>
                {rows}
            </Grid>
            {sideBarControls}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 8,
        marginRight: 8
    },
    row: {
        marginTop: 8,
        marginBottom: 8
    },
    controlButtonContainer: {
        padding: 24,
        margin: 2,
        borderRadius: 12,
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    cblabelStyle: {
        fontSize: 16,
        paddingBottom: 10,
        textAlign: "center",
    },
    sidebar: {
        backgroundColor: "#E2E2E2",
        padding: 6,
        justifyContent: "flex-end",
        borderLeftColor: "#CCCCCC",
        borderLeftWidth: 1
    }
});

function createSideBarControls(navigation, setSettingsVisable, sentence, board) {
    // const controls = [
    //     <EmptyButton />,
    //     <EmptyButton />,
    //     <EmptyButton />,
    //     <EmptyButton />,
    //     Platform.OS !== "web" ? (
    // <ControlButton
    //     icon={faShareFromSquare}
    //     label={"Share"}
    //     action={async () => await Share.share({
    //         message: sentence,
    //     })}
    // />
    //     ) : <EmptyButton />,
    //     <ControlButton
    //         icon={faMicrophoneLines}
    //         label={"Speak"}
    //         action={() => { }}
    //     />,
    //     <ControlButton
    //         icon={faMagnifyingGlass}
    //         label={"Search"}
    //         action={() => { }}
    //     />
    // ]

    // if (!(Platform.OS === "ios" || Platform.OS === "android")) {
    //     controls[3] = controls[2];
    //     controls[2] = <EmptyButton />;
    // }


    return <View style={[styles.sidebar]}>
        {Platform.OS === "web" && (
            <ControlButton
                icon={faShareFromSquare}
                label={"Share"}
                action={async () => await Share.share({
                    message: sentence,
                })}
            />
        )}
        <ControlButton
            icon={faMicrophoneLines}
            label={"Speak"}
            action={() => { }}
        />
        <ControlButton
            icon={faMagnifyingGlass}
            label={"Search"}
            action={() => { }}
        />
    </View>
}

function ControlButton({ icon, label, action }) {

    return (
        <TouchableOpacity style={[styles.controlButtonContainer]} onPress={action}>
            <Text style={styles.cblabelStyle}>{label}</Text>
            <FontAwesomeIcon icon={icon} size={32} color={"black"} />
        </TouchableOpacity>
    )
}
