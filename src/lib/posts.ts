import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";

const postsDirectory = path.join(process.cwd(), "src/content");

// 모든 포스트 목록 불러오기
export function getAllPosts() {
  const categories = fs.readdirSync(postsDirectory); // 카테고리 폴더 목록 가져오기
  const allPosts: { category: string; slug: string; frontmatter: any }[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(postsDirectory, category);
    if (!fs.lstatSync(categoryPath).isDirectory()) return; // 폴더인지 확인

    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".mdx"));

    files.forEach((file) => {
      const slug = file.replace(".mdx", "");
      const fileContents = fs.readFileSync(
        path.join(categoryPath, file),
        "utf8",
      );
      const { data } = matter(fileContents);

      allPosts.push({ category, slug, frontmatter: data });
    });
  });

  return allPosts.sort((a, b) => {
    const dateA = dayjs(a.frontmatter.date, "YYYY-MM-DD", true);
    const dateB = dayjs(b.frontmatter.date, "YYYY-MM-DD", true);

    // 날짜가 유효하지 않으면 가장 뒤로 정렬
    if (!dateA.isValid()) return 1;
    if (!dateB.isValid()) return -1;

    return dateB.valueOf() - dateA.valueOf();
  });
}

// 특정 카테고리의 포스트만 가져오는 함수
export function getPostsByCategory(category: string) {
  return getAllPosts().filter((post) => post.category === category);
}

// 모든 카테고리 목록 불러오기
export function getAllCategory() {
  // 카테고리 폴더 목록 가져오기
  return fs.readdirSync(postsDirectory);
}
