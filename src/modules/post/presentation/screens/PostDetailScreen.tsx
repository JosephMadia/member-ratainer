import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { usePost } from '../context/PostContext';
import { RootStackParamList } from '../../../../shared/types/RootStackParamList';
import { commonStyles } from '../../../../shared/styles/common';
import { Colors, FontSize, FontWeight, LineHeight, Spacing } from '../../../../shared/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PostDetail'>;

export default function PostDetailScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const { state, fetchPostById, deletePost } = usePost();
  const { selectedPost, isLoading, error } = state;

  useEffect(() => {
    fetchPostById(id);
  }, [id]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deletePost(id);
            navigation.goBack();
          },
        },
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

  if (error || !selectedPost) {
    return (
      <View style={commonStyles.centered}>
        <Text style={styles.errorText}>{error ?? 'Post not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.scrollContent}>
      <Text style={styles.title}>{selectedPost.title}</Text>
      <Text style={styles.meta}>Post #{selectedPost.id} · User {selectedPost.userId}</Text>
      <Text style={styles.body}>{selectedPost.body}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('PostForm', { post: selectedPost })}
        >
          <Text style={styles.editText}>Edit Post</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textTransform: 'capitalize',
  },
  meta: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: Spacing.xl,
  },
  body: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: LineHeight.normal,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xxxl,
  },
  editBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: Spacing.md,
    alignItems: 'center',
  },
  editText: {
    color: Colors.white,
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.md,
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: Colors.errorLight,
    paddingVertical: 14,
    borderRadius: Spacing.md,
    alignItems: 'center',
  },
  deleteText: {
    color: Colors.error,
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.md,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.md,
    marginBottom: Spacing.md,
  },
});
