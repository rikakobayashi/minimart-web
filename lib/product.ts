import { graphqlRequest } from "./graphqlClient";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

const listProductsQuery = `
  query listProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

const productQuery = (id: string) => `
  query getProduct {
    product(id: "${id}") {
      id
      name
      price
      description
      imageUrl
    }
  }
`;

export async function listProducts(): Promise<Product[]> {
  const data = await graphqlRequest({ query: listProductsQuery });
  return data.products;
}

export async function getProduct(id: string): Promise<Product> {
  const data = await graphqlRequest({ query: productQuery(id) });
  return data.product;
}
