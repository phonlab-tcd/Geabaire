import { ButtonGroup, CheckBox } from "@rneui/base";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import InformationSheet from "./InformationSheet";

export default function SignUp({ email, password, setEmail, setPassword, submit, change }) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [is1Checked, set1Checked] = useState(false);
    const [is2Checked, set2Checked] = useState(false);
    const [is3Checked, set3Checked] = useState(false);
    const [is4Checked, set4Checked] = useState(false);
    const [is5Checked, set5Checked] = useState(false);
    const [is6Checked, set6Checked] = useState(false);

    const canSignUp = is1Checked && is2Checked && is3Checked && is4Checked && is5Checked && is6Checked;
    console.log(canSignUp)
    return (
        <View>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>I am...</Text>
            <ButtonGroup
                buttons={['Over 16', 'Under 16']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />
            {selectedIndex == 1 && (
                <Text style={styles.ageNotice}>
                    If you are under 16, a parent of guardian must sign up on your behalf.
                </Text>
            )}

            {selectedIndex >= 0 && (
                <View style={styles.signUpCard}>
                    <InformationSheet type={selectedIndex === 0 ? "user" : "parent"} />
                    <View style={styles.form}>
                        <Text style={styles.formLabel}>Email Address</Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder="user@abair.ie"
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.formLabel}>Password</Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder="Password"
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                            autoCapitalize="none"
                        />
                    </View>

                    <View>
                        <CheckBox 
                            title="I confirm that I have read and understood the Information Leaflet." 
                            checked={is1Checked}
                            onPress={() => set1Checked(prev => !prev)}
                        />
                        <CheckBox 
                            title="I understand that joining ABAIR and using the platform is entirely voluntary. I understand that not taking part will have no negative impact on me. " 
                            checked={is2Checked}
                            onPress={() => set2Checked(prev => !prev)}
                        />
                        <CheckBox 
                            title="I understand that I can stop using the platform and close my account at any time without giving a reason. I understand that doing so will not affect me in any negative manner." 
                            checked={is3Checked}
                            onPress={() => set3Checked(prev => !prev)}
                        />
                        <CheckBox 
                            title="I know how to contact the research team if I need to." 
                            checked={is4Checked}
                            onPress={() => set4Checked(prev => !prev)}
                        />
                        <CheckBox 
                            title="I agree to take part in this research study, having been fully informed of the risks and benefits in the Information Sheet." 
                            checked={is5Checked}
                            onPress={() => set5Checked(prev => !prev)}
                        />
                        <CheckBox 
                            title="I agree to the use of data collected from my use of ABAIR, including voice recordings (from use of speech recognition), and basic demographic information about me (e.g. sex, birth year, linguistic background) being used by the research team for this research project as described in the Information Sheet. "
                            checked={is6Checked}
                            onPress={() => set6Checked(prev => !prev)}
                        />


                    </View>

                    <View>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "#03BD9D" }]} onPress={submit} disabled={!canSignUp}>
                            <Text style={styles.buttonLabel}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button]} onPress={change}>
                            <Text style={styles.buttonLabel}>Already have an account? Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    subtitle: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 15,
        marginBottom: 10
    },
    form: {
        paddingTop: 15,
        paddingLeft: 15
    },
    formLabel: {
        fontSize: 22,
        paddingBottom: 5,
        fontWeight: 700
    },
    formInput: {
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 20,
        paddingLeft: 5,
        marginRight: 15,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#AAAAAA"
    },
    ageNotice: {
        fontSize: 16,
        color: "red",
        fontWeight: "bold",
        textAlign: "center",
        paddingBottom: 20
    },
    signUpCard: {
        paddingTop: 15,
        paddingBottom: 15
    },
    button: {
        alignSelf: "center",
        width: 300,
        paddingTop: 15,
        paddingBottom: 15,
        borderWidth: 1,
        margin: 10,
        borderRadius: 12,
        borderColor: "#AAAAAA"
    },
    buttonLabel: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    }
});