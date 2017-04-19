import { connect } from 'react-redux';
import { setLoc, login } from '../actions';
import Login from '../components/Login';

const mapStateToProps = state => ( {
  err: state.login.err,
} );

const setUser = ( username, profilePath ) => ( {
  type: 'SET_USER',
  username,
  profilePath,
} );

const loadFriend = friendList => {
  console.log( 'friendListContainer:', friendList );
  return {
  type: 'LOAD_FRIEND',
  friendList
} };

const mapDispatchToProps = ( {
  setLoc,
  setUser,
  login,
  loadFriend,
} );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( Login );
