import httpStatus from "http-status";

const addProduct = catchAsync(async (req, res) => {
  const result = await ProductService.addProduct(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product is created successfully',
    data: result,
  });
});
 