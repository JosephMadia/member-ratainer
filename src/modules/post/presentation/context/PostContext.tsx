import { GetAllPostUseCase } from '../../domain/usecases/GetAllPostUseCase';
import { PostRepository } from '../../data/repositories/PostRepository';
import { CreateNewPost } from '../../domain/usecases/CreateNewPost';
import { GetPostById } from '../../domain/usecases/GetPostById';
import { UpdatePost } from '../../domain/usecases/UpdatePost';
import { DeletePost } from '../../domain/usecases/DeletePostUseCase';
import { CreatePostDTO, Post, UpdatePostDTO } from '../../domain/entities/Post';
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';

const postRepository = new PostRepository();

const getAllPostUsacase = new GetAllPostUseCase(postRepository);
const getPostByIdUsacase = new GetPostById(postRepository);
const createNewPostUsacase = new CreateNewPost(postRepository);
const updatePostUsacase = new UpdatePost(postRepository);
const deleltePostUsacase = new DeletePost(postRepository);

interface State {
  posts: Post[];
  selectedPost: Post | null;
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: 'LOADING' }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_SELECTED_POST'; payload: Post }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'UPDATE_POST'; payload: Post }
  | { type: 'DELETE_POST'; payload: number }
  | { type: 'ERROR'; payload: string };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'SET_POSTS':
      return { ...state, isLoading: false, posts: action.payload };
    case 'SET_SELECTED_POST':
      return { ...state, isLoading: false, selectedPost: action.payload };
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post,
        ),
      };

    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

interface PostContextType {
  state: State;
  fetchPosts: () => Promise<void>;
  fetchPostById: (id: number) => Promise<void>;
  createPost: (data: CreatePostDTO) => Promise<void>;
  updatePost: (id: number, data: UpdatePostDTO) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    posts: [],
    selectedPost: null,
    isLoading: false,
    error: null,
  });

  const fetchPosts = async () => {
    dispatch({ type: 'LOADING' });
    try {
      dispatch({
        type: 'SET_POSTS',
        payload: await getAllPostUsacase.execute(),
      });
    } catch (e) {
      dispatch({ type: 'ERROR', payload: 'Failed to load posts' });
    }
  };

  const fetchPostById = async (id: number) => {
    dispatch({ type: 'LOADING' });
    try {
      dispatch({
        type: 'SET_SELECTED_POST',
        payload: await getPostByIdUsacase.execute(id),
      });
    } catch {
      dispatch({ type: 'ERROR', payload: 'Failed to load post' });
    }
  };

  const createPost = async (data: CreatePostDTO) => {
    try {
      dispatch({
        type: 'ADD_POST',
        payload: await createNewPostUsacase.execute(data),
      });
    } catch {
      dispatch({ type: 'ERROR', payload: 'Failed to create post' });
    }
  };

  const updatePost = async (id: number, data: UpdatePostDTO) => {
    try {
      dispatch({
        type: 'UPDATE_POST',
        payload: await updatePostUsacase.execute(id, data),
      });
    } catch {
      dispatch({ type: 'ERROR', payload: 'Failed to update post' });
    }
  };

  const deletePost = async (id: number) => {
    try {
      await deleltePostUsacase.execute(id);
      dispatch({ type: 'DELETE_POST', payload: id });
    } catch {
      dispatch({ type: 'ERROR', payload: 'Failed to delete post' });
    }
  };

  const value = useMemo(
    () => ({
      state,
      fetchPosts,
      fetchPostById,
      createPost,
      updatePost,
      deletePost,
    }),
    [state],
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export function usePost() {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error('usePost must be used inside PostProvider');
  return ctx;
}
