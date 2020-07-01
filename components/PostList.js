import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import PostItem from './PostItem';

const PostList = props => {
  const renderPostItem = itemData => {
    return (
      <PostItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        onSelectPost={() => {
          props.navigation.navigate({
            routeName: 'PostDetail',
            params: {
              postId: itemData.item.id
            }
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderPostItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default PostList;
