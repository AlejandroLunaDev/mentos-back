import config from '../../config/config.js';

const logout = (req, res) => {
  res.clearCookie(config.PASS_COOKIE);
  res.status(200).redirect('http://localhost:5173');
};

export default logout;
