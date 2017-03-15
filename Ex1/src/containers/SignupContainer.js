import { connect } from 'react-redux';
import { setLoc } from '../actions';
import SignUp from '../components/SignUp';

const mapDispatchToProps =  ({
  setLoc
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);

