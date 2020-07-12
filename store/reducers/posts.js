import Post from '../../models/post';
import { GET_ALL_POSTS, GET_FACE_POSTS, GET_FOOD_POSTS, GET_EXERCISE_POSTS, CREATE_POST } from '../actions/posts';

const initialState = {
    availablePosts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                availablePosts: action.allPosts
            };
        case GET_FACE_POSTS:
            return {
                availablePosts: action.facePosts
            };
        case GET_FOOD_POSTS:
            return {
                availablePosts: action.foodPosts
            };
        case GET_EXERCISE_POSTS:
            return {
                availablePosts: action.exercisePosts
            };
        case CREATE_POST:
            const newPost = new Post(
                action.newPost.id,
                action.newPost.title,
                action.newPost.image,
                action.newPost.content,
                0,
                0
              );
              return {
                availablePosts: state.availablePosts.concat(newPost)
              };
    }
    return state;
};