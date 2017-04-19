import { connect } from 'react-redux';
import ChatApp from '../components/chat/App';
import Message from '../DataStructure/Message';

const mapStateToProps = ( state ) => ( {
  friendList: state.chat.friendList,
  username: state.chat.username,
  chatIdx: state.chat.chatIdx,
} );


const loadFriend = friendList => {
  console.log( 'loadFriend in container:', loadFriend );
  return {
  type: 'LOAD_FRIEND',
  friendList,
  };
};

const addFriend = ( name, groupID ) => ( {
  type: 'ADD_FRIEND',
  groupID,
  name,
} );

const switchFriend = chatIdx => ( {
  type: 'SWITCH_FRIEND',
  chatIdx,
} );

const setChat = msg => ( {
  type: 'SET_CHAT',
  msg,
} );

const getChat = msg => ( {
  type: 'GET_CHAT',
  msg,
} );

const sort = () => ( {
  type: 'SORT',
} );

const mapDispatchToProps = ( {
  loadFriend,
  addFriend,
  switchFriend,
  setChat,
  getChat,
  sort,
} );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ChatApp );
