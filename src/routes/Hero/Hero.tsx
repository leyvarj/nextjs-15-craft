import styles from "../Hero/hero.module.css";
import { getPostSlugs, getPostData } from "@/utils/loadPosts"; // Import getPostData
import Link from "next/link";
import React from "react";

interface PostPreview {
  slug: string;
  title: string;
}

async function Hero() {
  const slugs = await getPostSlugs();
  const posts: PostPreview[] = await Promise.all(
    slugs.map(async (slug) => {
      const postData = await getPostData(slug); // Ensure this is defined
      return {
        slug,
        title: postData.title,
      };
    }),
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Ryan Jay Leyva</h1>
        <h2 className={styles.about}>
          A consultant turned digital enthusiast. Dive in for Neovim, keyboards,
          and crafts.
        </h2>
        <h1 className={styles.subHeading}>Articles</h1>
        <h4 className={styles.yr}>2024</h4>
        <div className={styles.postsWrapper}>
          <div>
            <h5 className={styles.month}>11-1-2024</h5>
            <h5 className={styles.month}>11-2-2024</h5>
            <h5 className={styles.month}>11-2-2024</h5>
          </div>
          <ul className={styles.mdUl}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <li className={styles.mdLi} key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
              ))
            ) : (
              <li>No posts available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Hero;
