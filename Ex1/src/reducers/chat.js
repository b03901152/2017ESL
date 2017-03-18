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

const DF = {
  name: 'action.name',
  msgs: [ defaultMsg ],
  groupID: 1000,
};

const preState = {
  username: 'Myname',
  friendList: [ DF ],
  chatIdx: 0,
};

const chat = ( state = preState, action ) => {
  switch ( action.type ) {
    case 'ADD_FRIEND':
      let newState = clone( state );
      const newFriend = {
          name: action.name,
          msgs: [ defaultMsg ],
          groupID: action.groupID,
      };
      return {
        ...state,
        friendList: [ newFriend, ...state.friendList ],
      };
    case 'SET_USER':
      console.log('set user', action.username);
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
      console.log( 'GET_CHAT', action );
      for ( let FLidx = 0; FLidx < friendList.length; FLidx += 1 )
      {
        if ( friendList[ FLidx ].groupID === action.msg.recipientGroupId )
        {
          friendList[ FLidx ].msgs.push( {
            author: action.msg.name,
            isread: false,
            sentDate: action.msg.sentDate,
            msg: [ action.msg.type, action.msg.text ],
          } );
        };
        return {
          ...state,
          friendList,
        };
      }
      return state;
    case 'SET_CHAT':
      console.log( 'SET_CHAT, action:', action.msg );
      var friendList = clone( state.friendList );
      friendList[ state.chatIdx ].msgs.push( {
        author: state.username,
        isread: true,
        sentDate: new Date(),
        msg: action.msg,
      } );
      fetch( '/setChat', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify( {
          type: action.msg[ 0 ],
          text: action.msg[ 1 ],
          recipientGroupId: friendList[ state.chatIdx ].groupID,
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
