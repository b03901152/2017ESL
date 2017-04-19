import { connect } from 'react-redux';
import { setLoc } from '../actions';
import App from '../components/App';

const mapStateToProps = state => ( {
  loc: state.page.loc,

} );

const mapDispatchToProps = ( {
  setLoc,
} );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( App );
