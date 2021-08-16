// import { graphqlRequest } from "./graphqlClient";
import { Product } from "./product";

export type CartItem = {
  product: Product;
  quantity: number;
};
const CART_ITEMS = "cartItems";

export const getCartItem = (): CartItem[] => {
  const cartItemString = localStorage.getItem(CART_ITEMS);
  return cartItemString ? JSON.parse(cartItemString) : [];
};

export const setCartItem = (data: CartItem[]): void => {
  localStorage.setItem(CART_ITEMS, JSON.stringify(data));
};

export const clearCartItem = () => {
  localStorage.setItem(CART_ITEMS, JSON.stringify([]));
};

// const listProductsQuery = `
//   query listProducts {
//     products {
//       id
//       name
//       description
//       price
//       imageUrl
//     }
//   }
// `;

// export async function listProducts(): Promise<Product[]> {
//   const data = await graphqlRequest({ query: listProductsQuery });
//   return data.products;
// }
