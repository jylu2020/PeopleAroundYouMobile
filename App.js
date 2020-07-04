import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import postReducer from './store/reducers/posts';
import AroundsNavigator from './navigation/AroundsNavigator';

enableScreens();

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'pacifico': require('./assets/fonts/Pacifico.ttf'),
    'raleway': require('./assets/fonts/Raleway-Regular.ttf'),
    'raleway-light': require('./assets/fonts/Raleway-Light.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AroundsNavigator />
    </Provider>
  );
}