import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'; 

import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

import PostsScreen from '../screens/PostsScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import FacesScreen from '../screens/FacesScreen';
import FoodsScreen from '../screens/FoodsScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import MapsScreen from '../screens/MapsScreen';
import AuthScreen from '../screens/AuthScreen';
import NewPostScreen from '../screens/NewPostScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily: 'pacifico'
  },
  headerBackTitleStyle: {
    fontFamily: 'raleway'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
};

const PostsNavigator = createStackNavigator(
  {
    Posts: PostsScreen,
    PostDetail: PostDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FacesNavigator = createStackNavigator(
  {
    Faces: FacesScreen,
    PostDetail: PostDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FoodsNavigator = createStackNavigator(
  {
    Foods: FoodsScreen,
    PostDetail: PostDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const ExerciseNavigator = createStackNavigator(
  {
    Exercise: ExerciseScreen,
    PostDetail: PostDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MapsNavigator = createStackNavigator(
  {
    Maps: MapsScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Posts: {
    screen: PostsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-paper" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'raleway' }}>All</Text>
        ) : (
          'All'
        )
    }
  },
  People: {
    screen: FacesNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-happy" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'raleway' }}>People</Text>
        ) : (
          'People'
        )
    }
  },
  Foods: {
    screen: FoodsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'raleway' }}>Foods</Text>
        ) : (
          'Foods'
        )
    }
  },
  Exercises: {
    screen: ExerciseNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-body" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'raleway' }}>Exercise</Text>
        ) : (
          'Exercise'
        )
    }
  }
};

const PostsTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        navigationOptions: ({ navigation }) => {
          const { routeName } = navigation.state.routes[navigation.state.index];
          return {
            headerTitle: routeName
          };
        },
        tabBarOptions: {
          labelStyle: {
            fontFamily: 'raleway-bold'
          },
          activeTintColor: Colors.accentColor
        }
      });

const PostsStackNavigator = createStackNavigator(
  {
    PostsTabNavigator:PostsTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: () =>
        <Ionicons
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.openDrawer()} 
          name="ios-menu" 
          size={20} 
          color={Colors.primaryColor}
        />
        ,
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTitleStyle: {
          fontFamily: 'pacifico',
          fontSize: 23
        },
        headerBackTitleStyle: {
          fontFamily: 'raleway'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        headerTitle: 'A Screen'
      };
    },
  }
);

const HomeNavigator = createDrawerNavigator(
  {
    Posts: {
      screen: PostsStackNavigator
    },
    NewPosts: {
      screen: NewPostScreen,
      navigationOptions: {
        drawerLabel: 'Add New Post'
      }
    },
    Maps: MapsNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'raleway-bold'
      }
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Home: HomeNavigator
});

export default createAppContainer(MainNavigator);
