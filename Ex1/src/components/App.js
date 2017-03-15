import React from 'react';
import LoginContainer from '../containers/LoginContainer';
import SignupContainer from '../containers/SignupContainer';
import ChatContainer from '../containers/ChatContainer';

const App = ( { loc } ) => {
  if ( loc === 'login' )
    return <LoginContainer />;
  else if ( loc === 'signup' )
    return <SignupContainer/>;
  else if ( loc === 'chat' )
    return <ChatContainer/>;
  return <LoginContainer />;
};

export default App;
