
import React from "react";

type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
};


async function fetchRandomPosts(): Promise<Post[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {

        cache: 'force-cache',
    });
    const allPosts: Post[] = await res.json();

    const shuffled = allPosts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}

// Server Component (async)
export default async function Home() {
    const posts = await fetchRandomPosts();

    return (
        <div>
            <h1>10 Random Posts (SSG / App Router)</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <small>User ID: {post.userId}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}
