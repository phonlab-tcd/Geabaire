import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { RaisedButton } from "../../partials/theme";
import { useState } from "react";

/**
 * LogIn component renders the login form and handles user authentication.
 * 
 * @param {Object} props - The component props.
 * @param {function} props.submit - Function to handle the login submission.
 * @param {function} props.change - Function to switch to the sign-up screen.
 */
export default function LogIn({ submit, change }) {
    const [email, setEmail] = useState(""); // State for storing the email address
    const [password, setPassword] = useState(""); // State for storing the password

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.header}>Login</Text>
                <Text style={styles.subheader}>Enter your email address below to log into your account.</Text>
            </View>


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
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.button} onPress={() => submit({email, password})}>
                    <Text style={styles.buttonLabel}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {backgroundColor: "#03BD9D"}]} onPress={change}>
                    <Text style={[styles.buttonLabel, {color: "white"}]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// Styles for the LogIn component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15 
    },
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
        fontSize: 15,
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
    actions: {
        marginTop: 30
    },
    button: {
        alignSelf: "center",
        width: 250,
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
        fontSize: 18,
        fontWeight: "bold"
    }

});