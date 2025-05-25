export const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8); // 8 char random string
};
