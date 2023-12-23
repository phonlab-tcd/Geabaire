import { Image, ImageBackground } from "expo-image";
import { useState } from "react";
import { Linking } from "react-native";
import { StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import LogIn from "../components/auth/LogIn";
import SignUp from "../components/auth/SignUp";
import { ScrollView } from "react-native-gesture-handler";
import { signIn } from "../partials/auth";

const backgroundImage = require("../assets/auth-bg.png")
const abairLogo = require("../assets/abair.ie_logo.png")

const openLink = (link) => () => Linking.openURL(link)

export default function AuthScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const submit = () => {
        if (isLogin) {
            signIn(email, password);
            return;
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.bgImage} resizeMethod="resize">
                <ScrollView style={styles.loginCard}>
                    <View>
                        <Text style={styles.title}>Geabaire</Text>
                        <Text style={styles.subtitle}>Voice as a vehicle for change.</Text>
                    </View>

                    {isLogin ? (
                        <LogIn
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            change={() => setIsLogin(prev => !prev)}
                            submit={submit}
                        /> 
                    ) : (
                        <SignUp
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            change={() => setIsLogin(prev => !prev)}
                            submit={() => {}}
                        />
                    )}

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={openLink("https://abair.ie")}>
                            <Image source={abairLogo} style={{width: 102, height: 79}} resizeMethod="resize"/>
                        </TouchableOpacity>
                        <Text style={styles.bottomInfo}>Geabaire is an Augmentative and Alternative Communication Tool for the Irish language.</Text>
                        <Text style={styles.legal}>
                            <TextAnchor text="Privacy Policy" link="https://abair.ie/en/geabaire/privacy"/> {"        "}
                            <TextAnchor text="Support" link="https://abair.ie/en/geabaire/support"/>
                        </Text>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const TextAnchor = ({text, link}) => (
    <TouchableOpacity onPress={openLink(link)}>
        <Text style={styles.legalLink}>{text}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        flexGrow: 1,
        alignItems: "center",
    },
    card: {
        marginLeft: "10%",
        marginRight: "10%",
        backgroundColor: "#FFFFFF77",
        flex: 1,
        borderRadius: 12
    },
    loginCard: {
        marginTop: 80,
        marginBottom: 80,
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: "#F9F6EE",
        borderRadius: 12,
        flex: 1,
        flexGrow: 1,
        width: "50%"
    },
    title: {
        paddingTop: 20,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: "#03BD9D"
    },
    subtitle: {
        textAlign: "center",
        fontSize: 17
    },
    footer: {
        marginTop: "auto",
        paddingBottom: 20,
        alignItems: "center"
    },
    bottomInfo: {
        fontSize: 18,
        textAlign: "center"
    },
    legal: {
        paddingTop: 5,
        alignItems: "center"
    },
    legalLink: {
        fontSize: 16,
        color: "blue",
        textDecorationLine: "underline"
    }
});