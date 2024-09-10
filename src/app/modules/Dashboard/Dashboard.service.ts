import Category from '../Category/Category.model';
import Order from '../Order/Order.model';
import Product from '../Product/Product.model';
import Subcategory from '../Subcategory/Subcategory.model';
import { User } from '../User/User.model';

// total users, and all count to show that on dashboard
const dashboardDetails = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalCategories = await Category.countDocuments();
  const totalSubCategories = await Subcategory.countDocuments();
  const totalOrders = {
    pending: await Order.countDocuments({ status: 'pending' }),
    processing: await Order.countDocuments({ status: 'processing' }),
    shipped: await Order.countDocuments({ status: 'shipped' }),
    delivered: await Order.countDocuments({ status: 'delivered' }),
    cancel: await Order.countDocuments({ status: 'cancel' }),
    total: await Order.countDocuments(),
  };

  return {
    totalUsers,
    totalOrders,
    totalProducts,
    totalCategories,
    totalSubCategories,
  };
};

const DashboardServices = {
  dashboardDetails,
};

export default DashboardServices;
