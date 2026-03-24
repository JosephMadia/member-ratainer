import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Post } from '../../domain/entities/Post';
import { Colors, FontSize, FontWeight, LineHeight, Spacing } from '../../../../shared/theme';

interface Props {
  post: Post;
  onPress: () => void;
  onDelete: () => void;
}

export default function PostCard({ post, onPress, onDelete }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{post.title}</Text>
        <Text style={styles.body} numberOfLines={2}>{post.body}</Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  content: {
    flex: 1,
    marginRight: Spacing.md,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  body: {
    fontSize: FontSize.sm,
    color: Colors.textBody,
    lineHeight: LineHeight.tight,
  },
  deleteBtn: {
    backgroundColor: Colors.errorLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.sm,
  },
  deleteText: {
    color: Colors.error,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
});
