import { StyleSheet } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import useSentence from "../../state/hooks/useSentence";
import BoardButton from "./BoardButton";
import EmptyButton from "./EmptyButton";

export default function BoardGrid({ board, openFolder }) {
    let { addButtonPress } = useSentence();

    let rows = board.board.map((row, index) => (
        <Row key={index} row={row}>
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
        </Row>
    ));

    return <Grid>{rows}</Grid>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});