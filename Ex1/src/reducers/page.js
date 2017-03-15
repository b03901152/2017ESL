const preState = { 
  loc: 'login',
};


const page = (state = preState, action) => {
  switch (action.type) {
    case 'SET_LOC':
      return {
      	loc: action.loc
      };
    default:
      return state;
  }
}

export default page;
