import { useRecoilState } from "recoil"
import { boardStackState, loadedBoardState } from "../atoms/boards"
import { useEffect } from "react";

// Represents a board in memory and provides helper functions
// for performing actions on a board
export default function useBoard(board) {
    // Where the user has navigated to within a given board
    // An array of board/child board IDs. 
    const [boardStack, setBoardStack] = useRecoilState(boardStackState);

    // The entire board json object from aac_complete_boards
    const [loadedBoard, setLoadedBoard] = useRecoilState(loadedBoardState);

    // Load the board if it isn't already
    useEffect(() => {
        async function load() {
        }

        if (!loadedBoard || !loadedBoard.meta.id === board) {
            load();
        }
    }, [])

    return {x: ""}
}