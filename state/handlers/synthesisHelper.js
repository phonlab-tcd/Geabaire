import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import uuid from "react-native-uuid";

import axios from "axios";

const synthesisDirectory = FileSystem.cacheDirectory + "synthesis";

let play = async (string) => {
    let base64String = await getSynthesisBytes(string);

    let audioLocation = synthesisDirectory + uuid.v4();

    // Save the file locally
    await ensureDirExists(); // Make sure the synth cache dir exists
    await FileSystem.writeAsStringAsync(audioLocation, base64String, {
        encoding: FileSystem.EncodingType.Base64,
    });

    return ({ sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: audioLocation },
        { shouldPlay: true }
    ));
};

let getSynthesisBytes = async (string) => {
    let body = getSynthesisBody(string);
    const res = await axios.post("https://abair.ie/api2/synthesise", body);
    return res.data.audioContent;
};

let getSynthesisBody = (string) => {
    return {
        synthinput: { text: string, ssml: "string" },
        voiceparams: {
            languageCode: "ga-IE",
            name: "ga_CO_snc_nemo",
            ssmlGender: "UNSPECIFIED",
        },
        audioconfig: {
            audioEncoding: "LINEAR16",
            speakingRate: 1,
            pitch: 1,
            volumeGainDb: 1,
            htsParams: "string",
            sampleRateHertz: 0,
            effectsProfileId: [],
        },
        outputType: "JSON",
    };
};

async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(synthesisDirectory);
    if (!dirInfo.exists) {
        console.log("directory doesn't exist, creating...");
        await FileSystem.makeDirectoryAsync(synthesisDirectory, {
            intermediates: true,
        });
    }
}

export { getSynthesisBytes, play };
