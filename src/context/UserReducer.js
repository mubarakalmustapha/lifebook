export default function currentUserReducer(state, action) {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          followings: [...state.currentUser.followings, action.payload],
        },
      };

    case 'UNFOLLOW':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          followings: state.currentUser.followings.filter(
            (f) => f !== action.payload
          ),
        },
      };
  }
}
