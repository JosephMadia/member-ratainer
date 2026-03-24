import { Post, CreatePostDTO, UpdatePostDTO } from '../../domain/entities/Post';
import { IPostRepository } from '../../domain/repositories/IPostRepository';
import { PostRemoteDatasoure } from '../datasources/PostRemoteDatasource';
import { PostMapper } from '../mappers/PostMapper';

export class PostRepository implements IPostRepository {
  private postRemoteDataSource = new PostRemoteDatasoure();
  async getAllPost(): Promise<Post[]> {
    const response = await this.postRemoteDataSource.getAllPost();
    return PostMapper.toDomainList(response);
  }
  async getPostById(id: number): Promise<Post> {
    const response = await this.postRemoteDataSource.getPostById(id);
    return PostMapper.toDomain(response);
  }
  async createNewPost(data: CreatePostDTO): Promise<Post> {
    const response = await this.postRemoteDataSource.createNewPost(data);
    return PostMapper.toDomain(response);
  }
  async updatePost(id: number, data: UpdatePostDTO): Promise<Post> {
    const response = await this.postRemoteDataSource.updatePost(id, data);
    return PostMapper.toDomain(response);
  }
  async deletePost(id: number): Promise<void> {
    return await this.postRemoteDataSource.deletePost(id);
  }
}
