import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { CUR_LAT, CUR_LONG } from '../constants/Constants';
import * as postsActions from '../store/actions/posts';

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const MapsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const posts = useSelector(state => state.posts.availablePosts);
  const dispatch = useDispatch();

  const loadPosts = useCallback(async () => {
    try {
      await dispatch(postsActions.fetchAllPosts());
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch, setIsLoading]);

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

  const mapRegion = {
    latitude: 34.028877, 
    longitude: -118.272946,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3
  };

  let curCoordinates = {
    latitude: 34.028877, 
    longitude: -118.272946
  };

  if (!isLoading && posts.length === 0) {
    return (
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={() => {}}
      >
        <Marker title="No posts loaded" coordinate={curCoordinates} />
      </MapView>
    );
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={() => {}}
    >
      {posts.map(pmarker => (
        <Marker
          key={pmarker.id}
          coordinate={ {latitude: pmarker.lat, longitude: pmarker.lon} }
          title={pmarker.title}
          pinColor={randomColor()}
          // onPress={() => {
          //   props.navigation.navigate({
          //     routeName: 'PostDetail',
          //     params: {
          //       postId: pmarker.id
          //     }
          //   });
          // }}
        />
      ))}
    </MapView>
  );

};

MapsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Posts Around You',
    headerLeft: () =>
      <Ionicons
      style={{ paddingLeft: 10 }}
      onPress={() => navData.navigation.openDrawer()} 
      name="ios-menu" 
      size={20} 
      color={Colors.primaryColor}
      />
    ,
    headerTitleStyle: {
      fontFamily: 'pacifico',
      fontSize: 23
    }
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  map: {
    flex: 1
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  }
});

export default MapsScreen;