const phoneNumberValidate = (phoneNumber) => {
  var phoneno = /^\d{10}$/;
  if (phoneNumber.match(phoneno)) {
    return true;
  } else return false;
};

export default phoneNumberValidate;
