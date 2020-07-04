import Post from '../../models/post';
import { GET_ALL_POSTS, GET_FACE_POSTS, GET_FOOD_POSTS, GET_EXERCISE_POSTS } from '../actions/posts';

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
        /*case CREATE_POST:
            const newPost = new Post(
                action.postData.id,
                action.postData.title,
                action.postData.imageUrl,
                action.postData.content
            );
            return {
                ...state,
                availablePosts: state.availablePosts.concat(newPost)
            };*/
    }
    return state;
};