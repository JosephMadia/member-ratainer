import { CreatePostDTO, Post } from '../entities/Post';
import { IPostRepository } from '../repositories/IPostRepository';

export class CreateNewPost {
  constructor(private readonly repository: IPostRepository) {}
  execute(data: CreatePostDTO): Promise<Post> {
    return this.repository.createNewPost(data);
  }
}
