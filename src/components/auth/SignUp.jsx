import { ButtonGroup, CheckBox } from "@rneui/base";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import InformationSheet from "./InformationSheet";

/**
 * SignUp component renders the sign-up form and handles user registration.
 * 
 * @param {Object} props - The component props.
 * @param {function} props.submit - Function to handle the sign-up submission.
 * @param {function} props.change - Function to switch to the login screen.
 */
export default function SignUp({ submit, change }) {
    const [name, setName] = useState(""); // State for storing the name
    const [guardian, setGuardian] = useState(""); // State for storing the guardian's email
    const [email, setEmail] = useState(""); // State for storing the email address
    const [password, setPassword] = useState(""); // State for storing the password
    const [inviteCode, setInviteCode] = useState(""); // State for storing the invitation code

    const [selectedIndex, setSelectedIndex] = useState(-1); // State for storing the selected age group
    const [is1Checked, set1Checked] = useState(false); // State for first checkbox
    const [is2Checked, set2Checked] = useState(false); // State for second checkbox
    const [is3Checked, set3Checked] = useState(false); // State for third checkbox
    const [is4Checked, set4Checked] = useState(false); // State for fourth checkbox
    const [is5Checked, set5Checked] = useState(false); // State for fifth checkbox
    const [is6Checked, set6Checked] = useState(false); // State for sixth checkbox
    const [is7Checked, set7Checked] = useState(false); // State for seventh (optional) checkbox

    // Makes sure they have checked all the required check boxes.
    const canSignUp = is1Checked && is2Checked && is3Checked && is4Checked && is5Checked && is6Checked;

    return (
        <View>
            <View style={styles.logo}>
                <Text style={styles.header}>Create an Account</Text>
                <Text style={styles.subheader}>Complete the form below to begin using Geabaire.</Text>
            </View>
            <ButtonGroup
                buttons={['Over 16', 'Under 16']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                }}
                containerStyle={{ marginBottom: 10 }}
            />
            {selectedIndex == 1 && (
                <Text style={styles.ageNotice}>
                    If you are under 16, a parent or guardian must sign up on your behalf.
                </Text>
            )}

            {selectedIndex >= 0 && (
                <View style={styles.signUpCard}>
                    <InformationSheet type={selectedIndex === 0 ? "user" : "parent"} />
                    <View style={styles.form}>
                        <Text style={styles.formLabel}>Name</Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder="Jane Doe"
                            onChangeText={setName}
                            value={name}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.formLabel}>{selectedIndex === 1 ? "User's " : ""}Email Address</Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder="jane.doe@example.com"
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize="none"
                        />
                    </View>

                    {selectedIndex === 1 && (
                        <View style={styles.form}>
                            <Text style={styles.formLabel}>Guardian's Email Address</Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="john.doe@example.com"
                                onChangeText={setGuardian}
                                value={guardian}
                                autoCapitalize="none"
                            />
                        </View>
                    )}

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

                    <View style={styles.form}>
                        <Text style={styles.formLabel}>Invitation Code</Text>
                        <Text>Geabaire is currently in a private beta, an invitation is required to sign up.</Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder="XXXX-XXXX-XXXX"
                            onChangeText={setInviteCode}
                            value={inviteCode}
                            autoCapitalize="none"
                        />
                    </View>


                    <View>
                        <CheckBox
                            title="I confirm that I have read and understood the Information Leaflet. (Required)"
                            checked={is1Checked}
                            onPress={() => set1Checked(prev => !prev)}
                        />
                        <CheckBox
                            title="I understand that joining ABAIR and using the platform is entirely voluntary. I understand that not taking part will have no negative impact on me. (Required)"
                            checked={is2Checked}
                            onPress={() => set2Checked(prev => !prev)}
                        />
                        <CheckBox
                            title="I understand that I can stop using the platform and close my account at any time without giving a reason. I understand that doing so will not affect me in any negative manner. (Required)"
                            checked={is3Checked}
                            onPress={() => set3Checked(prev => !prev)}
                        />
                        <CheckBox
                            title="I know how to contact the research team if I need to. (Required)"
                            checked={is4Checked}
                            onPress={() => set4Checked(prev => !prev)}
                        />
                        <CheckBox
                            title="I agree to take part in this research study, having been fully informed of the risks and benefits in the Information Sheet. (Required)"
                            checked={is5Checked}
                            onPress={() => set5Checked(prev => !prev)}
                        />
                        <CheckBox
                            title="I agree to the use of data collected from my use of ABAIR, including voice recordings (from use of speech recognition), and basic demographic information about me (e.g. sex, birth year, linguistic background) being used by the research team for this research project as described in the Information Sheet. (Required)"
                            checked={is6Checked}
                            onPress={() => set6Checked(prev => !prev)}
                        />
                        <CheckBox
                            title="I wish to be added to a mailing list to hear about Geabaire and Abair developments. (Optional)"
                            checked={is7Checked}
                            onPress={() => set7Checked(prev => !prev)}
                        />
                    </View>

                    <View>
                        <TouchableOpacity style={[styles.button, { backgroundColor: canSignUp ? "#03BD9D" : "#CCCCCC" }]} onPress={canSignUp ? () => submit({email, password, inviteCode, can_contact: is7Checked, name, guardian: selectedIndex === 1 ? guardian : null}) : () => { }} disabled={false}>
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

// Styles for the SignUp component
const styles = StyleSheet.create({
    logo: {
        paddingBottom: 5
    },
    header: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",

    },
    subheader: {
        textAlign: "center",
        fontSize: 18
    },
    form: {
        paddingTop: 15,
        paddingLeft: 15
    },
    formLabel: {
        fontSize: 18,
        paddingBottom: 5,
        fontWeight: 700
    },
    formInput: {
        marginTop: 4,
        marginBottom: 8,
        padding: 8,
        // paddingTop: 15,
        // paddingBottom: 15,
        fontSize: 17,
        paddingLeft: 5,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#AAAAAA"
    },
    ageNotice: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
    },
    signUpCard: {
        paddingTop: 15,
        paddingBottom: 15
    },
    actions: {
        marginTop: 30
    },
    button: {
        alignSelf: "center",
        width: 350,
        paddingTop: 9,
        paddingBottom: 9,
        borderWidth: 1,
        margin: 5,
        marginTop: 8,
        borderRadius: 12,
        borderColor: "#AAAAAA"
    },
    buttonLabel: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    }
});