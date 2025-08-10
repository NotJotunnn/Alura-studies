import Avatar from "@/components/Avatar";
import styles from "./PostPage.module.css"

import logger from "@/logger";
import Image from "next/image";
import { remark } from "remark";
import html from "remark-html";

async function getPostBySlug(slug) {
  try {
    const response = await fetch(`http://localhost:3042/posts?slug=${slug}`);

    if (!response.ok) throw new Error("Erro ao buscar os dados");

    logger.info("Sucesso ao buscar dados do post");
    const data = await response.json();

    if (data.length === 0) return {};

    const post = data[0];

    const processedContent = await remark().use(html).process(post.markdown);
    
    post.markdown = processedContent.toString();

    return post;
  } catch (err) {
    logger.error("Erro ao buscar dados do post: ", err);
    return {};
  }
}

const PostPage = async ({ params }) => {
  const post = await getPostBySlug(params.slug);

  return (
    <div className={styles.postWrapper}>
      <div class={styles.cardWrapper}>
        <div class={styles.imgWrapper}>
          <Image width={993} height={300} src={post.cover} alt={`Cover do post ${post.title}`}/>
        </div>

        <h1>{post.title}</h1>
        <p>{post.body}</p>

        <footer>
          <Avatar name={post.author.username} imageSrc={post.author.avatar}/>
        </footer>
      </div>

      <div class={styles.codeWrapper}>
        <h2>Código:</h2>
        <div dangerouslySetInnerHTML={{ __html: post.markdown }}></div>
      </div>
    </div>
  );
};

export default PostPage;
