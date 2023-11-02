// To be replaced with a /meta endpoint
import { Audio } from "expo-av";
import meta from "./synthesis-meta-full.json"

const synthesisApi = "https://synthesis.abair.ie/nemo/"
const synthesisEndpoint = "synthesise"
const synthesisQuery = "?input=%input%&voice=%voice%&audioEncoding=MP3&outputType=AUDIO&speed=%speed%&pitch=%pitch%&normalise=true"
const newQuery  = "?voice=%voice%&input=%input%&audioEncoding=MP3&cutSilence=true&speed=1.0&ps=0.0&pa=1.0"



// All regions 
export const regions_en = meta.voices.regions.map((region) => ({label: region.label_en, value: region.label_en}));

// All speakers
export const speakers = meta.voices.regions.map(region => region.speakers).flat();

export default function useSynthesis() {
    function speakerOptions(regionName) {
        return meta.voices.regions.filter(region => region.label_en === regionName)[0].speakers.map(speaker => ({
            label: speaker.label_ga,
            value: speaker.shortcode
        }));
    }

    function speaker(code) {
        return speakers.filter(speaker => speaker.shortcode === code)[0];
    }

    console.log("Loading available voices");
    return { regions_en, speakerOptions, speaker };
}

export const mp3 = async (input, voice, speed, pitch) => {
    await Audio.Sound.createAsync(
        { uri: getSynthesisUrl(input, voice, speed, pitch) },
        { shouldPlay: true }
    );
}

export const getSynthesisUrl = (input, voice, speed, pitch, encoding, outputType, normalise) => {
    if (!input) throw Error("Invalid input");

    voice ??= "snc.nemo";
    speed ??= 1;
    pitch ??= 1;
    encoding ??= "MP3";
    outputType ??= "AUDIO";
    normalise ??= "true";

    console.log(synthesisApi
        + synthesisEndpoint
        + synthesisQuery
            .replace("%input%", input)
            .replace("%voice%", voice)
            .replace("%speed%", speed)
            .replace("%pitch%", pitch)
            .replace("%encoding%", encoding)
            .replace("%outputType%", outputType)
            .replace("%normalise%", normalise));


    return synthesisApi
        + synthesisEndpoint
        + synthesisQuery
            .replace("%input%", encodeURIComponent(input))
            .replace("%voice%", voice)
            .replace("%speed%", speed)
            .replace("%pitch%", pitch)
            .replace("%encoding%", encoding)
            .replace("%outputType%", outputType)
            .replace("%normalise%", normalise);
}

export const getSpeakerAndRegion = (code) => {
    // Iterate through the regions
    for (const region of meta.voices.regions) {
        // Iterate through the speakers in the region
        for (const speaker of region.speakers) {
            // Check if the code matches
            if (speaker.codes.DNN === code || speaker.codes.HTS === code || speaker.codes.NEMO === code) {
                return {
                    speakerName: speaker.shortcode,
                    regionName: region.label_en
                };
            }

        }
    }
    return null;  // Return null if code is not found
}
