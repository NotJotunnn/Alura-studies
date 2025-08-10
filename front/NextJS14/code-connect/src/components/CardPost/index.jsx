import style from "./CardPost.module.css";

import Image from "next/image";
import Avatar from "../Avatar";
import Link from "next/link";

const CardPost = ({ post }) => {
  return (
    <article className={style.cardWrapper}>
      <header className={style.imageWrapper}>
        <figure>
          <Image
            width={438}
            height={133}
            src={post.cover}
            alt={`Capa do post de título ${post.title}`}
          />
        </figure>
      </header>

      <section className={style.bodyWrapper}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link
          href={`/posts/${post.slug}`}
        >
          <p>Ver detalhes</p>
        </Link>
      </section>

      <footer className={style.footer}>
        <Avatar name={post.author.username} imageSrc={post.author.avatar} />
      </footer>
    </article>
  );
};

export default CardPost;
