import { connect } from 'react-redux';
import Config from '../components/chat/Config';

const setGroupName = name => ( {
  type: 'SET_GROUP_NAME',
  name,
} );

const logout = () => ( {
  type: 'LOGOUT',
} );

const mapDispatchToProps = ( {
  logout,
  setGroupName,
} );

const mapStateToProps = ( state ) => ( {
  username: state.chat.username,
  groupID: state.chat.friendList[ state.chat.chatIdx ].groupID,
  profilePath: state.chat.profilePath,
} );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);

