"use client";

import { useParams } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";

export default function EditPostPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  return <PostEditor postId={id} />;
}
