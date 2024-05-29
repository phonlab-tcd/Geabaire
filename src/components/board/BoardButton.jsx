/**
 * Represents a button component within a grid forming a board.
 * @module BoardButton
 */

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { getContrastingFolderColor, getContrastingTextColor } from "../../partials/accessibility";
import BoardButtonEmpty from "./BoardButtonEmpty";

/**
 * BoardButton component renders a button within a grid forming a board.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.item - JSON data representing the button from the board.
 * @param {Function} props.addButtonPress - Appends the button and associated image to the constructed message.
 * @param {Function} props.openFolder - Pushes the ID of a board onto the board navigation stack.
 * @param {string} props.boardId - The id of the currently loaded board.
 * @param {Object} props.settings - User's chosen settings.
 * @param {Function} props.popAll - Clears the navigation stack, moving the user to the home board.
 * @param {NodeJS.Timeout} props.snapBackTimer - Stores the current snapBackTimer object.
 * @param {Function} props.setSnapBackTimer - Updates the state of snapBackTimer with a new timer.
 * @returns {React.JSX} The rendered button component.
 */
export default function BoardButton({ item, addButtonPress, openFolder, boardId, settings, popAll, snapBackTimer, setSnapBackTimer }) {
    // If there is no button information render an empty button
    // This represents the empty space on the screen.
    if (!item) {
        return <BoardButtonEmpty/>;
    }

    // If child is defined, then it is a folder
    const isFolder = Boolean(item["child"]);

    // This is where images are pulled, hosted by serving a static directory in phonlab-tcd/Geabaire-Api.
    const API_LINK = process.env.EXPO_PUBLIC_GEABAIRE_API_LINK ?? "https://api.geabaire.abair.ie/v1"
    const imageLink = `${API_LINK}/images/${boardId}/${item.image}.webp`
    console.log(boardId, imageLink)
    // This applies the button-defined background and border colors to the button.
    const computedStyle = {
        backgroundColor: item["background_color"],
        borderColor: item["border_color"],
    };

    // The text/label color. 
    const labelColor = {
        color: getContrastingTextColor(item["background_color"])
    };

    /**
     * Handles button press event.
     */
    const onButtonPress = () => {
        // If the button pressed should append to the message or navigate to a folder
        if (isFolder) {
            openFolder(item.child);
        } else {
            addButtonPress({ label: item.label, imageLink });
        }

        // If the user has not enabled the snap back feature return
        // We also don't want clicking into folders to start the snapback timer.
        if (!settings.doSnapBack) {
            return;
        }

        // If the user has enabled the snap back feature and is using the timer.
        if (settings.doSnapBackTimer === true) {
            console.log("[BoardButton] Snap back timer enabled, begin timer. ")
            // Reset the pre-existing timer.
            if (snapBackTimer) {
                clearTimeout(snapBackTimer);
            }
    
            setSnapBackTimer(setTimeout(() => {
                console.log("[BoardButton] Triggered snap back")
                popAll();
            }, settings.delayBeforeSnappingBack))
        } else {
            // Snap back now if the timer is not enabled.
            if (isFolder) return;
            popAll();
        }
    } 

    return (
        <TouchableOpacity
            onPress={onButtonPress}
            style={[styles.container, computedStyle]}
        >
            {!item.hide_label && <Text style={[styles.labelStyle, labelColor]} fontSize={9}>{item.label}</Text>}
            {item.image && (
                <Image
                    source={imageLink}
                    style={styles.imageStyle}
                    contentFit={"contain"}
                    cachePolicy={"memory-disk"}
                />
            )}
            {isFolder && (
                <FAIcon
                    type="fontawesome"
                    name="folder"
                    style={styles.topRight}
                    color={getContrastingFolderColor(item["background_color"])}
                />
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red", // Placeholder background color.
        margin: 8,
        height: "100%",
        borderRadius: 12,
        borderColor: "rgba(12, 12, 12, 0.3)",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    labelStyle: {
        color: "black", // Placeholder text color.
        textAlign: "center",
        fontSize: 11
    },
    imageStyle: {
        width: 32, // Placeholder image width.
        height: 32, // Placeholder image height.
    },
    topRight: {
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: 3,
        marginRight: 3,
    },
});
