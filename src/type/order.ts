export interface OrderDetails {
  email: string;
  address: string;
  phone: string;
}

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}
