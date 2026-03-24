import { IPostRepository } from '../repositories/IPostRepository';

export class DeletePost {
  constructor(private readonly repository: IPostRepository) {}
  execute(id: number): Promise<void> {
    return this.repository.deletePost(id);
  }
}
