import { nanoid } from 'nanoid';
import authModels from '../model';

const sessionService = {};

sessionService.genSession = async (userId) => {
  const sessionId = nanoid(50);
  await authModels.session.create({ user_id: userId, session_id: sessionId });
  return sessionId;
};

sessionService.getSession = async (sessionId) => {
  return authModels.session.findOne({ session_id: sessionId });
};

sessionService.dropSession = async (sessionId) => {
  await authModels.session.deleteOne({ session_id: sessionId });
};

export default sessionService;
