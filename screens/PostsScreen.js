import React from 'react';

import PostList from '../components/PostList';
import { POSTS } from '../data/dummy-posts';

const PostsScreen = props => {
  return <PostList listData={POSTS} navigation={props.navigation} />;
};

PostsScreen.navigationOptions = {
  headerTitle: 'All Posts'
};

export default PostsScreen;
