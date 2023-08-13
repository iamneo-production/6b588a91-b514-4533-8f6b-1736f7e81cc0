import axios from "axios";

export default axios.create({
    baseURL: "https://ide-babdaaeeeddeedfdaccfddfbbffeeeeebdccddc.project.examly.io/proxy/8080",
    headers: {
        "Content-type": "application/json"
    }
});
