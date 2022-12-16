import { atom, selector } from "recoil";

// Array of objects. Object contains the text and a link to the image
const buttonPressesState = atom({
    key: "buttonPressesState",
    default: [],
});

const sentenceState = selector({
    key: "sentence",
    get: ({ get }) => {
        let sentence = "";
        let buttonPresses = get(buttonPressesState);

        for (let buttonPress of buttonPresses) {
            sentence += buttonPress.label + " ";
        }

        return sentence;
    },
});

export { buttonPressesState, sentenceState };
