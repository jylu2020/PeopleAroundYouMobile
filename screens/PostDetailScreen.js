import React from 'react';
import {
  ScrollView,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';


const PostDetailScreen = props => {
  const posts = useSelector(state => state.posts.availablePosts);
  const postId = props.navigation.getParam('postId');

  const selectedPost = posts.find(post => post.id === postId);

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