module.exports = {
  calc_age: function (timestamp) {
    const today = new Date();
    const birthDay = new Date(timestamp);

    let age = today.getFullYear() - birthDay.getFullYear();
    const month = today.getMonth() - birthDay.getMonth();

    if (month < 0 || (month == 0 && today.getDate() < birthDay.getDate())) {
      age = age - 1;
    }

    return age;
  },
  calc_date: function (timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = `0${date.getMonth()}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  },
};
