import React, { ReactNode } from "react";
import CategoryList from "@/components/Layout/CategortList";
import { getAllCategory } from "@/lib/posts";

const BlogHome = ({ children }: { children: ReactNode }) => {
  const categories = getAllCategory();

  return (
    <div>
      <CategoryList categories={categories} />
      {children}
    </div>
  );
};

export default BlogHome;
