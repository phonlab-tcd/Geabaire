import { StyleSheet, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import useSentence from "../../state/hooks/useSentence";
import BoardButton from "./BoardButton";
import EmptyButton from "./EmptyButton";
import ControlButton from "./ControlButton";
import { faDeleteLeft, faGear, faMagnifyingGlass, faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

export default function BoardGrid({ board, openFolder, setSettingsVisable }) {
    const { addButtonPress } = useSentence();
    const navigation = useNavigation();
    const controls = createControls(navigation, setSettingsVisable);

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
        <View style={styles.container}>
            <Grid>
                {rows}
            </Grid>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 8,
        marginRight: 8
    },
    sidebarContainer: {

    },
    row: {
        marginTop: 8,
        marginBottom: 8
    }
});

function createControls(navigation, setSettingsVisable) {
    return [
        <EmptyButton/>,
        <EmptyButton/>,
        <EmptyButton/>,
        <ControlButton
            icon={faGear}
            label={"Settings"}
            action={() => setSettingsVisable((prev) => !prev)}
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
}