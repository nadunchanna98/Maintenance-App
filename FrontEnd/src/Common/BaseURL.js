import { Platform } from "react-native";

let BASE_URL = "";

if (Platform.OS === "android") {
    BASE_URL = "http://192.168.8.136:3000/api/v1/" // for android emulator
} else {
    BASE_URL = "http://192.168.171.74:3000/api/v1/" // for ios emulator
}



export default BASE_URL;