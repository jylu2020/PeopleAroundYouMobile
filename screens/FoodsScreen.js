import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as postsActions from '../store/actions/posts';
import PostList from '../components/PostList';
import Colors from '../constants/Colors';

const FoodsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const posts = useSelector(state => state.posts.availablePosts);
  const dispatch = useDispatch();

  const loadPosts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(postsActions.fetchFoodPosts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadPosts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadPosts]);

  useEffect(() => {
    setIsLoading(true);
    loadPosts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadPosts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadPosts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && posts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No posts with people found.</Text>
      </View>
    );
  }

  return <PostList 
          onRefresh={loadPosts} 
          refreshing={isRefreshing}
          listData={posts} 
          navigation={props.navigation} 
        />;
};

FoodsScreen.navigationOptions = {
  headerTitle: 'Food'
};

const styles = StyleSheet.create({
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});

export default FoodsScreen;
