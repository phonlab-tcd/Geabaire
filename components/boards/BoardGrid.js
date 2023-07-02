import { KeyboardAvoidingView, Platform, Share, StyleSheet, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import useSentence from "../../state/hooks/useSentence";
import BoardButton from "./BoardButton";
import EmptyButton from "./EmptyButton";
import ControlButton from "./ControlButton";
import { faDeleteLeft, faGear, faMagnifyingGlass, faMicrophoneLines, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

export default function BoardGrid({ board, openFolder, setSettingsVisable }) {
    const { addButtonPress, sentence } = useSentence();
    const navigation = useNavigation();
    const controls = createControls(navigation, setSettingsVisable, sentence);

    let rows = board.board.map((row, index) => (
        <Row key={index} row={row} style={styles.row}>
            {row.map((button, index2) =>
                button ? (
                    <Col key={index2}>
                        <BoardButton
                            item={button}
                            images={board.images}
                            addButtonPress={addButtonPress}
                            openFolder={openFolder}
                        />
                    </Col>
                ) : (
                    <Col key={index2}>
                        <EmptyButton />
                    </Col>
                )
            )}
            <Col>
                {controls[index]}
            </Col>
        </Row>
    ));

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Grid>
                {rows}
            </Grid>
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
    }
});

function createControls(navigation, setSettingsVisable, sentence) {
    const controls = [
        <EmptyButton/>,
        <EmptyButton/>,
        <ControlButton
            icon={faGear}
            label={"Settings"}
            action={() => setSettingsVisable((prev) => !prev)}
        />,
        <ControlButton
            icon={faShareFromSquare}
            label={"Share"}
            action={async () => await Share.share({
                message: sentence,
              })}
        />,
        <ControlButton
            icon={faDeleteLeft}
            label={"Exit Speak"}
            action={() => navigation.navigate("Home")}
        />,
        <ControlButton
            icon={faMicrophoneLines}
            label={"Speak"}
            action={() => {}}
        />,
        <ControlButton
            icon={faMagnifyingGlass}
            label={"Search"}
            action={() => {}}
        />
    ]

    if (!(Platform.OS === "ios" || Platform.OS === "android")) {
        controls[3] = controls[2];
        controls[2] = <EmptyButton/>;
    }

    return controls;
}