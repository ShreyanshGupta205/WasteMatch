import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'seller' | 'buyer' | 'admin';
  name: string;
  businessName?: string;
  pincode?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

// In-Memory Seed Users for fast demo / API token validation
export const DEMO_USERS: Record<string, AuthenticatedUser> = {
  'usr-seller-01': {
    id: 'usr-seller-01',
    email: 'seller@shreeganesh.com',
    role: 'seller',
    name: 'Rajesh Kumar',
    businessName: 'Shree Ganesh Galvanizers Plant #2',
    pincode: '201010',
  },
  'usr-seller-02': {
    id: 'usr-seller-02',
    email: 'seller@bharatpaper.com',
    role: 'seller',
    name: 'Harish Chandra',
    businessName: 'Bharat Paper & Board Mills',
    pincode: '251001',
  },
  'usr-buyer-01': {
    id: 'usr-buyer-01',
    email: 'buyer@aravalicement.com',
    role: 'buyer',
    name: 'Vikramaditya Rathore',
    businessName: 'Aravali Cement Works (AFR Kiln)',
    pincode: '312601',
  },
  'usr-buyer-02': {
    id: 'usr-buyer-02',
    email: 'buyer@greenbrick.com',
    role: 'buyer',
    name: 'Sanjay Goel',
    businessName: 'GreenBrick Eco-Industries',
    pincode: '250001',
  },
  'usr-admin-01': {
    id: 'usr-admin-01',
    email: 'admin@wastematch.com',
    role: 'admin',
    name: 'Admin',
    businessName: 'WasteMatch Central Compliance Operations',
  },
};

/**
 * Authentication Middleware: Extracts user identity from Authorization header or X-Demo-Role header
 */
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const demoRole = req.headers['x-demo-role'] as string;
  const demoUserId = req.headers['x-demo-user-id'] as string;

  if (demoUserId && DEMO_USERS[demoUserId]) {
    req.user = DEMO_USERS[demoUserId];
    return next();
  }

  if (demoRole) {
    const matchedUser = Object.values(DEMO_USERS).find((u) => u.role === demoRole);
    if (matchedUser) {
      req.user = matchedUser;
      return next();
    }
  }

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    // For demo purposes, we accept "mock-token-userId" or default seller
    const matchedUser = DEMO_USERS[token] || DEMO_USERS['usr-seller-01'];
    req.user = matchedUser;
    return next();
  }

  // Default fallback for demo API calls: Shree Ganesh Galvanizers
  req.user = DEMO_USERS['usr-seller-01'];
  next();
};

/**
 * Role-Based Access Control (RBAC) Middleware
 * Enforces dashboard isolation: Sellers cannot touch buyer/admin routes; buyers cannot touch seller/admin routes
 */
export const requireRole = (...allowedRoles: ('seller' | 'buyer' | 'admin')[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: No active authentication session.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Forbidden: Dashboard Isolation Violation. Role '${req.user.role}' cannot access this endpoint. Allowed: [${allowedRoles.join(', ')}]`,
      });
    }

    next();
  };
};
