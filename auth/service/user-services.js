import authModels from '../model';

const userService = {};

userService.getUserById = async (userId) => {
  return authModels.user.findById(userId, { password: 0 });
};

export default userService;
