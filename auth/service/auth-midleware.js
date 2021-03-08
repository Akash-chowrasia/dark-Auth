import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import httpHandler from '../../http-handler';
import authModels from '../model';
import sessionService from './session-service';
import userService from './user-services';

const authMiddleware = {};

authMiddleware.isLoggedIn = httpHandler(async (req, res, next) => {
  const clientSession = req.cookies.session_id;
  const record = await sessionService.getSession(clientSession);
  if (!record) throw createError(StatusCodes.BAD_REQUEST, 'Please login first');

  if (record.session_id !== clientSession)
    throw createError(StatusCodes.UNAUTHORIZED, 'invalid session');
  if (record.expires_at - new Date() > 3 * 30 * 1000) {
    throw createError(StatusCodes.UNAUTHORIZED, 'session expired ....');
  }
  if (record.expires_at - new Date() < 3 * 30 * 1000) {
    await sessionService.dropSession(clientSession);
    const sessionId = await sessionService.genSession(record._id);
    res.cookie('session_id', sessionId, { httpOnly: true });
  }
  req.user = await userService.getUserById(record.user_id);
  next();
});

authMiddleware.isUserExist = httpHandler(async (req, res, next) => {
  const { email } = req.body;
  const emailExist = await authModels.user.findOne({ email });
  if (!emailExist)
    throw createError(StatusCodes.UNAUTHORIZED, 'This email is not registered');
  next();
});

authMiddleware.isUserVerified = httpHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await authModels.user.findOne({ email });
  if (!user)
    throw createError(StatusCodes.BAD_REQUEST, 'This user does not exists');
  if (!user.is_email_verified)
    throw createError(StatusCodes.UNAUTHORIZED, 'Please verify first');
  next();
});

export default authMiddleware;
