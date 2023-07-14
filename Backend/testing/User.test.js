const axios = require("axios");

// Define the mock data
const MockData = [
  {
    user: {
      _id: "649805cfde864aefe94130b6",
      name: "Kasun b",
      email: "kasun@email.com",
      mobile_no: "3333333333",
      password: "$2b$10$5Y2mUdC7uglDHQkD3BAVDuaYSZ.NQnYMgR4naTYzlVJ3Eldvw4FV.",
      role: "labour",
      accepted: false,
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: null,
  },
  {
    user: {
      _id: "64a719f39206d83b6ac5575a",
      name: "Thisaru Rathnay",
      email: "thisaru@gmail.com",
      mobile_no: "0999999999",
      password: "$2b$10$u07oLFAN4ffP4kNYnuws..CRYHA1nToZhkYwfbnaU4QXN6qs9ofKS",
      role: "supervisor",
      accepted: false,
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: null,
  },
  {
    user: {
      _id: "64a71de5f434fcdfeee605ae",
      name: "ruvi",
      email: "ruvi@gmail.com",
      mobile_no: "0555555555",
      password: "$2b$10$3K5WAm06f7b9jZJ5M3JYjeLRfkFRhLwZQw8O3S.TRYfBSAIgbmtDW",
      role: "admin",
      accepted: false,
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: null,
  },
  {
    user: {
      _id: "64a8e22368e52dc5de60312f",
      name: "akila dimath",
      email: "akiladimath@gmail.com",
      mobile_no: "222222222",
      password: "$2b$10$soURZgPsfkdURpTCnIZBEuNYolEEahdblanK/JwjHvfD9KJgDboZK",
      role: "supervisor",
      accepted: false,
      complainer_type: "other",
      complains: [],
      __v: 0,
    },
    supervisor: {
      _id: "64a8e22368e52dc5de603130",
      userID: "64a8e22368e52dc5de60312f",
      work_type: "construction",
      complains: [],
      approved_date: "2023-07-08T04:12:19.666Z",
      __v: 0,
    },
  },
  {
    user: {
      _id: "64a8e29d68e52dc5de603136",
      name: "pathum perera",
      email: "pathumperera@gmail.com",
      mobile_no: "8888888888",
      password: "$2b$10$/A3U2bE15a06jeCab0Ez1.jUclec7.H3Ex01cE52l7BcPKWBeepLK",
      role: "supervisor",
      accepted: false,
      complainer_type: "other",
      complains: [
        "64ae5b6a473721dc8247ca5c",
        "64ae5b6d473721dc8247ca5f",
        "64ae5b9a473721dc8247ca62",
        "64ae5ba0473721dc8247ca65",
      ],
      __v: 0,
    },
    supervisor: {
      _id: "64a8e29d68e52dc5de603137",
      userID: "64a8e29d68e52dc5de603136",
      work_type: "cutting",
      complains: [],
      approved_date: "2023-07-08T04:14:21.807Z",
      __v: 0,
    },
  },
];
// get the data
test("API should return the mock data", async () => {
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
const axios = require("axios");

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
