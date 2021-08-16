import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { getProduct, Product } from "../../lib/product";
import { CartItem, getCartItem, setCartItem } from "../../lib/cart";
import styles from "./products.module.css";

const ProductPage: FC = () => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (typeof router.query.id == "string") {
      getProduct(router.query.id as string).then((product) => setProduct(product));
    }
  }, [router.query.id]);

  const setItemToCart = (product: Product) => {
    const cartItems: CartItem[] = getCartItem();
    const item = cartItems.find((c) => c.product.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      cartItems.push({
        product: product,
        quantity: 1,
      });
    }
    setCartItem(cartItems);
  };

  return (
    <Layout>
      {product && (
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={product.imageUrl} alt={`${product.name}の写真`} />
          </div>
          <h2 className={styles.name}>{product.name}</h2>
          <div>{product.price}円</div>
          <div>{product.description}</div>
          <button className={styles.button} onClick={() => setItemToCart(product)}>
            カートに追加する
          </button>
        </div>
      )}
    </Layout>
  );
};

export default ProductPage;
