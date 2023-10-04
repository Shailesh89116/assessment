import React from "react";
import styles from "@/styles/ProductCard.module.css";
import ContentfulImage from "../ui/ContentfulImage";
import Link from "next/link";
import RichText from "../RichText";

interface productProps {
  product: any;
}

const ProductCard: React.FC<productProps> = ({ product }) => {
  const { title, productId, quantity, productImg, embeddedVideo } =
    product.fields;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.iframe}>
          <iframe
            width="540"
            height="315"
            src={embeddedVideo.content[0].content[0].value}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className={styles.product_title}>
          <h3 className={styles.title}>
            {title}
            <p className={styles.productid}>({productId})</p>
          </h3>
          <div className={styles.quantity_container}>
            <p className={styles.quantity}>{quantity}</p>
          </div>
          <RichText productDesc={product.fields.productDesc} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
