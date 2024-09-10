import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import DashboardServices from './Dashboard.service';

const dashboardDetails: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardServices.dashboardDetails();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Dashboard details fetched successfully!',
      data: result,
    });
  },
);

const DashboardController = {
  dashboardDetails,
};

export default DashboardController;
