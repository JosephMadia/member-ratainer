import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Post } from '../../domain/entities/Post';
import { Colors, FontSize, FontWeight, Spacing } from '../../../../shared/theme';

const postSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  body: z
    .string()
    .min(10, 'Body must be at least 10 characters'),
});

export type PostFormData = z.infer<typeof postSchema>;

interface Props {
  initialValues?: Post;
  onSubmit: (data: PostFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function PostForm({ initialValues, onSubmit, isLoading }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialValues?.title ?? '',
      body: initialValues?.body ?? '',
    },
  });

  return (
    <View style={styles.container}>

      {/* Title field */}
      <Text style={styles.label}>Title</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Enter post title..."
            placeholderTextColor={Colors.textMuted}
          />
        )}
      />
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}

      {/* Body field */}
      <Text style={styles.label}>Body</Text>
      <Controller
        control={control}
        name="body"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, styles.textarea, errors.body && styles.inputError]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Enter post body..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        )}
      />
      {errors.body && (
        <Text style={styles.errorText}>{errors.body.message}</Text>
      )}

      {/* Submit button */}
      <TouchableOpacity
        style={[styles.submitBtn, isLoading && styles.submitBtnDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading
          ? <ActivityIndicator color={Colors.white} />
          : <Text style={styles.submitText}>
              {initialValues ? 'Save Changes' : 'Create Post'}
            </Text>
        }
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: FontSize.xs + 2,
    fontWeight: FontWeight.semibold,
    color: Colors.textLabel,
    marginBottom: 6,
    marginTop: Spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.inputText,
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: Colors.error,
  },
  textarea: {
    height: 130,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Spacing.md,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 28,
  },
  submitBtnDisabled: {
    backgroundColor: Colors.primaryLight,
  },
  submitText: {
    color: Colors.white,
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
});
