import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigation';
import { PostProvider } from '../modules/post/presentation/context/PostContext';

function App() {
  return (
    <SafeAreaProvider>
      <PostProvider>
        <RootNavigator />
      </PostProvider>
    </SafeAreaProvider>
  );
}

export default App;
