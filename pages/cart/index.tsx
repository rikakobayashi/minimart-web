import router from "next/router";
import { FC, useEffect, useState } from "react";
import { CartItem, getCartItem, clearCartItem, countCartItems } from "../../lib/cart";
import styles from "./carts.module.css";
import { Layout } from "../../components/Layout";

export const CartPage: FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    setCartItems(getCartItem());
    setCartCount(countCartItems());
  }, []);

  const priceSum = cartItems.reduce((sum, c) => sum + c.product.price * c.quantity, 0);

  const order = () => {
    clearCartItem();
    window.alert("注文しました");
    router.push("/");
  };

  return (
    <Layout cartCount={cartCount}>
      <div className={styles.wrapper}>
        <div className={styles.cartItemsList}>
          {cartItems.map((item, i) => (
            <div key={i} className={styles.cartItem}>
              <div className={styles.imageWrapper}>
                <img className={styles.image} src={item.product.imageUrl} alt={item.product.name} />
              </div>
              <div className={styles.info}>
                <div>
                  {item.product.name} {item.product.price}円
                </div>
                <div>{item.quantity}個</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.price}>合計: {priceSum}円</div>
        <button className={styles.button} onClick={order}>
          注文する
        </button>
      </div>
    </Layout>
  );
};

export default CartPage;
