import FAIcon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { regions_en, speakerProfiles, speakerOptions, getSpeakerAndRegion, getCodeByRegionSpeakerAndModel } from '../../partials/synthesis';
import DropdownEntry from '../../components/settings/DropdownEntry';
import SliderEntry from '../../components/settings/SliderEntry.jsx';
import SwitchEntry from '../../components/settings/SwitchEntry.jsx';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import useSettings from '../../state/hooks/useSettings.js';

export default function BoardSettingsScreen({ navigation, route: { params: { boardId } } }) {
    const [region, setRegion] = useState();
    const [speaker, setSpeaker] = useState();
    const [type, setType] = useState();

    const {settings, initialSettings, updateSetting} = useSettings();
    let synthTypes = [];

    if (speaker) {
        synthTypes = Object.entries(speakerProfiles(speaker).codes).map(([label, value]) => ({ label, value }));
    }

    // Sets the initial value of the speaker/region
    useEffect(() => {
        if (settings && (!region || !speaker)) {
            const {speakerName, regionName, type: modelType} = getSpeakerAndRegion(settings.voice);
            console.log(speakerName, regionName, modelType);
            setSpeaker(speakerName);
            setRegion(regionName);
            setType(modelType);
        }
    }, [])

    // Updates the code 
    useEffect(() => {
        // If they are all defined
        if (region && speaker && type) {
            const code = getCodeByRegionSpeakerAndModel(region, speaker, type);
            if (code != null) {
                console.log("[useSettings] Updating voice.")
                updateSetting("voice", code);
            }
        }
    }, [region, speaker, type])

    useFocusEffect(
        useCallback(() => {
          return () => {
            // On unload: update settings
            if (JSON.stringify(settings) !== JSON.stringify(initialSettings)) {
                console.log("[useSettings] Left settings screen, updating changes in database.")
                console.log(initialSettings, settings)

            }
          };
        }, [])
      );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerLabel}>Board Settings</Text>
                <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigation.toggleDrawer()}>
                    <FAIcon
                        name="bars"
                        size={30}
                        color="#F2F2F2"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.settingsContainer}>
                <View style={styles.settingsGroup}>
                <Text style={styles.warning}>Note: The settings menu is currently non-operational. This will be addressed in an update later in January.</Text>
                    <Text style={styles.settingsHeaderLabel}>
                        Text to Speech Settings
                    </Text>
                    <Text style={styles.settingsExplaination}>
                        Configure the text speech synthesiser by region, speaker, speed, pitch et cetera.
                    </Text>
                    <DropdownEntry
                        title="Region"
                        value={region}
                        setValue={setRegion}
                        data={regions_en}
                    />
                    {region &&
                        <DropdownEntry
                            title="Speaker"
                            value={speaker}
                            setValue={setSpeaker}
                            data={speakerOptions(region)}
                        />
                    }
                    {speaker &&
                        <DropdownEntry
                            title="Type"
                            value={type}
                            setValue={setType}
                            data={synthTypes}
                        />
                    }

                    <SliderEntry
                        title="Speed"
                        value={settings.speed}
                        setValue={(value) => updateSetting("speed", value)}
                        min={0.1}
                        max={1.5}
                        step={0.1}
                    />

                    <SliderEntry
                        title="Pitch"
                        value={settings.pitch}
                        setValue={(value) => updateSetting("pitch", value)}
                        min={0.1}
                        max={1.5}
                        step={0.1}
                    />

                    <Text>Voice: {settings.voice}</Text>
                </View>

                <View style={styles.settingsGroup}>
                    <Text style={styles.settingsHeaderLabel}>
                        Interface Settings
                    </Text>
                    <Text style={styles.settingsExplaination}>
                        Change how the interface reacts to the user.
                    </Text>
                    <SwitchEntry
                        title="Say each pressed button"
                        value={settings.doSpeakEachWord}
                        setValue={(value) => updateSetting("doSpeakEachWord", value)}
                    />
                    <SwitchEntry
                        title="Speak full sentences after delay"
                        value={settings.doSpeakFullSentence}
                        setValue={(value) => updateSetting("doSpeakFullSentence", value)}
                    />
                    <SwitchEntry
                        title="Show images in home bar"
                        value={settings.doShowImagesInHomeBar}
                        setValue={(value) => updateSetting("doShowImagesInHomeBar", value)}
                    />
                    <SliderEntry
                        title="Sentence Delay"
                        value={settings.speakSentenceDelay}
                        setValue={(value) => updateSetting("speakSentenceDelay", value)}
                        min={1000}
                        max={15000}
                        step={1000}
                        unit={"ms"}
                    />
                </View>

                {/* <View style={styles.settingsGroup}>
                    <Text style={styles.settingsHeaderLabel}>
                        Corrector Settings
                    </Text>
                    <Text style={styles.settingsExplaination}>
                        Coming Soon.
                    </Text>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F2F2",
        flex: 1
    },
    settingsContainer: {
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 20,
        marginLeft: "auto",
        marginRight: "auto"
    },
    settingsGroup: {
        maxWidth: 500,
        paddingBottom: 15,
        marginBottom: 15,
        borderBottomWidth: 3,
        borderBottomColor: "#DDD"
    },
    header: {
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#6a994e",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8,
    },
    headerLabel: {
        color: "#F2F2F2",
        fontSize: 25,
        marginLeft: 60
    },
    settingsHeaderLabel: {
        color: "#010B13",
        fontSize: 24,
        paddingBottom: 15,
        fontWeight: "bold"
    },
    settingsExplaination: {
        fontSize: 18,
        paddingBottom: 6
    },
    warning: {
        fontSize: 15,
        color: "red",
        textAlign: "center"
    }
})