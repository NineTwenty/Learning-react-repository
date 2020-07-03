import { connect } from 'react-redux';
import { setAuthUserAC } from '../../data/authentication-reducer';
import ky from 'ky';
import Header from './Header';

const mapStateToProps = ({ authentication: { user } }) => ({
  user,
});

async function loadAuthUser() {
  const response = await ky(`/api/users/4`);
  const { user } = await response.json();
  return user;
}

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(id) {
    loadAuthUser(id).then((user) => dispatch(setAuthUserAC(user)));
  },
});

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
