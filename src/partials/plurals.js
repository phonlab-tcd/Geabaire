const PLURAL_API_LINK="https://phoneticsrv3.lcs.tcd.ie/bunamo?input=%WORD%&form=plNom"

export const getPluralOf = async (word) => {
    const link = PLURAL_API_LINK.replace("%WORD%", encodeURIComponent(word));

    const response = await fetch(link);

    // Api returns it as an array with one element
    const body = await response.json();
    const value = body[0];

    if (!(typeof value === "string")) {
        console.log("[getPluralOf] Plural not found")
        return null;
    }

    return value;
}