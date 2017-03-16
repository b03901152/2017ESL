import Message from '../DataStructure/Message';
import createFragment from 'react-addons-create-fragment';
var clone = require("deepclone");

const socket = io.connect();
const defaultMsg = new Message(
  'you',
  [
    'text',
    'defaultMsg',
  ],
  'default isread' );

const defaultMsg2 = new Message(
  'default author',
  [
    'audio',
    '',
  ],
  'default isread' );

const defaultMsg3 = new Message(
  'default author',
  [
    'vedio',
    'none??',
  ],
  'default isread' );

const defaultMsg4 = new Message(
  'default author',
  [
    'image',
    'index1',
  ],
  'default isread' );


const preState = {
  username: 'Myname',
  friendList: [
    {
      name: 'XXX',
      msgs: [ defaultMsg ],
    },
    {
      name: 'XXX',
      msgs: [ defaultMsg ],
    },
  ],
  chatIdx: 0,
};

const chat = ( state = preState, action ) => {
  switch ( action.type ) {
    case 'ADD_FRIEND':
      let newState = clone( state );
      const friend = {
          name: action.name,
          msgs: [ defaultMsg ],
      };
      console.log( 'newState before', newState );
      newState.friendList.unshift( friend );
      console.log( 'newState after', newState );
      fetch( '/addFriend', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify( { friend } ),
        credentials: 'same-origin',
      } )
      .then( res => res.json() )
      .then( res =>  newState.friendList = res.friendList )
      .then( () => console.log( 'add friend newState:', newState ) );
      return newState;
    case 'SET_USER':
      console.log('set user!!!!', action.username);
      return {
        ...state,
        username: action.username,
      };
    case 'LOAD_FRIEND':
      console.log( 'LOAD_FRIEND' );
      console.log( 'action.friendList:' , action.friendList );
      return {
        ...state,
        friendList: action.friendList,
      };
    case 'SWITCH_FRIEND':
      return {
        ...state,
        chatIdx: action.chatIdx,
      };
    case 'GET_CHAT':
      const friendList = state.friendList.slice();
      friendList[ state.chatIdx ].msgs.push( action.msg );
      return {
        ...state,
        friendList,
      };
    case 'SET_CHAT':
      console.log( 'SET_CHAT' );
      var friendList = state.friendList.slice();
      friendList[ state.chatIdx ].msgs.push( action.msg );
      fetch( '/setChat', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify( {
          msg:action.msg,
          recipient: state.friendList[ state.chatIdx ].name,
        } ),
        credentials: 'same-origin',
      } );
      return {
        ...state,
        friendList,
      }
    case 'SORT':
      return state;
    default:
      return state;
  }
}

export default chat;
