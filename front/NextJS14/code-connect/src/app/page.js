import styles from "./page.module.css";

import CardPost from "@/components/CardPost";
import logger from "@/logger";
import Link from "next/link";

async function getAllPosts(page) {
  try {
    const response = await fetch(
      `http://localhost:3042/posts?_page=${page}&_per_page=6`
    );

    if (!response.ok) throw new Error("Erro ao buscar posts.");

    logger.info("Posts obtidos com sucesso");

    return response.json();
  } catch (err) {
    logger.error("Erro: ", err.message);

    return [];
  }
}

export default async function Home({ searchParams }) {
  const params = searchParams?.page || 1;
  const { data: posts, prev, next } = await getAllPosts(params);

  return (
    <main>
      <div className={styles.gridWrapper}>
        {posts?.map((post, index) => (
          <CardPost key={index + post.id} post={post} />
        ))}
      </div>
      <footer className={styles.navigationWrapper}>
        {prev && <Link href={`/?page=${prev}`}>Página anterior</Link>}
        {next && <Link href={`/?page=${next}`}>Próxima página</Link>}
      </footer>
    </main>
  );
}
