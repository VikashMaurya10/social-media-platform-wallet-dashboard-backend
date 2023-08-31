const HandleSuccess = (res, data) => {
  res.status(200).json(data);
  res.end();
};

const HandleError = (res, message) => {
  res.status(202).json({
    error: message,
  });
  res.end();
};

const UnauthorizedError = (res) => {
  res.status(401).json({
    error: "Unauthorized API call.",
  });
  res.end();
};

const HandleServerError = (res) => {
  res.status(500).json({
    error: "Something went wrong. Please contact support team.",
  });
};

const ValidateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return Boolean(re.test(email));
};

const PasswordStrength = (password) => {
  let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,24})(?=.*[0-9])(?=.*[@$!%*#?&])/;
  return Boolean(re.test(password));
};

const ValidUserName = (username) => {
  return Boolean(username.trim().length > 0);
};

module.exports = {
  HandleSuccess,
  HandleError,
  UnauthorizedError,
  HandleServerError,
  ValidateEmail,
  PasswordStrength,
  ValidUserName,
};
