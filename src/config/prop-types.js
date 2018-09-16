import PropTypes from 'prop-types';

const UserType = PropTypes.shape({
  ID: PropTypes.string.isRequired,
  Login: PropTypes.string.isRequired,
  AvatarURL: PropTypes.string,
});

export { UserType };

export default {
  UserType,
};
