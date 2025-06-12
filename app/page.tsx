import { API } from 'aws-amplify';
import { listPosts } from '../src/graphql/queries';

export default async function Home() {
  const postData: any = await API.graphql({ query: listPosts });
  const posts = postData.data?.listPosts?.items || [];

  return (
    <div>
      <h1 className="text-6xl font-bold underline">My Posts</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post: any) => (
            <li key={post.id}>
              {post.title} - {post.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
