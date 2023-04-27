const sendCookie = (res, newUser) => {
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  // create a jwt token and send it to the client
  const token = newUser.getJwtToken();
  newUser.password = undefined;
  
  res.cookie("token", token, options).status(200).json({
    success: true,
    token,
    user: newUser,
  });
};

module.exports = sendCookie;
