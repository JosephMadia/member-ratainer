import { Post } from '../entities/Post';
import { IPostRepository } from '../repositories/IPostRepository';

export class GetPostById {
  constructor(private readonly repository: IPostRepository) {}
  execute(id: number): Promise<Post> {
    return this.repository.getPostById(id);
  }
}
