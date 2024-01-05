import { useRecoilState, useRecoilValue } from "recoil";
import { buttonPressesState, sentenceState } from "../atoms/sentence";
import { settingsState } from "../atoms/settings";
import { sentenceSpeechTimer } from "../atoms/timers";
import { synthesize } from "../../partials/synthesis";

export default function useSentence() {
    const sentence = useRecoilValue(sentenceState);
    const settings = useRecoilValue(settingsState);

    const [buttonPresses, setButtonPresses] = useRecoilState(buttonPressesState);
    const [speechTimer, setSpeechTimer] = useRecoilState(sentenceSpeechTimer);

    function getLastWord() {
        if (buttonPresses.length == 0) return null;
        const words = buttonPresses[buttonPresses.length-1].label.split(" ");
        return words[words.length - 1];
    }

    return {
        sentence,
        buttonPresses,
        playNow: () => { 
            // Reset the time since last button press to stop sentence speech
            if (speechTimer) { 
                clearTimeout(speechTimer);
                setSpeechTimer(null);
            }

            synthesize(sentence, settings.voice, settings.speed, settings.pitch);
        },
        addButtonPress: (button) => {
            setButtonPresses((buttonPresses) => [...buttonPresses, button]);

            if (settings.doSpeakEachWord) { 
                synthesize(button.label, settings.voice, settings.speed, settings.pitch);
            }

            // Reset the time since last button press to stop sentence speech
            if (speechTimer) { 
                clearTimeout(speechTimer);
                setSpeechTimer(null);
            }

            // Set new timeout
            if (settings.doSpeakFullSentence) {
                setSpeechTimer(
                    setTimeout(() => {
                        // TODO: add corrector step.
                        synthesize(sentence + " " + button.label, settings.voice, settings.speed, settings.pitch);
                    }, settings.speakSentenceDelay)
                );
            }

        },
        removeLastButtonPress: () => {
            setButtonPresses((buttonPresses) => buttonPresses.slice(0, -1));
        },
        clearSentence: () => {
            setButtonPresses([]);
        },
        setSentence: (text) => {
            setButtonPresses([{label: text}])
        },
        lastWord: getLastWord(),
        cutOffLastWord: () => {
            let lastButtonPress = buttonPresses[buttonPresses.length - 1];
            let newButtonPresses = buttonPresses.slice(0, -1);
            const words = buttonPresses[buttonPresses.length-1].label.split(" ");

            if (words.length <= 1) {
                setButtonPresses((buttonPresses) => buttonPresses.slice(0, -1));
                return ({imageLink: lastButtonPress.imageLink, label: words[words.length - 1]})
            }

            const oldWords = words.slice(0, -1);
            const oldLabel = oldWords.join(" ").trim();
            newButtonPresses.push({imageLink: lastButtonPress.imageLink, label: oldLabel})
            setButtonPresses(newButtonPresses)
            return ({imageLink: lastButtonPress.imageLink, label: words[words.length - 1]})
        }
    };
}