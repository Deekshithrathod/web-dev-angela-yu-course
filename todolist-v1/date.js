module.exports.getDate = function (params) {
  const today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-US", options);
};

module.exports.getDay = function (params) {
  const today = new Date();
  let options = {
    weekday: "long",
  };

  return today.toLocaleDateString("en-US", options);
};
