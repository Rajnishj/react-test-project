export const addUsers = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user,
  };
};
