import { graphqlRequest } from "./graphqlClient";
import { CartItem } from "./cart";

type OrderItem = {
  productId: string;
  quantity: number;
};

export type Order = {
  id: string;
  items: CartItem[];
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

export type OrderResponse = {
  order: {
    id: string;
  };
  clientMutationId: string;
};

const orderQuery = `
  query getOrder($id: ID!) {
    order(id: $id){
      id
      items {
        product {
          id
          name
          description
          price
          imageUrl
        }
        quantity
      }
      totalAmount
      orderedAt
      pickupLocation {
        id
        name
      }
      deliveryDate
      canceledAt
    }
  }
`;

const orderMutation = `
  mutation postOrder($items: [OrderItemInput!]!) {
    createOrder(input: {
      items: $items,
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
  const data = await graphqlRequest({ query: orderQuery, variables: { id: id } });
  return data.order;
}

export async function postOrder(cartItems: CartItem[]): Promise<OrderResponse> {
  const orderItems: OrderItem[] = cartItems.map((item) => ({ productId: item.product.id, quantity: item.quantity }));
  const data = await graphqlRequest({ query: orderMutation, variables: { items: orderItems } });
  return data.createOrder;
}
