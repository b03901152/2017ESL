import Message from '../DataStructure/Message';
import createFragment from 'react-addons-create-fragment';
var clone = require("deepclone");

const socket = io.connect();
const defaultMsg = new Message(
  'System',
  [
    'text',
    'Welcom to the chat room!',
  ],
  'default isread' );

const DF = {
  name: 'Not fetch success!!',
  msgs: [ defaultMsg ],
  groupID: 1000,
  profilePath: '',
};

const preState = {
  username: 'Myname',
  profilePath: '',
  friendList: [ DF ],
  chatIdx: 0,
};

const chat = ( state = preState, action ) => {
  let friendList;
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
        profilePath: action.profilePath,
      };
    case 'LOAD_FRIEND':
      console.log( 'LOAD_FRIEND' );
      friendList = clone( action.friendList );
      friendList = friendList.sort( ( a, b ) => {
        const bool =  a.msgs[ a.msgs.length - 1 ].sentDate < b.msgs[ b.msgs.length - 1 ].sentDate;
        return bool;
      } );
      console.log( 'friendList.length', friendList.length );
      console.log( 'friendList', friendList );
      console.log( 'friendList[ i ].profilePath', friendList[ 0 ].profilePath );

      for ( let i = 0; i < friendList.length; i++ )
        if ( !friendList[ i ].profilePath )
          friendList[ i ].profilePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFIEASfAWfwM9rdcaZmY3Ylu4xK0YfrrvAZUpMxWswQWZNilg8";
        else
          friendList[ i ].profilePath = 'http://localhost:3000/' + friendList[ i ].profilePath;
      console.log( 'friendList', friendList );
      return {
        ...state,
        friendList,
      };

    case 'SWITCH_FRIEND':
      console.log( 'SWITCH_FRIEND' );
      fetch( '/setLastReadTime', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify( {
          groupID: state.friendList[ action.chatIdx ].groupID,
        } ),
        credentials: 'same-origin',
      } );
      return {
        ...state,
        chatIdx: action.chatIdx,
      };
    case 'GET_CHAT':
      friendList = state.friendList.slice();
      console.log( 'GET_CHAT', action );
      for ( let FLidx = 0; FLidx < friendList.length; FLidx += 1 )
      {
        // console.log( "friendList[ FLidx ].groupID ", friendList[ FLidx ].groupID  );
        // console.log( "friendList.length ", friendList.length, "FLidx",FLidx  );
        // console.log( "action.msg.recipientGroupId ", action.msg.recipientGroupId  );
        if ( friendList[ FLidx ].groupID === action.msg.recipientGroupId )
        {
          // console.log( "push into friend list" );
          friendList[ FLidx ].msgs.push( {
            author: action.msg.name,
            isread: true,
            sentDate: action.msg.sentDate,
            msg: [ action.msg.type, action.msg.text ],
          } );
          return {
            ...state,
            friendList,
          };
        };
      }
      return state;
    case 'SET_CHAT':
      console.log( 'SET_CHAT, action:', action.msg );
      friendList = clone( state.friendList );
      friendList[ state.chatIdx ].msgs.push( {
        author: state.username,
        msg: action.msg,
        sentDate: new Date(),
      } );

      if ( state.chatIdx !== 0 ) {
        console.log( 'swap to first' );
        let tmpFL = friendList[ 0 ];
        friendList[ 0 ] = friendList[ state.chatIdx ];
        friendList[ state.chatIdx ] = tmpFL;
      }

      fetch( '/setChat', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify( {
          type: action.msg[ 0 ],
          text: action.msg[ 1 ],
          recipientGroupId: friendList[ 0 ].groupID,
        } ),
        credentials: 'same-origin',
      } );

      return {
        ...state,
        friendList,
        chatIdx: 0,
      }
    case 'SORT':
      console.log('SORT NOTHING');
      return state;
    case 'SET_GROUP_NAME':
      let friendList = clone( state.friendList );
      friendList[ state.chatIdx ].name = action.name;
      return {
        ...state,
        friendList
      };
    default:
      return state;
  }
}

export default chat;
