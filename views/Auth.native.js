import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ScrollView
} from "react-native";
import { signIn, signUp } from "../state/handlers/authHandler";

export default function Auth() {
    const [email, setEmaiil] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../assets/geabaire-logo.png')}
                />
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
    },
    logo: {
        height: 120*0.7,
        width: 300*0.7,
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
        borderRadius: 12
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
        widthidth: 70
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

    },
    actions: {
        alignItems: "center"
    }
    // container: {
    //     flex: 1,
    //     backgroundColor: "#141414",
    // },
    // topBar: {
    //     width: "100%",
    //     flexDirection: "row",
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    // topBarText: {
    //     color: "#CCC",
    //     fontSize: 24,
    //     textAlign: "center",
    // },
    // fields: {},
    // field: {},
    // fieldText: {
    //     color: "white",
    //     fontSize: 16,
    //     margin: 16,
    //     marginTop: 3,
    //     marginBottom: 3,
    // },
    // fieldInput: {
    //     color: "white",
    //     backgroundColor: "#181818",
    //     padding: 10,
    //     fontSize: 14,
    //     margin: 16,
    //     marginTop: 3,
    //     marginBottom: 3,
    // },
    // button: {
    //     backgroundColor: "#181818",
    //     margin: 12,
    //     borderRadius: 12,
    //     padding: 10,
    //     paddingTop: 5,
    //     paddingBottom: 5,
    // },
    // buttonText: {
    //     fontSize: 10,
    //     color: "#CCC",
    //     textTransform: "uppercase",
    // },
    // buttonActive: {
    //     backgroundColor: "#709fc5",
    // },
    // buttonActiveText: {
    //     color: "black",
    // },
});
