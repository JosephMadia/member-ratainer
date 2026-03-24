import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../shared/types/RootStackParamList';
import PostListScreen from '../../modules/post/presentation/screens/PostListScreen';
import PostDetailScreen from '../../modules/post/presentation/screens/PostDetailScreen';
import PostFormScreen from '../../modules/post/presentation/screens/PostFormScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PostList"   component={PostListScreen}   options={{ title: 'Posts' }} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'Detail' }} />
        <Stack.Screen name="PostForm"   component={PostFormScreen}   options={{ title: 'Post' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}