import express from 'express';
import AuthGuard from '../../middlewares/AuthGuard';
import DashboardController from './Dashboard.controller';

const router = express.Router();

// all routes start with /api/dashboard

router.get('/', AuthGuard('admin'), DashboardController.dashboardDetails);

const DashboardRoutes = router;

export default DashboardRoutes;
