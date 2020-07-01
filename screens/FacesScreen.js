import React from 'react';

import PostList from '../components/PostList';
import { POSTS } from '../data/dummy-posts';

const FacesScreen = props => {
  return <PostList listData={POSTS} navigation={props.navigation} />;
};

FacesScreen.navigationOptions = {
  headerTitle: 'Your Favorites'
};

export default FacesScreen;
