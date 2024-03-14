export type TInfo = {
  title: string;
  description: string;
};

export type TProduct = {
  _id?: string;
  name: string;
  description: string;
  additional_info: TInfo[];
  old_price: number;
  last_price: number;
  stock: number;
  primary_image: string;
  images: string[];
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
};

