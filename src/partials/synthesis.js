// To be replaced with a /meta endpoint
import { Audio } from "expo-av";
import meta from "../assets/voices-meta.json"
import { Alert } from "react-native";

const synthesisApi = "https://abair.ie/api2/"
// const synthesisApi = "https://synthesis.abair.ie/nemo/"
const synthesisEndpoint = "synthesise"
const synthesisQuery = "?input=%input%&voice=%voice%&audioEncoding=MP3&outputType=AUDIO&speed=%speed%&pitch=%pitch%&normalise=true"

export const regions_en = meta.voices.regions.map((region) => ({ label: region.label_en, value: region.label_en }));
export const speakers = meta.voices.regions.map(region => region.speakers).flat();

export const synthesize = async (input, voice, speed, pitch) => {
    try {
        const sound = new Audio.Sound();
        await sound.loadAsync({
            uri: getSynthesisUrl(input, voice, speed, pitch)
        });
        await sound.playAsync();
      } catch (error) {
        Alert.alert("Error", "An error occurred while trying to play the sound: " + error.message);
        console.trace(error);
      }
}

export const speakerOptions = (regionName) => {
    return meta.voices.regions.filter(region => region.label_en === regionName)[0].speakers.map(speaker => ({
        label: speaker.label_ga,
        value: speaker.shortcode
    }));
}

export const speakerProfiles = (code) => {
    return speakers.filter(speaker => speaker.shortcode === code)[0];
}

export const getSynthesisUrl = (input, voice, speed, pitch, encoding, outputType, normalise) => {
    if (!input) throw Error("Invalid input");

    // voice = "snc.nemo";
    voice ??= "ga_CO_snc_nemo"
    speed ??= 1;
    pitch ??= 1;
    encoding ??= "MP3";
    outputType ??= "AUDIO";
    normalise ??= "true";

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
            // Check if the code matches for each model type
            for (const [modelType, modelCode] of Object.entries(speaker.codes)) {
                if (modelCode === code) {
                    return {
                        speakerName: speaker.shortcode,
                        regionName: region.label_en,
                        type: modelType // Include the model type in the response
                    };
                }
            }
        }
    }
    return null;
};


export const getCodeByRegionSpeakerAndModel = (region, speaker, modelType) => {
    // Find the region object that matches the provided region label
    const regionObj = meta.voices.regions.find(r => r.label_en === region);
  
    if (!regionObj) {
        return null;
    //   throw new Error(`Region not found: ${region}`);
    }
  
    // Find the speaker object within the region that matches the provided speaker label
    const speakerObj = regionObj.speakers.find(s => s.shortcode === speaker);
  
    if (!speakerObj) {
        return null;
    //   throw new Error(`Speaker not found: ${speaker}`);
    }
  
    // Find the code corresponding to the provided modelType within the speaker object
    const code = speakerObj.codes[modelType];
  
    if (!code) {
        return null;
    //   throw new Error(`Model type not found: ${modelType}`);
    }
  
    return code;
  };