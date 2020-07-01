import React from 'react';

import PostList from '../components/PostList';
import { POSTS } from '../data/dummy-posts';

const FoodsScreen = props => {
  return <PostList listData={POSTS} navigation={props.navigation} />;
};

FoodsScreen.navigationOptions = {
  headerTitle: 'Food'
};

export default FoodsScreen;
