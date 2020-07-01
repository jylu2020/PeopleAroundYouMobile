import React from 'react';

import PostList from '../components/PostList';
import { POSTS } from '../data/dummy-posts';

const ExerciseScreen = props => {
  return <PostList listData={POSTS} navigation={props.navigation} />;
};

ExerciseScreen.navigationOptions = {
  headerTitle: 'Exercise'
};

export default ExerciseScreen;
