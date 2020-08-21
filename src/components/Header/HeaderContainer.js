import { connect } from 'react-redux';
import Header from './Header';

const mapStateToProps = ({ authentication: { user } }) => ({
  user,
});

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;
