import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import Card from '../components/Card';
import * as postsActions from '../store/actions/posts';
import ImgPicker from '../components/ImgPicker';
import LocPicker from '../components/LocPicker';

const NewPostScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [curLocation, setCurLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  const descriptionChangeHandler = text => {
    setDescriptionValue(text);
  };

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  };

  const locationPickedHandler = useCallback(location => {
    setCurLocation(location);
  }, []);

  const savePostHandler = () => {
    dispatch(postsActions.createPost(titleValue, descriptionValue, selectedImage, curLocation));
    props.navigation.navigate('Posts');
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#9c369c']} style={styles.gradient}>
      <Card style={styles.cardContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={descriptionChangeHandler}
          value={descriptionValue}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save"
          color={Colors.accent}
          onPress={savePostHandler}
        />
      </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

NewPostScreen.navigationOptions = {
  headerTitle: 'New Post'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 600,
    padding: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPostScreen;
