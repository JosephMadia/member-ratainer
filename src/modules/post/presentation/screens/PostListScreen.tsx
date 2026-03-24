import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { usePost } from '../context/PostContext';
import PostCard from '../components/PostCard';
import { RootStackParamList } from '../../../../shared/types/RootStackParamList';
import { commonStyles } from '../../../../shared/styles/common';
import { Colors, FontSize, FontWeight, Spacing } from '../../../../shared/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PostList'>;

export default function PostListScreen({ navigation }: Props) {
  const { state, fetchPosts, deletePost } = usePost();
  const { posts, isLoading, error } = state;

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deletePost(id) },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={commonStyles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={fetchPosts}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => navigation.navigate('PostDetail', { id: item.id })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No posts yet. Create one!</Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('PostForm', {})}
      >
        <Text style={styles.fabText}>+ New Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.md,
    marginBottom: Spacing.md,
  },
  retryBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: 10,
    borderRadius: Spacing.sm,
  },
  retryText: {
    color: Colors.white,
    fontWeight: FontWeight.semibold,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: FontSize.md,
    marginTop: Spacing.huge,
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xxl,
    right: Spacing.xxl,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 14,
    borderRadius: 50,
    shadowColor: Colors.primaryShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  fabText: {
    color: Colors.white,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.md,
  },
});
