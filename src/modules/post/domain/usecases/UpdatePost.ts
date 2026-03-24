import { Post, UpdatePostDTO } from '../entities/Post';
import { IPostRepository } from '../repositories/IPostRepository';

export class UpdatePost {
  constructor(private readonly repository: IPostRepository) {}
  execute(id: number, data: UpdatePostDTO): Promise<Post> {
    return this.repository.updatePost(id, data);
  }
}
