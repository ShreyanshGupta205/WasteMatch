import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import * as authCtrl from '../controllers/authController';
import * as sellerCtrl from '../controllers/sellerController';
import * as buyerCtrl from '../controllers/buyerController';
import * as adminCtrl from '../controllers/adminController';

export const apiRouter = Router();

// ==========================================
// 1. AUTHENTICATION & DEMO PERSONA SWITCHER
// ==========================================
apiRouter.post('/auth/login', authCtrl.login);
apiRouter.get('/auth/me', authenticateToken, authCtrl.getCurrentUser);
apiRouter.post('/auth/switch-demo-role', authCtrl.switchDemoRole);

// ==========================================
// 2. DASHBOARD 1: SELLER / GENERATOR ROUTES
// (Isolated by RBAC: seller or admin only)
// ==========================================
apiRouter.get(
  '/seller/streams',
  authenticateToken,
  requireRole('seller', 'admin'),
  sellerCtrl.getSellerStreams
);
apiRouter.post(
  '/seller/streams',
  authenticateToken,
  requireRole('seller', 'admin'),
  sellerCtrl.createWasteStream
);
apiRouter.post(
  '/seller/streams/:streamId/upload-lab-report',
  authenticateToken,
  requireRole('seller', 'admin'),
  sellerCtrl.uploadLabReportForStream
);
apiRouter.get(
  '/seller/nearby-labs',
  authenticateToken,
  requireRole('seller', 'admin'),
  sellerCtrl.getNearbyLabsForSeller
);
apiRouter.post(
  '/seller/listings',
  authenticateToken,
  requireRole('seller', 'admin'),
  sellerCtrl.publishListing
);
apiRouter.get(
  '/seller/offers',
  authenticateToken,
  requireRole('seller', 'admin'),
  sellerCtrl.getSellerOffers
);
apiRouter.post(
  '/seller/offers/:offerId/action',
  authenticateToken,
  requireRole('seller', 'admin'),
  sellerCtrl.handleOfferAction
);
apiRouter.get(
  '/seller/shipments',
  authenticateToken,
  requireRole('seller', 'admin'),
  sellerCtrl.getSellerShipments
);
apiRouter.patch(
  '/seller/shipments/:shipmentId/status',
  authenticateToken,
  requireRole('seller', 'admin'),
  sellerCtrl.updateShipmentStatus
);
apiRouter.get(
  '/seller/audit-pack',
  authenticateToken,
  requireRole('seller', 'admin'),
  sellerCtrl.exportAuditPack
);

// ==========================================
// 3. DASHBOARD 2: BUYER / RECEIVER ROUTES
// (Isolated by RBAC: buyer or admin only)
// ==========================================
apiRouter.get(
  '/buyer/profile',
  authenticateToken,
  requireRole('buyer', 'admin'),
  buyerCtrl.getBuyerProfile
);
apiRouter.put(
  '/buyer/profile',
  authenticateToken,
  requireRole('buyer', 'admin'),
  buyerCtrl.updateBuyerProfile
);
apiRouter.get(
  '/buyer/matches',
  authenticateToken,
  requireRole('buyer', 'admin'),
  buyerCtrl.getIncomingMatchesForBuyer
);
apiRouter.post(
  '/buyer/matches/:matchId/respond',
  authenticateToken,
  requireRole('buyer', 'admin'),
  buyerCtrl.buyerRespondOffer
);
apiRouter.get(
  '/buyer/deliveries',
  authenticateToken,
  requireRole('buyer', 'admin'),
  buyerCtrl.getBuyerDeliveries
);
apiRouter.post(
  '/buyer/deliveries/:shipmentId/receive-copy4',
  authenticateToken,
  requireRole('buyer', 'admin'),
  buyerCtrl.markDeliveryReceivedAndUploadCopy4
);
apiRouter.post(
  '/buyer/deliveries/:shipmentId/qc-check',
  authenticateToken,
  requireRole('buyer', 'admin'),
  buyerCtrl.performQcCheck
);
apiRouter.post(
  '/buyer/deliveries/:shipmentId/issue-diversion-certificate',
  authenticateToken,
  requireRole('buyer', 'admin'),
  buyerCtrl.issueDiversionCertificate
);
apiRouter.post(
  '/buyer/escrow/deposit',
  authenticateToken,
  requireRole('buyer', 'admin'),
  buyerCtrl.depositEscrowFunds
);

// ==========================================
// 4. DASHBOARD 3: ADMIN DASHBOARD ROUTES
// (Isolated by RBAC: admin only)
// ==========================================
apiRouter.get(
  '/admin/users',
  authenticateToken,
  requireRole('admin'),
  adminCtrl.getAdminUsers
);
apiRouter.patch(
  '/admin/users/:userId/verify',
  authenticateToken,
  requireRole('admin'),
  adminCtrl.verifyUserAccount
);
apiRouter.get(
  '/admin/transactions',
  authenticateToken,
  requireRole('admin'),
  adminCtrl.getAdminTransactions
);
apiRouter.post(
  '/admin/disputes/:shipmentId/resolve',
  authenticateToken,
  requireRole('admin'),
  adminCtrl.resolveDispute
);
apiRouter.get(
  '/admin/compliance-metrics',
  authenticateToken,
  requireRole('admin'),
  adminCtrl.getComplianceAlertsAndMetrics
);
apiRouter.get(
  '/admin/compliance/alerts',
  authenticateToken,
  requireRole('admin'),
  adminCtrl.getComplianceAlertsAndMetrics
);
apiRouter.get(
  '/admin/labs',
  authenticateToken,
  requireRole('admin'),
  (req, res) => res.json({ labs: sellerCtrl.LABS_DIRECTORY })
);
apiRouter.post(
  '/admin/labs',
  authenticateToken,
  requireRole('admin'),
  adminCtrl.addLabPartner
);
apiRouter.get(
  '/admin/transporters',
  authenticateToken,
  requireRole('admin'),
  (req, res) => res.json({ transporters: sellerCtrl.TRANSPORTERS_DIRECTORY })
);
apiRouter.post(
  '/admin/transporters',
  authenticateToken,
  requireRole('admin'),
  adminCtrl.addTransporterPartner
);

// Reference Directory Public Endpoints
apiRouter.get('/directory/labs', (req, res) => res.json({ labs: sellerCtrl.LABS_DIRECTORY }));
apiRouter.get('/directory/transporters', (req, res) => res.json({ transporters: sellerCtrl.TRANSPORTERS_DIRECTORY }));

