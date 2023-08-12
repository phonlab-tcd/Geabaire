import { useRecoilState } from "recoil"
import { boardStackState, loadedBoardState } from "../atoms/boards"
import { useEffect } from "react";
import { supabase } from "../supabase";

// Represents a board in memory and provides helper functions
// for performing actions on a board
export default function useBoard(boardId) {
    // Where the user has navigated to within a given board
    // An array of board/child board IDs. 
    const [boardStack, setBoardStack] = useRecoilState(boardStackState);

    // The entire board json object from aac_complete_boards
    const [loadedBoard, setLoadedBoard] = useRecoilState(loadedBoardState);

    let settings = null, rootId = null;

    if (loadedBoard && loadedBoard.meta) {
        settings = loadedBoard.meta.settings;
        rootId = loadedBoard.meta.parent;
    }

    function push(board) {
        
    }

    function pop() {

    }

    function peek() {

    }

    function popAll() {
        setBoardStack([loadedBoard.boards[loadedBoard.meta.parent]])
    }

    // Load the board if it isn't already
    useEffect(() => {
        async function load() {
            console.log("Downloading Board: " + boardId);
            const {data, error} = await supabase.from("aac_complete_boards")
                .select()
                .eq("id", boardId)
                .single();

            if (error) {
                alert(error);
                return;
            }

            if (!data) {
                alert("No response");
            }

            console.log(data.board.meta);

            setLoadedBoard(data.board);
            // setBoardStack([data.board.boards[data.board.meta.parent]]);
            // console.log(boardStack[0]);
        }

        if (!loadedBoard || (loadedBoard.meta && !loadedBoard.meta.id === boardId)) {
            load();
        }
    }, [])

    return {
        board: boardStack[boardStack.length - 1],
        boardStack, loadedBoard, push, pop, peek, popAll
    }
}