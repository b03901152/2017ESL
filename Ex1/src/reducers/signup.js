
const signup = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SENTENCE':
      return {
      	sentences: [ ...state.sentences, action.text ]
      };
    default:
      return state;
  }
}

export default signup;
