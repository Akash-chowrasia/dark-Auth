import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import md5 from 'md5';
import { nanoid } from 'nanoid';
import authModels from '../model';

const authService = {};

const genVerificationCode = async (email) => {
  const verificationCode = nanoid(50);
  await authModels.emailVerification.create({
    verification_code: verificationCode,
    email,
  });
  return verificationCode;
};

const storeLog = async ({ email, message }) => {
  const user = await authModels.user.findOne({ email });
  await authModels.log.create({
    user_id: user._id,
    description: message,
  });
};

authService.registerUser = async (data) => {
  const hashedPassword = md5(data.password);
  const { email } = data;

  const emailExist = await authModels.user.findOne({ email });
  if (emailExist)
    throw createError(StatusCodes.FORBIDDEN, 'This user already registered');
  await authModels.user.create({ ...data, password: hashedPassword });

  return {
    verification_code: await genVerificationCode(email),
    status: true,
    post_hook: () => storeLog({ email, message: 'user registered' }),
  };
};

authService.loginUser = async ({ email, password }) => {
  const user = await authModels.user.findOne({ email });
  if (!user) throw createError(StatusCodes.BAD_REQUEST, 'Login Failed');
  if (md5(password) !== user.password)
    throw createError(StatusCodes.UNAUTHORIZED, 'Incorrect Password');
  return {
    user: user._id,
    status: true,
    post_hook: () => storeLog({ email, message: 'user logged in' }),
  };
};

authService.verifyEmail = async ({ verification_code, email }) => {
  const record = await authModels.emailVerification.findOne({
    verification_code,
  });

  if (!record)
    throw createError(
      StatusCodes.BAD_REQUEST,
      'either you are verified or you entered a wrong verification code'
    );

  await authModels.user.updateOne({ email }, { is_email_verified: true });

  await authModels.emailVerification.deleteOne({
    verification_code,
  });

  return {
    status: true,
    post_hook: () => storeLog({ email, message: 'user verified' }),
  };
};

authService.resetPasswordRequest = async (email) => {
  const token = nanoid(50);
  await authModels.resetPassword.create({ token, email });
  return token;
};

authService.resetPassword = async ({ token, new_password: newPassword }) => {
  const data = await authModels.resetPassword.findOne({ token });
  const { email } = data;
  const hashPassword = md5(newPassword);
  await authModels.user.updateOne({ email }, { password: hashPassword });
  await authModels.resetPassword.deleteOne({ token });
  return {
    status: true,
    post_hook: () => storeLog({ email, message: 'password reset' }),
  };
};

authService.changePassword = async ({
  old_password: oldPassword,
  new_password: newPassword,
  email,
}) => {
  const user = await authModels.user.findOne({ email });
  if (md5(oldPassword) !== user.password)
    throw createError(
      StatusCodes.UNAUTHORIZED,
      'Please enter the correct old password '
    );
  const hashPassword = md5(newPassword);
  await authModels.user.updateOne({ email }, { password: hashPassword });
  return {
    status: true,
    post_hook: () => storeLog({ email, message: 'password changed....' }),
  };
};

authService.logoutUser = async ({ clientSession, email }) => {
  await authModels.session.deleteOne({ session_id: clientSession });
  return {
    status: true,
    post_hook: () => storeLog({ email, message: 'user logged out' }),
  };
};

export default authService;
