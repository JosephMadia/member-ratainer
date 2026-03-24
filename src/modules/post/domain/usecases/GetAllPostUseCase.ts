import { IPostRepository } from '../repositories/IPostRepository';
import { Post } from '../entities/Post';
export class GetAllPostUseCase {
  constructor(private readonly repository: IPostRepository) {}
  execute(): Promise<Post[]> {
    return this.repository.getAllPost();
  }
}
