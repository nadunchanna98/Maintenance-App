const axios = require("axios");

// Define the mock data
const MockData = [
  {
    user: {
      profileImage: null,
      token: null,
      _id: "64afa540e33270c062fd4892",
      name: "Pumudu sanchana",
      email: "pumudu@gmail.com",
      mobile_no: "0444444444",
      password: "$2b$10$dksrJPNXOf389/kEYupwsOksQrwBeNIt7ZZVucnLhZwodkwGD4uUG",
      role: "labour",
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: null,
  },
  {
    user: {
      profileImage: null,
      token: null,
      _id: "64afaa7be42188ce74916812",
      name: "Imakla madu",
      email: "imalka@gmail.com",
      mobile_no: "0888888888",
      password: "$2b$10$R2gMqp/u/wByChSMggYo/uGjIgN1Uc6.hGHzQTteAWSVgv2ISxgJC",
      role: "supervisor",
      complainer_type: "other",
      complains: [
        "64b4d0598f5f38bab8bcc19b",
        "64b4d0798f5f38bab8bcc19e",
        "64b4d0978f5f38bab8bcc1a2",
        "64b4d0a98f5f38bab8bcc1a5",
        "64b4d0cf8f5f38bab8bcc1bd",
        "64b4d116ea8c351997793d86",
        "64b4d14bea8c351997793d8f",
        "64b4d163ea8c351997793da3",
        "64b4d1b2ea8c351997793daa",
      ],
      __v: 0,
    },
    supervisor: {
      work_type: "not a specified work type",
      _id: "64afaa93e42188ce74916822",
      userID: "64afaa7be42188ce74916812",
      approvedby: "64a8ea45b1bcd10012052b55",
      approved_date: "2023-07-13T07:41:07.899Z",
      requested_date: "2023-07-13T07:40:43.666Z",
      complains: ["64a6fe8f00de6dff16314f3e", "64a6fe8f00de6dff16314f3e"],
      __v: 2,
    },
  },
  {
    user: {
      profileImage: null,
      token: null,
      _id: "64b0c3059a4a523f7595fc8d",
      name: "Nipun Harsha",
      email: "test@gmail.com",
      mobile_no: "0717963047",
      password: "$2b$10$KE.4zASVPS5ksjD/r8ZaFOvaTPYJOMnbR1v2sMHeE3CtEbF3r9g36",
      role: "supervisor",
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: {
      work_type: "not a specified work type",
      _id: "64b0c3339a4a523f7595fc9e",
      userID: "64b0c3059a4a523f7595fc8d",
      approvedby: "64a8ea45b1bcd10012052b55",
      approved_date: "2023-07-14T03:38:27.491Z",
      requested_date: "2023-07-14T03:37:41.837Z",
      complains: [],
      __v: 0,
    },
  },
  {
    user: {
      profileImage: null,
      token: null,
      _id: "64b16118ad6741b2676c373c",
      name: "Test",
      email: "test@email.com",
      mobile_no: "0987654321",
      password: "$2b$10$gFWuJi6jvbLZHRxQ4ovKnOiLsxzTH8Y30xhBGO1agkp7AkvWhhh.q",
      role: "supervisor",
      accepted: false,
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: {
      work_type: "not a specified work type",
      _id: "64b58296fcf1017037b07c19",
      userID: "64b16118ad6741b2676c373c",
      approvedby: "64a8ea45b1bcd10012052b55",
      approved_date: "2023-07-17T18:04:06.270Z",
      requested_date: "2023-07-17T18:04:06.267Z",
      complains: [],
      __v: 0,
    },
  },
  {
    user: {
      profileImage: null,
      token: null,
      _id: "64b9342ea9525e697dff88f6",
      name: "Chamath perera",
      email: "chmath@gmail.com",
      mobile_no: "0778899445",
      password: "$2b$10$95YWigNi5w677vkJ1vnvZ.p5zWj9qjS0M.OLoFm6bM9hhI6fih7Qq",
      role: "supervisor",
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: {
      work_type: "not a specified work type",
      _id: "64b93443a9525e697dff8908",
      userID: "64b9342ea9525e697dff88f6",
      approvedby: "64a71de5f434fcdfeee605ae",
      approved_date: "2023-07-20T13:18:59.742Z",
      requested_date: "2023-07-20T13:18:38.101Z",
      complains: [],
      __v: 0,
    },
  },
  {
    user: {
      profileImage: null,
      token: null,
      _id: "64b94fa274708ce7b1b02b93",
      name: "Nagul nagul",
      email: "nagul@gmail.com",
      mobile_no: "0111222333",
      password: "$2b$10$lqsWqgMn/SmiTfE4v/9EluLE9SztSkpM0N5KJeLS6pk2CE6wH6Zyu",
      role: "supervisor",
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: {
      _id: "64bad4d69b380325c84c9cb8",
      userID: "64b94fa274708ce7b1b02b93",
      work_type: "Water",
      approvedby: "64a8ea45b1bcd10012052b55",
      approved_date: "2023-07-21T18:56:22.079Z",
      requested_date: "2023-07-20T15:15:46.108Z",
      complains: [],
      __v: 0,
    },
  },
  {
    user: {
      profileImage: null,
      token: null,
      _id: "64b9510d74708ce7b1b02bfd",
      name: "Charaka viduranga",
      email: "charaka@gmail.com",
      mobile_no: "0444555666",
      password: "$2b$10$tWHzRD6XyhH.hW8zIjI1xuA8UCmCMBVfP/YfnsZS/zRMwnskCQ0ty",
      role: "supervisor",
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: {
      _id: "64bad4d09b380325c84c9cae",
      userID: "64b9510d74708ce7b1b02bfd",
      work_type: "Electric ",
      approvedby: "64a8ea45b1bcd10012052b55",
      approved_date: "2023-07-21T18:56:16.346Z",
      requested_date: "2023-07-20T15:21:49.367Z",
      complains: [],
      __v: 0,
    },
  },
  {
    user: {
      profileImage: null,
      token: null,
      _id: "64b953c87e340ce6ee954843",
      name: "Aruna kumara",
      email: "aruna@gmail.com",
      mobile_no: "0222555888",
      password: "$2b$10$05pwdHrBx2.9mBALiDF2geM.vkbxABXrAu68bOSIROHAXupUbq4TO",
      role: "labour",
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: null,
  },
  {
    user: {
      profileImage: null,
      token: null,
      _id: "64bad53a9b380325c84c9d24",
      name: "Anuka Mithara Karunanayaka",
      email: "abc@gmail.con",
      mobile_no: "0774268103",
      password: "$2b$10$AgoJWCovN6ohNDymB6VCHeOcHsbii.XvsFR27CfcE371OxtUv5FAm",
      role: "supervisor",
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: {
      _id: "64bad72b9b380325c84c9d3c",
      userID: "64bad53a9b380325c84c9d24",
      work_type: "Pipeline",
      approvedby: "64a8ea45b1bcd10012052b55",
      approved_date: "2023-07-21T19:06:19.453Z",
      requested_date: "2023-07-21T18:58:02.857Z",
      complains: [],
      __v: 0,
    },
  },
];
// get the data
/*test("API should return the mock data", async () => {
  const response = await axios.get("http://localhost:3000/api/v1/users");
  const users = response.data;
  console.log(users);
  let matchFound = false;
  for (let i = 0; i < MockData.length; i++) {
    matchFound = false;
    for (let j = 0; j < users.length; j++) {
      if (users[j].user._id == MockData[i].user._id) {
        matchFound = true;
        break;
      }
    }
    expect(matchFound).toBe(true);
  }
});

//delete data

test("API should return the mock data", async () => {
  const getResponse = await axios.get("http://localhost:3000/api/v1/users");
  const Users = getResponse.data;

  const userIdToDelete = Users[0].user._id;

  await axios.delete(
    `http://localhost:3000/api/v1/users/user/${userIdToDelete}`
  );

  const updated = await axios.get("http://localhost:3000/api/v1/users");

  const updatedUsers = updated.data;

  const matchFound = updatedUsers.some(
    (user) => user.user._id === userIdToDelete
  );

  expect(matchFound).toBe(false);
});

// install axios

///login page
test("API should return the mock data", async () => {
  const giveResponse = {
    mobile_no: "8888888888",
    password: "123",
  };
  const respons = await axios.post(
    "http://localhost:3000/api/v1/users/login",
    giveResponse
  );

  const mockResponse = {
    status: 200,
    data: {
      token: "mocked_token",
      user: {
        userId: "user_id",
        name: "John Doe",
        email: "john@example.com",
        mobile_no: "valid_user_mobile",
        role: "user",
      },
    },
  };
  if (respons === mockResponse) {
    matchFound = true;
  } else {
    matchFound = false;
  }
  expect(matchFound).toBe(false);
});*/

/// get data users by id
test("API should return the mock data", async () => {
  const respons = await axios.get(
    "https://maintenance-app-m996.onrender.com/api/v1/users/user/64afa540e33270c062fd4892"
  );
  const users = respons.data;
  //console.log(users);
  let matchFound = false;
  for (let i = 0; i < MockData.length; i++) {
    matchFound = false;
    if (users._id == MockData[i].user._id) {
      matchFound = true;
      break;
    }
    expect(matchFound).toBe(true);
  }
});
