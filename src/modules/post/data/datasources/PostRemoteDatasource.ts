import apiClient from '../../../../shared/http/ApiClient';
import { Post, CreatePostDTO, UpdatePostDTO } from '../../domain/entities/Post';

export class PostRemoteDatasoure {
  getAllPost(): Promise<Post[]> {
    return apiClient.get<Post[]>('/posts').then((r: { data: any }) => r.data);
  }
  getPostById(id: number): Promise<Post> {
    return apiClient
      .get<Post>(`/posts/${id}`)
      .then((r: { data: any }) => r.data);
  }
  createNewPost(data: CreatePostDTO): Promise<Post> {
    return apiClient
      .post<Post>(`/post`, data)
      .then((r: { data: any }) => r.data);
  }
  updatePost(id: number, data: UpdatePostDTO): Promise<Post> {
    return apiClient
      .put<Post>(`/posts/${id}`, data)
      .then((r: { data: any }) => r.data);
  }
  deletePost(id: number): Promise<void> {
    return apiClient
      .delete<void>(`/posts/${id}`)
      .then((r: { data: any }) => r.data);
  }
}
