import { Platform } from "react-native";

let BASE_URL = "";

// // sachira
// if (Platform.OS === "android") {
//     BASE_URL = "http://192.168.8.136:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://192.168.171.74:3000/api/v1/" // for ios emulator
// }

//nadun mobile
if (Platform.OS === "android") {
    BASE_URL = "http://192.168.8.144:3000/api/v1/" // for android emulator
} else {
    BASE_URL = "http://192.168.171.74:3000/api/v1/" // for ios emulator
}

// // //nadun wifi

// if (Platform.OS === "android") {
//     BASE_URL = "http://192.168.8.101:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://192.168.171.74:3000/api/v1/" // for ios emulator
// }





// if (Platform.OS === "android") {
//     BASE_URL = "http://10.102.13.22:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://192.168.171.74:3000/api/v1/" // for ios emulator
// }

export default BASE_URL;