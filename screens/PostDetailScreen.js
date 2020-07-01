import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  Button,
  StyleSheet
} from 'react-native';

import { POSTS } from '../data/dummy-posts';

const PostDetailScreen = props => {
  const postId = props.navigation.getParam('postId');

  const selectedPost = POSTS.find(post => post.id === postId);

  return (
    <ScrollView>
      <Image source={{ uri: selectedPost.imageUrl }} style={styles.image} />
      <ScrollView>
        <Text style={styles.details}>{ selectedPost.content }</Text>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 500
  },
  details: {
    fontSize: 22,
    padding: 15,
    fontFamily: 'raleway',
  }
});

export default PostDetailScreen;