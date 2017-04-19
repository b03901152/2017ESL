var clone = require("deepclone");

const preState = { 
  loc: 'login',
};

const page = (state = preState, action) => {
  switch (action.type) {
    case 'SET_LOC':
      return {
      	loc: action.loc
      };
    case 'LOGOUT':
      console.log( 'logout' );
      fetch( 'auth/logout', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'same-origin',
      } );
      const newState = clone( state );
      newState.loc = 'login';
      return newState;
    default:
      return state;
  }
}

export default page;
