import { Post } from '../../domain/entities/Post';
export class PostMapper {
  static toDomain(raw: any): Post {
    return {
      id: raw.id ?? -1,
      title: raw.title ?? '',
      body: raw.body ?? '',
      userId: raw.userId ?? -1,
    };
  }
  static toDomainList(raw: any[]): Post[] {
    return raw.map(PostMapper.toDomain);
  }
}
