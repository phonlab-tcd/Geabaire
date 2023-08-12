import { useRecoilState } from "recoil"
import { boardStackState, loadedBoardState } from "../atoms/boards"

export default function useBoard() {
    const [boardStack, setBoardStack] = useRecoilState(boardStackState);
    const [loadedBoard, setLoadedBoard] = useRecoilState(loadedBoardState);

    return {}
}