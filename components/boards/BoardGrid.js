import { KeyboardAvoidingView, Platform, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import useSentence from "../../state/hooks/useSentence";
import BoardButton from "./BoardButton";
import EmptyButton from "./EmptyButton";
import { faMagnifyingGlass, faMicrophoneLines, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function BoardGrid({ board, openFolder, setSettingsVisable }) {
    const { addButtonPress, sentence } = useSentence();
    const navigation = useNavigation();
    const sideBarControls = createSideBarControls(navigation, setSettingsVisable, sentence);
    const buttons = board.buttons;

    console.log(buttons.map(button => button.label))

    const rows = [];

    for (let rowIndex = 0; rowIndex < board.grid.rows; rowIndex++) {
        const columns = [];

        for (let columnIndex = 0; columnIndex < board.grid.columns; columnIndex++) {
            const buttonIndex = rowIndex * board.grid.columns + columnIndex;

            if (buttonIndex-1 > buttons.length) {
                break;
            }

            columns.push(
                <Col>
                    <BoardButton
                        item={buttons[buttonIndex]}
                        // images={board.images}
                        addButtonPress={addButtonPress}
                        openFolder={openFolder}
                    />

                </Col>
            );
        }

        rows.push((<Row style={styles.row}>{columns}</Row>));
    }

    console.log(rows);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Grid>
                {rows}
            </Grid>
            <View>
            {sideBarControls}
            </View>
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
        height: "100%",
        margin: 8,
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
});

function createSideBarControls(navigation, setSettingsVisable, sentence) {
    const controls = [
        <EmptyButton />,
        <EmptyButton />,
        <EmptyButton />,
        <EmptyButton />,
        Platform.OS !== "web" ? (
            <ControlButton
                icon={faShareFromSquare}
                label={"Share"}
                action={async () => await Share.share({
                    message: sentence,
                })}
            />
        ) : <EmptyButton />,
        <ControlButton
            icon={faMicrophoneLines}
            label={"Speak"}
            action={() => { }}
        />,
        <ControlButton
            icon={faMagnifyingGlass}
            label={"Search"}
            action={() => { }}
        />
    ]

    if (!(Platform.OS === "ios" || Platform.OS === "android")) {
        controls[3] = controls[2];
        controls[2] = <EmptyButton />;
    }

    return controls;
}

function ControlButton({ icon, label, action }) {

    return (
        <TouchableOpacity style={[styles.controlButtonContainer]} onPress={action}>
            <Text style={styles.cblabelStyle}>{label}</Text>
            <FontAwesomeIcon icon={icon} size={32} color={"black"} />
        </TouchableOpacity>
    )
}
