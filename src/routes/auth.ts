import { Router } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcrypt';

import register from '@/controller/auth/register';

import vaidationError from '@/middleware/validationError';
import expressRateLimit from '@/lib/expressRateLimits';

const router = Router();

router.post(
  '/register',
  expressRateLimit('passRest'),
  body('name').trim().notEmpty().withMessage('Name is Required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Invalid email address')
    .custom(async (value) => {}),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['user', 'admin'])
    .withMessage('Role is not support'),

  vaidationError,
  register,
);

export default router;
