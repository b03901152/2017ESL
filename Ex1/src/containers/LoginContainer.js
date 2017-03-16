import { connect } from 'react-redux';
import { setLoc, login } from '../actions';
import Login from '../components/Login';

const mapStateToProps = state => ( {
  err: state.login.err,
} );

const setUser = username => ( {
  type: 'SET_USER',
  username,
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
