export const validateAmount = (total: number, users: any[]) => {
  let count = 0;
  for (let user of users) {
    count += user.amount;
  }
  if (count == total) {
    return true;
  }
  return false;
};
