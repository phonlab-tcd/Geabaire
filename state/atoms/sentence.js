import { atom, selector } from "recoil";

// Array of arrays. Sub-array contains the text followed by a link to the image
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
            sentence += buttonPress[0] + " ";
        }

        return sentence;
    },
});

export { buttonPressesState, sentenceState };
