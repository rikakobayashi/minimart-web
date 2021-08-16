import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getOrder, Order } from "../../lib/order";
import styles from "./orders.module.css";
import { Layout } from "../../components/Layout";
import { countCartItems } from "../../lib/cart";

const OrderPage: FC = () => {
  const router = useRouter();
  const id = router.query.id ? String(router.query.id) : null;

  const [order, setOrder] = useState<Order | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    setCartCount(countCartItems());
  }, []);

  useEffect(() => {
    if (!id) return;
    getOrder(id).then((order) => {
      setOrder(order);
    });
  }, [id]);

  return (
    <Layout cartCount={cartCount}>
      {order && (
        <div className={styles.wrapper}>
          <div className={styles.title}>注文の詳細</div>
          <div>
            <ul>
              <li>注文日時: {order.orderedAt}</li>
              <li>配達日時: {order.deliveryDate}</li>
              <li>受け取り場所: {order.pickupLocation.name}</li>
            </ul>
          </div>
          <div className={styles.title}>注文した商品</div>
          <div className={styles.cartItemsList}>
            {order.items.map((item, i) => (
              <div key={i} className={styles.cartItem}>
                <div className={styles.imageWrapper}>
                  <img className={styles.image} src={item.product.imageUrl} alt={item.product.name} />
                </div>
                <div className={styles.info}>
                  <div>
                    {item.product.name} {item.product.price}円
                  </div>
                  <div>
                    <div>{item.quantity}個</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.price}>合計: {order.totalAmount}円</div>
        </div>
      )}
    </Layout>
  );
};

export default OrderPage;
