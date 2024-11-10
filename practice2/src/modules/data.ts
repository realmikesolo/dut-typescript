import { Post } from '../types/post';
import { openModal } from './ui';

export async function fetchData(): Promise<void> {
  const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await response.json();
  const content: string = posts.slice(0, 5).map(post => post.title).join("\n");
  openModal(content);
}
