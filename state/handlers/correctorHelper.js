import axios from "axios";
import FormData from "form-data";

const getCorrectedText = async (text) => {
    let data = new FormData();
    data.append("text", text);

    var config = {
        method: "post",
        url: "https://abair.ie/aac_irish/corrector",
        data: data,
    };

    let res = await axios(config);
    return res.data.text[0];
};

export { getCorrectedText };
