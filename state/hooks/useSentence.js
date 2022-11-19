import { useRecoilState, useRecoilValue } from "recoil";
import { buttonPressesState, sentenceState } from "../atoms/sentence";

export default function useSentence() {
    let sentence = useRecoilValue(sentenceState);
    let [buttonPresses, setButtonPresses] = useRecoilState(buttonPressesState);

    return {
        sentence,
        buttonPresses,
        addButtonPress: (button) => {
            setButtonPresses((buttonPresses) => [...buttonPresses, button]);
        },
        removeLastButtonPress: () => {
            setButtonPresses((buttonPresses) => buttonPresses.slice(0, -1));
        },
        clearSentence: () => {
            setButtonPresses([]);
        },
    };
}
