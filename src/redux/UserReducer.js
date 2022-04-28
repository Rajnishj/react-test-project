const initialState = {
  users: [
    {
      id: 0,
      name: "Raj Kumar",
      number: 1234567890,
      email: "raj123@gmail.com",
      birthday: "1994-04-22",
    },
    {
      id: 1,
      name: "John Doe",
      number: 1234567908,
      email: "john423@gmail.com",
      birthday: "1974-07-09",
    },
    {
      id: 2,
      name: "Will Smith",
      number: 1234097890,
      email: "ws123@gmail.com",
      birthday: "1999-09-01",
    },
  ],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "UPDATE_USER":
      const updateList = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      return {
        ...state,
        users: updateList,
      };
    default:
      return state;
  }
};
