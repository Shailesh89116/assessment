import React from "react";
import styles from "@/styles/ProductCard.module.css";
import ContentfulImage from "../ui/ContentfulImage";
import Link from "next/link";
import Image from "next/image";

interface productProps {
  product: any;
}

const ProductCard: React.FC<productProps> = ({ product }) => {
  const { title, productId, quantity, productImg } = product.fields;

  console.log(title, productId, quantity, productImg.fields.file.url);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
        <Image src={productImg.fields.file.url} alt="Product Image" width={500} height={300} />
        </div>
        <div className={styles.product_title}>
          <h3 className={styles.title}>{title}<p className={styles.productid}>({productId})</p></h3>
          <div className={styles.quantity_container}>
            <p className={styles.quantity}>{quantity}</p>
          </div>
          <div className={styles.viewmore_container}>
            <Link href={`/products/${productId}`} className={styles.viewmore}>
              <p>View More</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
