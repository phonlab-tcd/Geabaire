import { Image, ImageBackground } from "expo-image";
import { useState } from "react";
import { Linking } from "react-native";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import LogIn from "../components/auth/LogIn";
import SignUp from "../components/auth/SignUp";
import { ScrollView } from "react-native-gesture-handler";
import { signIn, signUp } from "../partials/auth";

// Background and logo images
const backgroundImage = require("../assets/auth-bg.png")
const abairLogo = require("../assets/abair.ie_logo.png")

// Function to open a link in browser
const openLink = (link) => () => Linking.openURL(link)

export default function AuthScreen() {
    // State variables
    const [isLogin, setIsLogin] = useState(true); // Indicates whether the user is in login or signup mode
    const [notice, setNotice] = useState(""); // Notice message to display
    const [noticeColor, setNoticeColor] = useState("red"); // Colour of the notice message

    const urlParams = new URLSearchParams(window.location.search);

    // ?email=demo%40abair.ie&password=demo&autologin=true&board=1_4584228
    const emailParam = urlParams.get("email")
    const passwordParam = urlParams.get("password")
    const autologinParam = urlParams.get("autologin")

    // Auto-login if parameters are provided
    if (emailParam && passwordParam && autologinParam && autologinParam === "true") {
        signIn(emailParam, passwordParam);
    }

    // Function to handle form submission
    const submit =  async (props) => {
        // Login case
        // If they login successfully it'll automatically remove the authscreen component.
        const {email, password} = props;
        if (isLogin) {

            const error = await signIn(email, password);

            if (error) {
                setNotice(error.message);
                setNoticeColor("red");
            }

            return;
        }

        // Sign up case
        const {inviteCode, can_contact, name, guardian} = props;
        await signUp(email, password, inviteCode, can_contact, name, guardian, () => setIsLogin(prev => !prev))

        console.log("sign up")
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.bgImage} resizeMethod="resize">
                <View style={styles.loginCard}>
                    <ScrollView >
                        <View style={styles.logo}>
                            <Text style={styles.title}>Geabaire</Text>
                            <Text style={styles.subtitle}>Voice as a vehicle for change.</Text>
                        </View>

                        {isLogin ? (
                            <LogIn
                                change={() => setIsLogin(prev => !prev)}
                                submit={submit}
                                notice={notice}
                                setNotice={setNotice}
                                noticeColor={noticeColor}
                                setNoticeColor={setNoticeColor}
                            />
                        ) : (
                            <SignUp
                                change={() => setIsLogin(prev => !prev)}
                                submit={submit}
                                notice={notice}
                                setNotice={setNotice}
                                noticeColor={noticeColor}
                                setNoticeColor={setNoticeColor}
                            />
                        )}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={openLink("https://abair.ie")}>
                            <Image source={abairLogo} style={{ width: 102, height: 79 }} resizeMethod="resize" />
                        </TouchableOpacity>
                        <Text style={styles.bottomInfo}>Geabaire is an Augmentative and Alternative Communication Tool for the Irish language.</Text>
                        <Text style={styles.legal}>
                            <TextAnchor text="Privacy Policy" link="https://abair.ie/en/geabaire/privacy" /> {"        "}
                            <TextAnchor text="Support" link="https://abair.ie/en/geabaire/support" />
                        </Text>
                    </View>
                </View>



            </ImageBackground>
        </View>
    )
}

// Component for rendering text anchor (clikable link)
const TextAnchor = ({ text, link }) => (
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
    logo: {
      paddingBottom: 40  
    },
    card: {
        marginLeft: "10%",
        marginRight: "10%",
        backgroundColor: "#FFFFFF77",
        flex: 1,
        borderRadius: 12
    },
    loginCard: {
        marginLeft: "auto",
        backgroundColor: "#FFFFFF",
        flex: 1,
        flexGrow: 1,
        width: "50%",
        padding: 45,
        paddingBottom: 20,
        paddingTop: 20
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