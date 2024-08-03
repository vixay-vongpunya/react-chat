function FormatDate(date) {
  const today = new Date();
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  if (year < today.getFullYear()) {
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (month < today.getMonth()) {
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  } else if (day < today.getDate()) {
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  } else if (hour < today.getHours()) {
    return `${hour}:${minute < 10 ? "0" + minute : minute}`;
  } else {
    return `${hour}:${minute < 10 ? "0" + minute : minute}`;
  }
}

export default FormatDate;
