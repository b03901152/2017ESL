import { connect } from 'react-redux';
import Config from '../components/chat/Config';

const logout = () => ( {
	type: 'LOGOUT',
} );

const mapDispatchToProps = ({
  logout,
});

export default connect(
  null,
  mapDispatchToProps
)(Config);

