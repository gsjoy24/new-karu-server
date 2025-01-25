import { NextFunction } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import { handleCastError } from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import { handleZodError } from '../errors/handleZodError';

interface IErrorSource {
  path: string | number;
  message: string;
}

interface ISimplifiedError {
  statusCode: number;
  message: string;
  errorSources: IErrorSource[];
}

const globalErrorHandler = (
  err: any,
  req: any,
  res: any,
  next: NextFunction,
): void => {
  let statusCode: number = err.statusCode || 500;
  let message: string = err.message || 'Something went wrong!';
  let errorSources: IErrorSource[] = [
    {
      path: '',
      message: err.message || 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifyError: ISimplifiedError = handleZodError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSources = simplifyError.errorSources;
  } else if (err.name === 'ValidationError') {
    const simplifyError: ISimplifiedError = handleValidationError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSources = simplifyError.errorSources;
  } else if (err.name === 'CastError') {
    const simplifyError: ISimplifiedError = handleCastError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSources = simplifyError.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError: ISimplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
