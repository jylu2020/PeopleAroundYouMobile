import { API_ROOT, CUR_LAT, CUR_LONG } from '../../constants/Constants';
import Post from '../../models/post';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_FACE_POSTS = 'GET_FACE_POSTS';
export const GET_FOOD_POSTS = 'GET_FOOD_POSTS';
export const GET_EXERCISE_POSTS = 'GET_EXERCISE_POSTS';

export const fetchAllPosts = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`${API_ROOT}/search?lat=${CUR_LAT}&lon=${CUR_LONG}`, 
            {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            })
  
            if (!response.ok) {
                throw new Error('Error in fetchAllPosts');
            }
    
            const resData = await response.json();
            const loadedPosts = [];

            for (const pst_id in resData) {
                pst = resData[pst_id];
                if (pst["type"] === "image"){
                    loadedPosts.push(
                        new Post(
                        pst_id,
                        pst["title"],
                        pst["url"],
                        pst["message"]
                        )
                    );
                }
            }
    
            dispatch({ type: GET_ALL_POSTS, allPosts: loadedPosts });
        } catch (err) {
        throw err;
        }
    };
};

export const fetchFacePosts = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`${API_ROOT}/cluster?term=face`, 
            {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            })
  
            if (!response.ok) {
                throw new Error('Error in fetchFacePosts');
            }
    
            const resData = await response.json();
            const loadedPosts = [];

            for (const pst_id in resData) {
                pst = resData[pst_id];
                if (pst["type"] === "image"){
                    loadedPosts.push(
                        new Post(
                        pst_id,
                        pst["title"],
                        pst["url"],
                        pst["message"]
                        )
                    );
                }
            }
    
            dispatch({ type: GET_FACE_POSTS, facePosts: loadedPosts });
        } catch (err) {
        throw err;
        }
    };
};

export const fetchFoodPosts = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`${API_ROOT}/cluster?term=food`, 
            {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            })
  
            if (!response.ok) {
                throw new Error('Error in fetchFoodPosts');
            }
    
            const resData = await response.json();
            const loadedPosts = [];

            for (const pst_id in resData) {
                pst = resData[pst_id];
                if (pst["type"] === "image"){
                    loadedPosts.push(
                        new Post(
                        pst_id,
                        pst["title"],
                        pst["url"],
                        pst["message"]
                        )
                    );
                }
            }
    
            dispatch({ type: GET_FOOD_POSTS, foodPosts: loadedPosts });
        } catch (err) {
        throw err;
        }
    };
};

export const fetchExercisePosts = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`${API_ROOT}/cluster?term=exercise`, 
            {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            })
  
            if (!response.ok) {
                throw new Error('Error in fetchExercisePosts');
            }
    
            const resData = await response.json();
            const loadedPosts = [];

            for (const pst_id in resData) {
                pst = resData[pst_id];
                if (pst["type"] === "image"){
                    loadedPosts.push(
                        new Post(
                        pst_id,
                        pst["title"],
                        pst["url"],
                        pst["message"]
                        )
                    );
                }
            }
    
            dispatch({ type: GET_EXERCISE_POSTS, exercisePosts: loadedPosts });
        } catch (err) {
        throw err;
        }
    };
};