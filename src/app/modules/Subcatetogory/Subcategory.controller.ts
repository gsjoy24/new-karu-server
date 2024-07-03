const createSubcategory = async (req: Request, res: Response) => {
  const result = await SubcategoryServices.CreateSubcategory(req.body);
  res.status(200).json({
    status: 'success',
    message: 'Subcategory created successfully!',
    data: result,
  });
};
