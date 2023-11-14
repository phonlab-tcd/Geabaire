import { useRecoilState } from "recoil"
import { boardStackState, loadedBoardState, loadedSettingsState } from "../atoms/boards"
import { useEffect } from "react";
import { supabase } from "../supabase";
import useSettings from "./useSettings";

// Represents a board in memory and provides helper functions
// for performing actions on a board
export default function useBoard(boardId) {
    // Where the user has navigated to within a given board
    // An array of board/child board IDs. 
    const [boardStack, setBoardStack] = useRecoilState(boardStackState);

    // The entire board json object from aac_complete_boards
    const [loadedBoard, setLoadedBoard] = useRecoilState(loadedBoardState);

    // The raw settings object as stored in the database for this board. 
    const [loadedSettings, setLoadedSettings] = useRecoilState(loadedSettingsState);

    const settings = useSettings(loadedSettings);
    
    let boards = {};
    let rootId;

    if (loadedBoard && loadedBoard.meta) {
        rootId = loadedBoard.meta.parent;
        boards = loadedBoard.boards;
    }

    function push(boardId) {
        // const newStack = [...boardStack, loadedBoard.boards[boardId]];
        const newStack = [...boardStack, boardId];
        setBoardStack(newStack);
    }

    function pop() {
        if (boardStack.length > 1) {
            setBoardStack(stack => stack.slice(0, -1));
        }
    }

    function peek() {
        return boards[boardStack[boardStack.length - 1]];
    }

    function popAll() {
        setBoardStack([rootId])
    }

    // Load the board if it isn't already
    useEffect(() => {
        async function load() {
            console.log("[useBoard] Downloading Board: " + boardId);
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
                return;
            }

            
            setLoadedBoard(data.board);
            setLoadedSettings(data.settings);
            push(data.board.meta.parent);
        }

        if (!loadedBoard || (loadedBoard.meta && !loadedBoard.meta.id === boardId)) {
            load();
        }
    }, []);

    return {
        board: loadedBoard && boards ? peek() : {buttons: []},
        boardStack, loadedBoard, loadedSettings, setLoadedSettings, 
        push, pop, peek, popAll
    }
}