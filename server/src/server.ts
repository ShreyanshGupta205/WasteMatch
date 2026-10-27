import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// API health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'WasteMatch Industrial Symbiosis Engine API',
    supportedDashboards: [
      '1. Seller / Waste Generator Dashboard',
      '2. Buyer / Receiver Dashboard',
      '3. Admin Dashboard',
    ],
  });
});

// Mount modular API router
app.use('/api', apiRouter);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[WasteMatch API] Running on http://localhost:${PORT}`);
    console.log(`[WasteMatch API] Exactly 3 Dashboards isolated via RBAC middleware.`);
  });
}

export default app;
