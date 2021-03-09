import { Router } from 'express';
import httpHandler from '../../commons/http-handler';
import authService from '../service';
import authMiddleware, {
  doesUserExist,
  isUserVerified,
} from '../service/middleware';
import sessionService from '../service/session-service';

const router = Router();

router.post(
  '/register',
  httpHandler(async (req, res) => {
    const details = req.body;
    const {
      verification_code: code,
      post_hook: postHook,
    } = await authService.registerUser(details);
    res.status(200).send({
      message: 'registered successful ',
      verification_code: code,
    });
    await postHook();
  })
);

router.post(
  '/verify-user',
  doesUserExist,
  httpHandler(async (req, res) => {
    const { verification_code: verificationCode, email } = req.body;
    const { post_hook: postHook } = await authService.verifyEmail({
      verification_code: verificationCode,
      email,
    });
    res.status(200).send({ message: 'user verified successfully' });
    await postHook();
  })
);

router.get(
  '/login',
  isUserVerified,
  httpHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user: userId, post_hook: postHook } = await authService.loginUser({
      email,
      password,
    });
    const sessionId = await sessionService.genSession(userId);
    res
      .cookie('session_id', sessionId, { httpOnly: true })
      .status(200)
      .send({ message: 'logged in' });
    await postHook();
  })
);

router.get(
  '/reset-password-request',
  doesUserExist,
  httpHandler(async (req, res) => {
    const { email } = req.body;
    const token = await authService.resetPasswordRequest(email);
    res.status(200).send({ token });
  })
);

router.put(
  '/reset-password',
  httpHandler(async (req, res) => {
    const { token, new_password } = req.body;
    const { post_hook: postHook } = await authService.resetPassword({
      token,
      new_password,
    });
    res.status(200).send({ message: 'password changed successfully' });
    await postHook();
  })
);

router.get(
  '/who-am-i',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { user } = req;
    res.status(200).send(user);
  })
);

router.put(
  '/change-password',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { old_password, new_password } = req.body;
    const userId = req.user._id;
    const { post_hook: postHook } = await authService.changePassword({
      old_password,
      new_password,
      user_id: userId,
    });
    res.status(200).send({ message: 'password changed successfully' });
    await postHook();
  })
);

router.delete(
  '/logout',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const clientSession = req.cookies.session_id;
    const { user } = req;
    const { email } = user;
    const { post_hook: postHook } = await authService.logoutUser({
      clientSession,
      email,
    });
    res.status(200).clearCookie('session_id').send({ message: 'logged out' });
    await postHook();
  })
);

export default router;
