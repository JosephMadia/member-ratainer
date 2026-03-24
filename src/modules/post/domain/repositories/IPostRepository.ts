import { Post, CreatePostDTO, UpdatePostDTO } from '../entities/Post';

export interface IPostRepository {
  getAllPost(): Promise<Post[]>;
  getPostById(id: number): Promise<Post>;
  createNewPost(data: CreatePostDTO): Promise<Post>;
  updatePost(id: number, data: UpdatePostDTO): Promise<Post>;
  deletePost(id: number): Promise<void>;
}
