const { v4: uuidv4 } = require("uuid");

export const addUser = (formData) => {
  return {
    type: "ADD_USER_DATA",
    payload: {
      id: uuidv4(),
      ...formData,
    },
  };
};
export const addScoreData = (user) => {
  return {
    type: "ADD_SCORE_DATA",
    payload: {
      id: uuidv4(),
      ...user,
    },
  };
};
