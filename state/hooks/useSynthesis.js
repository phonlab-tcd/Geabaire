// To be replaced with a /meta endpoint
import { Audio } from "expo-av";
import meta from "./synthesis-meta.json"

const synthesisApi = "https://synthesis.abair.ie/nemo/"
const synthesisEndpoint = "synthesise"
const synthesisQuery = "?input=%input%&voice=%voice%&audioEncoding=MP3&outputType=AUDIO&speed=%speed%&pitch=%pitch%&normalise=true"

// All regions 
export const regions = meta.voices.regions;

// All speakers
export const speakers = meta.voices.regions.map(region => region.speakers).flat();

export default function useSynthesis() {
    const mp3 = async (input, voice, speed, pitch) => {
        await Audio.Sound.createAsync(
            { uri: getSynthesisUrl(input, voice, speed, pitch) },
            { shouldPlay: true }
        );
    }

    return { mp3 };
}

export const getSynthesisUrl = (input, voice, speed, pitch, encoding, outputType, normalise) => {
    if (!input) throw Error("Invalid input");

    voice ??= "snc.nemo";
    speed ??= 1;
    pitch ??= 1;
    encoding ??= "MP3";
    outputType ??= "AUDIO";
    normalise ??= "true";

    return synthesisApi
        + synthesisEndpoint
        + synthesisQuery
            .replace("%input%", input)
            .replace("%voice%", voice)
            .replace("%speed%", speed)
            .replace("%pitch%", pitch)
            .replace("%encoding%", encoding)
            .replace("%outputType%", outputType)
            .replace("%normalise%", normalise);
}
