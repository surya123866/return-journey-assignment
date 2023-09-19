const initialState = {
  userData: [
    {
      id: "abcdef123",
      name: "John Doe",
      number: "1234567890",
      level: "Easy",
    },
    {
      id: "ghijkl456",
      name: "Jane Smith",
      number: "9876543210",
      level: "Medium",
    },

    {
      id: "mnopqr789",
      name: "David Johnson",
      number: "5555555555",
      level: "Hard",
    },

    {
      id: "stuvwx101",
      name: "Emily Wilson",
      number: "9998887777",
      level: "Easy",
    },
  ],
  currentUserData: {
    id: "mnopqr789",
    name: "David Johnson",
    number: "5555555555",
    level: "Hard",
  },
  scoreData: [
    { name: "John", level: "Easy", time: 20 },
    {
      name: "Alice",
      level: "Medium",
      time: 15,
    },

    {
      name: "Bob",
      level: "Hard",
      time: 30,
    },

    {
      name: "Emily",
      level: "Medium",
      time: 25,
    },
    {
      name: "Sarah",
      level: "Hard",
      time: 40,
    },

    {
      name: "Michael",
      level: "Medium",
      time: 18,
    },
    {
      name: "Olivia",
      level: "Easy",
      time: 22,
    },
    {
      name: "Emma",
      level: "Medium",
      time: 25,
    },

    {
      name: "Daniel",
      level: "Hard",
      time: 35,
    },

    {
      name: "Sophia",
      level: "Easy",
      time: 15,
    },
  ],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER_DATA":
      // Update state
      const newUserData = {
        ...state,
        userData: [...state.userData, action.payload],
        currentUserData: action.payload,
      };

      // Update local storage with the new state
      localStorage.setItem("userData", JSON.stringify(newUserData));

      return newUserData;

    case "ADD_SCORE_DATA":
      // Update state
      const newScoreData = {
        ...state,
        scoreData: [...state.scoreData, action.payload],
      };

      // Update local storage with the new state
      localStorage.setItem("gameState", JSON.stringify(newScoreData));

      return newScoreData;

    default:
      return state;
  }
};

export default gameReducer;
