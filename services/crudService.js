export async function getPosts() {
  const res = await fetch(`${process?.env?.BASE_URL}/api`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function createPost(postData) {
  const res = await fetch(`${process?.env?.BASE_URL}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${process?.env?.BASE_URL}/api/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
}

export async function updatePost(id, postData) {
  const res = await fetch(`${process?.env?.BASE_URL}/api/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}
