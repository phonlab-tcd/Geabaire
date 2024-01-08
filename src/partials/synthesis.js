// To be replaced with a /meta endpoint
import { Audio } from "expo-av";
import meta from "../assets/voices-meta.json"

const synthesisApi = "https://abair.ie/api2/"
// const synthesisApi = "https://synthesis.abair.ie/nemo/"
const synthesisEndpoint = "synthesise"
const synthesisQuery = "?input=%input%&voice=%voice%&audioEncoding=MP3&outputType=AUDIO&speed=%speed%&pitch=%pitch%&normalise=true"

export const regions_en = meta.voices.regions.map((region) => ({label: region.label_en, value: region.label_en}));
export const speakers = meta.voices.regions.map(region => region.speakers).flat();

export const synthesize = async (input, voice, speed, pitch) => {
    await Audio.Sound.createAsync(
        { uri: getSynthesisUrl(input, voice, speed, pitch) },
        { shouldPlay: true, progressUpdateIntervalMillis: 800 }
    );
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
            .replace("%input%",encodeURIComponent(input))
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
    const regions = meta.voices.regions;
    for (let i = 0; i < regions.length; i++) {
      const currentRegion = regions[i];
      if (currentRegion.label_en === region || currentRegion.label_ga === region) {
        const speakers = currentRegion.speakers;
        for (let j = 0; j < speakers.length; j++) {
          const currentSpeaker = speakers[j];
          if (currentSpeaker.label_en === speaker || currentSpeaker.label_ga === speaker) {
            const codes = currentSpeaker.codes;
            return codes[modelType.toUpperCase()] || null;
          }
        }
      }
    }
    return null;
  }