import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function LogIn({ email, password, setEmail, setPassword, submit, change }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>

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
                    placeholder="gggggggggg"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                    autoCapitalize="none"
                />
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={submit}>
                    <Text style={styles.buttonLabel}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {backgroundColor: "#03BD9D"}]} onPress={change}>
                    <Text style={styles.buttonLabel}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15 
    },
    header: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: 20
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
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#AAAAAA"
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