import { Admin } from '../modules/Admin/admin.model';
import { User } from '../modules/user/user.model';

const superAdmin = {
  name: {
    firstName: 'Faruk',
    lastName: 'Rahman',
  },
  email: 'chitropotcommerce@gmail.com',
  password: 'farukVaiRocks',
  gender: 'Male',
  dateOfBirth: '1998-05-05',
  contactNo: '+8801914290302',
  presentAddress: 'Dhaka, Bangladesh',
  permanentAddress: 'Dhaka, Bangladesh',
  profileImg: 'https://i.ibb.co/bghqR1x/Spanish.png',
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({
    email: 'chitropotcommerce@gmail.com',
  });
  if (!isSuperAdminExists) {
    await Admin.create(superAdmin);
  }
};

export default seedSuperAdmin;
