import { Platform, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useSentence from "../../state/hooks/useSentence";
import BoardButton from "./BoardButton";
import { useNavigation } from "@react-navigation/native";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FlatGrid from "../FlatGrid";
import { useMemo } from "react";

export default function BoardGrid({ board, openFolder, setSettingsVisable, boardId }) {
    const { addButtonPress, sentence } = useSentence();
    const navigation = useNavigation();
    const sideBarControls = createSideBarControls(navigation, setSettingsVisable, sentence, board);

    const boardComponent = useMemo(() => (
        <FlatGrid
            data={board.buttons}
            numColumns={board.grid.columns}
            numRows={board.grid.rows}
            rowStyle={styles.row}
            columnStyle={styles.column}
            renderItem={({ item }) => {
                return (
                    <BoardButton
                        item={item}
                        addButtonPress={addButtonPress}
                        openFolder={openFolder}
                        boardId={boardId}
                    />
                )
            }}
        />
    ), [board])



    return (
        <View style={styles.container}>
            {boardComponent}
            {sideBarControls}
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
    row: {
        marginTop: 8,
        marginBottom: 8
    },
    // column: {
    //     marginLeft: 4,
    //     marginRight: 4
    // },
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
        {Platform.OS !== "web" && (
            <ControlButton
                type="material-community"
                icon="share-variant-outline"
                label={"Share"}
                action={async () => await Share.share({
                    message: sentence,
                })}
            />
        )}
        <ControlButton
            type="material-community"
            icon={"microphone"}
            label={"Speak"}
            action={() => { }}
        />
        <ControlButton
            type="material-community"
            icon="magnify"
            label={"Search"}
            onPress={() => { }}
        />
    </View>
}

function ControlButton({ icon, label, action, type }) {
    return (
        <TouchableOpacity style={[styles.controlButtonContainer]} onPress={action}>
            <Text style={styles.cblabelStyle}>{label}</Text>
            {type === "fontawesome" && (
                <FAIcon name={icon} size={32} color={"black"} />
            )}
            {type === "material-community" && (
                <MCIcon name={icon} size={32} color="black" />
            )}
        </TouchableOpacity>
    )
}
