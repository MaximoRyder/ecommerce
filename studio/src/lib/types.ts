export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  imageHint: string;
}

export interface CartItemType {
  id: string;
  name:string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
}
