import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { usePost } from '../context/PostContext';
import PostForm, { PostFormData } from '../components/PostForm';
import { RootStackParamList } from '../../../../shared/types/RootStackParamList';
import { commonStyles } from '../../../../shared/styles/common';
import { Spacing } from '../../../../shared/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PostForm'>;

export default function PostFormScreen({ navigation, route }: Props) {
  const existingPost = route.params?.post;
  const isEditing = !!existingPost;
  const { createPost, updatePost } = usePost();
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Post' : 'New Post',
    });
  }, [isEditing]);

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    try {
      if (isEditing && existingPost) {
        await updatePost(existingPost.id, {
          title: data.title,
          body: data.body,
        });
        Alert.alert('Success', 'Post updated successfully!');
      } else {
        await createPost({
          title: data.title,
          body: data.body,
          userId: 1,
        });
        Alert.alert('Success', 'Post created successfully!');
      }
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={commonStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <PostForm
          initialValues={existingPost}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
});
