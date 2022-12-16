import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { regionState, speakerState, synthTypeState, voicesState } from "../atoms/voices";
import useSettings from "./useSettings";

export default function useVoices() {
    // Settings state
    let settings = useSettings(); 
    let [voices, setVoices] = useRecoilState(voicesState);
    let [region, setRegion] = useRecoilState(regionState);
    let [speaker, setSpeaker]  = useRecoilState(speakerState);
    let [synthType, setSynthType] = useRecoilState(synthTypeState);

    async function loadVoices(loadedSettings) {
        let res = await axios({
            method: 'get',
            url: 'https://abair.ie/api2/meta',
        })

        setVoices(res.data.data);
        if (loadedSettings && loadedSettings.voice && loadedSettings.voice !== "") { 
            let voice = res.data.data.filter(v => v.voicenames.includes(loadedSettings.voice))[0];
            setRegion(voice.locale);
            setSpeaker(voice.name);
            setSynthType(voice.voices[voice.voicenames.indexOf(loadedSettings.voice)])
        }
    }

    return {
        getAvailableRegions: () => {
            if (voices === null) { 
                return [];
            }

            let uniqueRegions = Array.from(new Set(voices.map(item => item.locale)));
            
            return uniqueRegions.map(item => {
                return {label: item, value: item}
            })
        },
        getAvailableSpeakers: () => { 
            if (voices === null) { 
                return [];
            }

            return voices.filter(voice => voice.locale === region).map(item => {
                return {label: item.name, value: item.name}
            })
        },
        getAvailableSynths: () => {
            if (voices === null) { 
                return [];
            }

            return voices.filter(voice => voice.name === speaker)[0].voices.map(item => { 
                return {label: item, value: item}
            });
         },
        getVoiceString: () => {
            if (voices === null) { 
                return [];
            }

            let voiceProfile = voices.filter(voice => voice.name === speaker)[0];
            
            let voiceString = voiceProfile.voicenames[voiceProfile.voices.indexOf(synthType)];

            if (settings.getSettings().voice !== voiceString) { 
                settings.setVoice(voiceString);
            }

            return voiceString;


         },
        voices, loadVoices, region, speaker, synthType
    }
}