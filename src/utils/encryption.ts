import * as bcrypt from 'bcrypt';

export const getPasswordHash = async (password: string, saltOrRounds = 10) => {
  const hash = await bcrypt.hash(password, saltOrRounds);

  return hash;
};

export const getSalt = async () => {
  const salt = await bcrypt.genSalt();

  return salt;
};

export const isMatch = async (password: string, hash: string) => {
  const flag = await bcrypt.compare(password, hash);

  return flag;
};
