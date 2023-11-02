import { useRecoilState, useRecoilValue } from "recoil";
import { buttonPressesState, sentenceState } from "../atoms/sentence";
import { settingsState } from "../atoms/settings";
import { sentenceSpeechTimer } from "../atoms/timers";
import { play } from "../handlers/synthesisHelper";
import {mp3} from "./useSynthesis";

export default function useSentence() {
    let sentence = useRecoilValue(sentenceState);
    let settings = useRecoilValue(settingsState);

    const [buttonPresses, setButtonPresses] = useRecoilState(buttonPressesState);
    const [speechTimer, setSpeechTimer] = useRecoilState(sentenceSpeechTimer);

    return {
        sentence,
        buttonPresses,
        playNow: () => { 
            // Reset the time since last button press to stop sentence speech
            if (speechTimer) { 
                clearTimeout(speechTimer);
                setSpeechTimer(null);
            }

            mp3(sentence, settings.voice, settings.speed, settings.pitch);
            // play(sentence, settings);
        },
        addButtonPress: (button) => {
            setButtonPresses((buttonPresses) => [...buttonPresses, button]);

            if (settings.doSpeakEachWord) { 
                play(button.label, settings);
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
                        play(sentence + " " + button.label, settings);
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
        }
    };
}
