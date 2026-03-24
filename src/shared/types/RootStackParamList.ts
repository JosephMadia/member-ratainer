import { Post } from '../../modules/post/domain/entities/Post';

export type RootStackParamList = {
  PostList: undefined;
  PostDetail: { id: number };
  PostForm: { post?: Post };
};
