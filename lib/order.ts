import { graphqlRequest } from "./graphqlClient";
import { CartItem } from "./cart";

type OrderItem = {
  productId: string;
  quantity: number;
};

type Order = {
  id: string;
  items: CartItem;
  totalAmount: number;
  orderedAt: string;
  pickupLocation: PickupLocation;
  deliveryDate: string;
  canceledAt: string;
};

type PickupLocation = {
  id: string;
  name: string;
};

const orderQuery = (id: string) => `
  query getOrder {
    order(id: ${id}){
      id
      items
      totalAmount
      orderedAt
      pickupLocation
      deliveryDate
      canceledAt
    }
  }
`;

const orderMutation = (items: OrderItem) => `
  mutation postOrder {
    createOrder(input: {
      items: ${items},
    })
    {
      order {
        id
      }
      clientMutationId
    }
  }

`;

export async function getOrder(id: string): Promise<Order> {
  const data = await graphqlRequest({ query: orderQuery(id) });
  return data.products;
}
