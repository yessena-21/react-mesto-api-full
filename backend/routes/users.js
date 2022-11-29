const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { linkRegExp } = require('../utils/utils');

const {
  getUsers, getUserByID, updateUser, updateUseravatar, getUserInfo,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUserInfo);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserByID);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegExp),
  }),
}), updateUseravatar);

module.exports = router;
