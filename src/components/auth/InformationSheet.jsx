import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const parentInfo = `
Invitation

Your child/dependant is invited to sign up to the ABAIR platform to access state-of-the-art IRISH speech technologies, play educational games or use language-learning platforms.

What is the purpose of ABAIR?

We develop synthetic voices and speech recognition for Irish and provide them for free to the public. We use these technologies in applications for speakers and learners of Irish.

Does my child/dependant have to sign up?

No. Signing up is voluntary. If you agree for them to sign up, and you or your child/dependant decide to quit, it is simple to delete their data and close their account.

What will happen to my child/dependant if they sign up?

If you and your child/dependant agree to join, they will be able to use all the ABAIR platforms. If they use speech recognition, their voice will be recorded and stored for analysis along with limited personal information about their age, linguistic background, and relationship with the Irish language (if provided). Pseudonymised data (i.e. speech recordings, and limited biographical/language information) will be kept indefinitely for archival purposes, as this may be of interest to future research on the Irish language. However, you may contact ABAIR at any time (details provided below) to request the destruction of all data relating to your child/dependant, and this will be carried out as soon as possible. Storage of data will be restricted to the European Union and countries deemed 'adequate' with regards to data safeguarding.

What are the benefits of taking part?

Your child/dependant will be directly contributing to the development of speech technology for the Irish language. With ABAIR, these resources are being developed with public funding and are made freely available to the public without intention to monetise or privatise.

What are the possible disadvantages and risks of taking part?

Minimal. We advise you to instruct your child/dependant not to divulge personal or sensitive information when recording their voice or composing sentences. The data (including recordings) being collected are not of a sensitive nature. All data will be treated with appropriate care in line with our legal responsibilities.

Will my child/dependant's participation in this study be kept confidential?

Yes. Privacy is important to us. We advise you to tell your child/dependant not to divulge sensitive personal information when using ABAIR which may identify themselves or others. Speech data and limited, scientifically relevant information (such as age, gender, and language background) may be shared internationally with the wider scientific community. However, any information that leaves Trinity will have no association with directly identifiable details.

What will happen to the results of this research?

Information from this research may be presented at conferences and seminars and/or published in scientific papers. If this is the case, your identity will remain confidential.

What do I do if I have any further questions?

If you have any questions or concerns regarding your participation in this research, please contact us at nichiarn@tcd.ie

What is the lawful basis to use my personal data?

The legal basis for processing your child/dependant's personal data comes from the EU General Data Protection Regulation (GDPR). With your consent (Article 6(1)(a) GDPR), their information will only be used for this research which aims in the public interest to improve linguistic knowledge of Irish and develop speech technology with this knowledge (Article 6(1)(e,f) GDPR).

What are my rights in relation to your use of my child/dependant's personal data?

You are entitled to request any of the rights below unless it would make it impossible or very difficult to carry out the research study. The right to access to your child/dependant's personal data; The right to receive a copy of your child/dependant's personal data; The right to ask us to restrict our use of your child/dependant's personal data; The right to ask us to correct inaccurate information about your child/dependant; or The right to ask us to delete your child/dependant's personal data. You are entitled to object to any further processing of the information we hold about your child/dependant (except where it is de-identified). You can exercise these rights or learn more about data protection in relation to this study by contacting the PI at nichiarn@tcd.ie or the Trinity College Data Protection Officer (contact details below). Please note that these rights relate to data which could identify your child/dependant (personal data). If your child/dependant's data has been anonymised, we will not be able to access or delete it as we will have no way of being able to link the data to you.r child/dependant. If you are unhappy with how we have used your child/dependant's personal data, you can raise a concern with the Data Protection Commission via their online form – https://forms.dataprotection.ie/contact – or contact the Commission at: Data Protection Commission, 21 Fitzwilliam Square South, Dublin 2, D02 RD28, Ireland, https://www.dataprotection.ie

Data Protection Officer

Data Protection Officer, Secretary's Office, Trinity College, Dublin, Dublin 2,Ireland, Email: dataprotection@tcd.ie, Website: www.tcd.ie/privacy 
`

const userInfo = `
Invitation

You are invited to sign up to the ABAIR platform to access state-of-the-art IRISH speech technologies, play educational games or use language-learning platforms.

What is the purpose of ABAIR?

We develop synthetic voices and speech recognition for Irish and provide them for free to the public. We use these technologies in applications for speakers and learners of Irish.

Do I have to sign up?

No. Signing up is voluntary. If you sign up, and wish to delete your data and close your account, the process is simple.

What will happen to me if I sign up?

If you agree to join, you will be able to use all the ABAIR platforms. If you use speech recognition, your voice will be recorded and stored for analysis along with limited personal information about your age, linguistic background, and relationship with the Irish language. Your data will be stored between a server in Trinity College and the cloud, in a manner compliant with GDPR. Pseudonymised data (i.e. the speech recording itself, and limited biographical/language information) will be kept indefinitely for archival purposes, as this may be of interest to future research on the Irish language. However, you may contact ABAIR at any time (details provided below) to request the destruction of all data relating to you, and this will be carried out as soon as possible. Storage of your personal data will be restricted to the European Union and countries deemed 'adequate' with regards to data safeguarding.

What are the benefits of taking part?

You will be directly contributing to the development of speech technology for the Irish language. With ABAIR, these resources are being developed with public funding and are made freely available to the public without intention to monetise or privatise.

What are the possible disadvantages and risks of taking part?

Minimal. We advise you not to divulge personal or sensitive information when recording your voice or composing sentences. The data (including recordings) being collected are not of a sensitive nature. All personal data will be treated with appropriate care in line with our legal responsibilities.

Will my participation in this study be kept confidential?

Yes. Your privacy is important to us. We advise not to divulge sensitive personal information when using ABAIR which may identify yourself or others. Speech data and limited, scientifically relevant information (such as age, gender, and language background) may be shared internationally with the wider scientific community. However, any information that leaves Trinity will have no association with your email address.

What will happen to the results of this research?

Information from this research may be presented at conferences and seminars and/or published in scientific papers. If this is the case, your identity will remain confidential.

What do I do if I have any further questions?

If you have any questions or concerns regarding your participation in this research, please contact us at nichiarn@tcd.ie

What is the lawful basis to use my personal data?

The legal basis for processing your personal data comes from the EU General Data Protection Regulation (GDPR). With your consent (Article 6(1)(a) GDPR), your information will only be used for this research which aims in the public interest to improve linguistic knowledge of Irish and develop speech technology with this knowledge (Article 6(1)(e,f) GDPR).

What are my rights in relation to your use of my personal data?

You are entitled to request any of the rights below unless it would make it impossible or very difficult to carry out the research study. The right to access to your personal data; The right to receive a copy of your personal data; The right to ask us to restrict our use of your personal data; The right to ask us to correct inaccurate information about you; or The right to ask us to delete your personal data. You are entitled to object to any further processing of the information we hold about you (except where it is de-identified). You can exercise these rights or learn more about data protection in relation to this study by contacting the PI at nichiarn@tcd.ie or the Trinity College Data Protection Officer (contact details below). Please note that these rights relate to data which could identify you (personal data). If your data has been anonymised, we will not be able to access or delete it as we will have no way of being able to link the data to you. If you are unhappy with how we have used your personal data, you can raise a concern with the Data Protection Commission via their online form – https://forms.dataprotection.ie/contact – or contact the Commission at: Data Protection Commission, 21 Fitzwilliam Square South, Dublin 2, D02 RD28, Ireland, https://www.dataprotection.ie

Data Protection Officer

Data Protection Officer, Secretary's Office, Trinity College, Dublin, Dublin 2,Ireland, Email: dataprotection@tcd.ie, Website: www.tcd.ie/privacy 
`

export default function InformationSheet({type}) {

    const text = type === "parent" ? parentInfo : userInfo;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Consent Form (scroll down)</Text>
            <Text>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        backgroundColor: "#EEEEEE",
    },
    header: {
        fontSize: 18,
        fontWeight: "bold"
    } 
})