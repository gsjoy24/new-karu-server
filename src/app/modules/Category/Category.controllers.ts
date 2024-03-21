import catchAsync from '../../utils/catchAsync';
import CategoryServices from './Category.services';

const CreateCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.CreateCategory(req.body);
  res.status(200).json({
    status: 'success',
    message: 'Category created successfully!',
    data: result,
  });
});

const GetCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.GetCategories(req.query.name as string);
  res.status(200).json({
    status: 'success',
    message: 'Categories fetched successfully!',
    data: result,
  });
});

const GetCategoryById = catchAsync(async (req, res) => {
  const result = await CategoryServices.GetCategoryById(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Category fetched successfully!',
    data: result,
  });
});

const UpdateCategoryById = catchAsync(async (req, res) => {
  const result = await CategoryServices.UpdateCategoryById(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    status: 'success',
    message: 'Category updated successfully!',
    data: result,
  });
});

const DeleteCategoryById = catchAsync(async (req, res) => {
  const result = await CategoryServices.DeleteCategoryById(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Category deleted successfully!',
    data: result,
  });
});

const CategoryControllers = {
  CreateCategory,
  GetCategories,
  GetCategoryById,
  UpdateCategoryById,
  DeleteCategoryById,
};

export default CategoryControllers;
