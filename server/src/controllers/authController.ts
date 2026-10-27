import { Response } from 'express';
import { AuthenticatedRequest, DEMO_USERS } from '../middleware/auth';

export const login = (req: AuthenticatedRequest, res: Response) => {
  const { email, role } = req.body;

  let matchedUser = Object.values(DEMO_USERS).find((u) => u.email === email);
  if (!matchedUser && role) {
    matchedUser = Object.values(DEMO_USERS).find((u) => u.role === role);
  }

  if (!matchedUser) {
    matchedUser = DEMO_USERS['usr-seller-01'];
  }

  return res.json({
    message: 'Authentication successful',
    token: matchedUser.id,
    user: matchedUser,
  });
};

export const getCurrentUser = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  return res.json({ user: req.user });
};

export const switchDemoRole = (req: AuthenticatedRequest, res: Response) => {
  const { role } = req.body;
  const user = Object.values(DEMO_USERS).find((u) => u.role === role);
  if (!user) {
    return res.status(400).json({ error: `Invalid role ${role}` });
  }

  return res.json({
    message: `Switched demo role to ${role}`,
    token: user.id,
    user,
  });
};
