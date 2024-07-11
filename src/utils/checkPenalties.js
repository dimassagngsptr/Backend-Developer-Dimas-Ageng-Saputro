const checkPenalties = (itemBorrow) => {
  const today = new Date();
  const penaltyDays = 7;
  // let penalizedItems = [];
  let isPenalty = false;

  itemBorrow.forEach((item) => {
    const returnDate = new Date(item.returnDate);
    const diffTime = Math.abs(today - returnDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > penaltyDays || item.isReturn == false) {
      return (isPenalty = true);
    } else {
      return (isPenalty = false);
    }
  });
  return isPenalty;
  // if (penalizedItems.length > 0) {
  //   return true;
  // } else {
  //   return false;
  // }
};
module.exports = checkPenalties;
