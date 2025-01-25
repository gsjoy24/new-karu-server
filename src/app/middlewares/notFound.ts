import { Request, Response } from 'express';
import httpStatus from 'http-status';
const notFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    status: httpStatus.NOT_FOUND,
    message: 'API Not Found!',
    error: 'API Not Found!',
  });

  return;
};

export default notFound;
