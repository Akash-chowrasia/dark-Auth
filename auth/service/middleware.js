import assert from 'assert';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import httpHandler from '../../commons/http-handler';
import authModels from '../model';
import sessionService from './session-service';
import userService from './user-services';

const authMiddleware = {};

authMiddleware.isLoggedIn = httpHandler(async (req, res, next) => {
  const clientSession = req.cookies.session_id;
  const record = await sessionService.getSession(clientSession);
  assert(
    record !== null,
    createError(StatusCodes.BAD_REQUEST, 'Please login first')
  );

  assert(
    record.session_id === clientSession,
    createError(StatusCodes.UNAUTHORIZED, 'invalid session')
  );
  if (new Date() - record.created_at > 20 * 30 * 1000) {
    await sessionService.dropSession(clientSession);
    res.clearCookie('session_id');
    throw createError(StatusCodes.UNAUTHORIZED, 'session expired ....');
  }
  if (new Date() - record.created_at < 20 * 30 * 1000) {
    await sessionService.dropSession(clientSession);
    const sessionId = await sessionService.genSession(record.user_id);
    res.cookie('session_id', sessionId, { httpOnly: true });
  }
  req.user = await userService.getUserById(record.user_id);
  next();
});

export const doesUserExist = httpHandler(async (req, res, next) => {
  const { email } = req.body;
  const emailExist = await authModels.user.findOne({ email });
  assert(
    emailExist !== null,
    createError(StatusCodes.UNAUTHORIZED, 'This email is not registered')
  );
  next();
});

export const isUserVerified = httpHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await authModels.user.findOne({ email });
  assert(
    user !== null,
    createError(StatusCodes.BAD_REQUEST, 'This user does not exists')
  );
  assert(
    user.is_email_verified === true,
    createError(StatusCodes.UNAUTHORIZED, 'Please verify first')
  );
  next();
});

export default authMiddleware;
