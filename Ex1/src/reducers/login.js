const preState = { 
  err: false
};


const login = (state = preState, action) => {
  switch (action.type) {
    case 'SET':
      return {
      	sentences: [ ...state.sentences, action.text ]
      };

    default:
      return state;
  }
}

export default login;
