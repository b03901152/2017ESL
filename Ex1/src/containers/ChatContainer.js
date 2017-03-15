import { connect } from 'react-redux';
import ChatApp from '../components/chat/App';
import Message from '../DataStructure/Message';

const mapStateToProps = ( state ) => ( {
  friendList: state.chat.friendList,
  username: state.chat.username,
  chatIdx: state.chat.chatIdx,
} );


const loadFriend = () => ( {
  type: 'LOAD_FRIEND',
} );

const addFriend = name => ( {
  type: 'ADD_FRIEND',
  name
} );

const switchFriend = chatIdx => ( {
  type: 'SWITCH_FRIEND',
  chatIdx,
} );

const setChat = chat => ( {
  type: 'SET_CHAT',
  msg: new Message( chat.author, chat.msg, true ),
} );

const getChat = chat => ( {
  type: 'GET_CHAT',
  msg: new Message( chat.author, chat.msg, true ),
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
