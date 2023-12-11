import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
} from "react-native";


import {signIn, signUp} from "../partials/auth"
import { ScrollView } from "react-native-gesture-handler";

export default function Auth() {
    const [email, setEmaiil] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                {/* <Image
                    style={styles.logo}
                    source={require('../../assets/geabaire-logo.png')}
                /> */}
                <Text style={styles.logo}>Geabaire</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.formInstruction}>
                    Login or Sign Up to continue.
                </Text>
                <View style={styles.fields}>
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Email</Text>
                        <TextInput
                            placeholder="Email"
                            style={styles.fieldInput}
                            value={email}
                            onChangeText={setEmaiil}
                        />
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Password</Text>
                        <TextInput
                            placeholder="Password"
                            style={styles.fieldInput}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonActive]}
                            onPress={() => {
                                signUp(email, password);
                            }}
                        >
                            <Text style={styles.buttonActiveText}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                signIn(email, password);
                            }}
                        >
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        padding: 15
    },
    logo: {
        // height: 120 * 0.6,
        // width: 300 * 0.6,
        // paddingBottom: 12
        marginTop: 20,
        fontSize: 40,
        paddingBottom: 50,
        color: "#03BD9D",
        fontWeight: "bold"
    },
    formInstruction: {
        textAlign: "center",
        fontSize: 18,
        paddingBottom: 2
    },
    formContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 12,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 12,
        margin: 3,
        borderColor: "#EEE",
        borderWidth: 1,
        borderRadius: 12,
    },
    fields: {

    },
    field: {
        flexDirection: "row",
        padding: 6,
        alignItems: "center"
    },
    fieldLabel: {
        minWidth: 130
    },
    fieldInput: {
        borderColor: "#EEE",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 12,
        width: 250
    },
    button: {
        margin: 6,
        padding: 12,
        borderColor: "#EFEFEF",
        borderWidth: 1,
        borderRadius: 6,
        width: 200,
        maxWidth: 200,
        textAlign: "center",
    },
    buttonActive: {
        backgroundColor: "#03BD9D"
    },
    buttonActiveText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    actions: {
        alignItems: "center"
    }
});