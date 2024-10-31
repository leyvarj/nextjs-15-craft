import { getPostSlugs, getPostData } from "@/utils/loadPosts"; // Ensure both functions are imported
import { notFound } from "next/navigation";
import React from "react";
import { remark } from "remark";
import html from "remark-html";

interface PostProps {
  title: string;
  content: string;
}

const Post: React.FC<PostProps> = ({ title, content }) => {
  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

// Fetch post data based on the slug
export async function generateStaticParams() {
  const slugs = await getPostSlugs(); // Ensure this is imported and defined
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  if (!postData) {
    notFound(); // Use Next.js built-in navigation to handle 404
  }

  const processedContent = await remark().use(html).process(postData.content);

  return <Post title={postData.title} content={processedContent.toString()} />;
}
