import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxComponents } from "@/components/MDX/index";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

interface Props {
  content: string;
}

const PostBody = ({ content }: Props) => {
  return (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [rehypePrettyCode, rehypeSlug],
        },
      }}
      components={MdxComponents}
    />
  );
};

export default PostBody;
