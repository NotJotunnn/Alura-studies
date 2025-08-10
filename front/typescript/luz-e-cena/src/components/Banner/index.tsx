import styles from "./Banner.module.css";

type BannerProps = {
  source: string;
  alt: string;
};

const Banner = ({ source, alt }: BannerProps) => {
  return <img src={source} alt={alt} className={styles.banner} />;
};

export default Banner;
