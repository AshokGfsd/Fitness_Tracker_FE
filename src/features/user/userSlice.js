import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  profile: {
    BMI: [],
    DOB: null,
    age: null,
    calories: [
      {
        totalCaloriesBurned: 0,
        totalCaloriesConsumed: 0,
        totalCaloriesGoal: 0,
        remainingCaloriestoGoal: 0,
      },
    ],
    email: "",
    gender: "",
    height: [],
    suggestions: [],
    userName: "",
    weight: [],
  },
  log: false,
  exercises: [],
  foods: [],
  goals: [],
  todayExercises: [],
  todayFoods: [],
  todayGoals: [],
  suggestions: { exercises: [], foods: [], goals: [] },
  yourSuggestions: { exercises: [], foods: [], goals: [] },
  loading: false,
  yourSuggestionsLoading: {
    adding: false,
    deleting: false,
  },
  suggestionsLoading: {
    adding: false,
    deleting: false,
  },
  exerciseLoading: {
    adding: false,
    deleting: false,
  },
  foodLoading: {
    adding: false,
    deleting: false,
  },
  goalLoading: {
    adding: false,
    deleting: false,
  },
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userActions: (state, action) => {
      //  console.log(action.payload);
      switch (action.payload.type) {
        case "FETCH_PROFILE_SUCCESS":
          return {
            ...state,
            log: true,
            profile: action.payload.payload,
            loading: false,
            error: null,
          };
        case "FETCH_PROFILE_FAILURE":
          return {
            ...state,
            loading: false,
            error: "Error while fetching profile",
          };
        case "FETCH_EXERCISES_SUCCESS":
          return {
            ...state,
            exercises: action.payload.payload,
            loading: false,
            error: null,
          };
        case "FETCH_EXERCISES_FAILURE":
          return {
            ...state,
            loading: false,
            error: "Error while fetching exercises",
          };
        case "FETCH_FOODS_SUCCESS":
          return {
            ...state,
            foods: action.payload.payload,
            loading: false,
            error: null,
          };
        case "FETCH_FOODS_FAILURE":
          return {
            ...state,
            loading: false,
            error: "Error while fetching foods",
          };
        case "FETCH_GOALS_SUCCESS":
          return {
            ...state,
            goals: action.payload.payload,
            loading: false,
            error: null,
          };
        case "FETCH_GOALS_FAILURE":
          return {
            ...state,
            loading: false,
            error: "Error while fetching goals",
          };
        case "FETCH_TODAY_EXERCISES_SUCCESS":
          return {
            ...state,
            todayExercises: action.payload.payload,
            loading: false,
            error: null,
          };
        case "FETCH_TODAY_EXERCISES_FAILURE":
          return {
            ...state,
            loading: false,
            error: "Error while fetching exercises",
          };
        case "FETCH_TODAY_FOODS_SUCCESS":
          return {
            ...state,
            todayFoods: action.payload.payload,
            loading: false,
            error: null,
          };
        case "FETCH_TODAY_FOODS_FAILURE":
          return {
            ...state,
            loading: false,
            error: "Error while fetching foods",
          };
        case "FETCH_TODAY_GOALS_SUCCESS":
          return {
            ...state,
            todayGoals: action.payload.payload,
            loading: false,
            error: null,
          };
        case "FETCH_TODAY_GOALS_FAILURE":
          return {
            ...state,
            loading: false,
            error: "Error while fetching goals",
          };
        case "FETCH_DATA_LOADING":
          return {
            ...state,
            loading: true,
          };
        case "FETCH_SUGGESTION_SUCCESS":
          return {
            ...state,
            log: true,
            suggestions: action.payload.payload,
            loading: false,
            error: null,
          };
        case "FETCH_SUGGESTION_FAILURE":
          return {
            ...state,
            loading: false,
            error: "Error while fetching suggestion",
          };
        case "ADD_SUGGESTION_SUCCESS":
          return {
            ...state,
            goals: [action.payload.payload, ...state.suggestions],
            goalLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "DELETE_SUGGESTION_SUCCESS":
          return {
            ...state,
            suggestions: action.payload.payload,
            suggestionsLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "UPDATE_SUGGESTION_SUCCESS":
          return {
            ...state,
            suggestions: action.payload.payload,
            suggestionsLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "FETCH_YOUR_SUGGESTION_SUCCESS":
          return {
            ...state,
            log: true,
            yourSuggestions: action.payload.payload,
            loading: false,
            error: null,
          };
        case "FETCH_YOUR_SUGGESTION_FAILURE":
          return {
            ...state,
            loading: false,
            error: "Error while fetching suggestion",
          };
        case "ADD_YOUR_SUGGESTION_SUCCESS":
          return {
            ...state,
            yourSuggestions: [action.payload.payload, ...state.suggestions],
            yourSuggestionsLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "DELETE_YOUR_SUGGESTION_SUCCESS":
          return {
            ...state,
            yourSuggestions: action.payload.payload,
            yourSuggestionsLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "UPDATE_YOUR_SUGGESTION_SUCCESS":
          return {
            ...state,
            yourSuggestions: action.payload.payload,
            yourSuggestionsLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "ADD_EXERCISE_LOADING":
          return {
            ...state,
            exerciseLoading: {
              adding: true,
              deleting: false,
            },
          };
        case "ADD_FOOD_LOADING":
          return {
            ...state,
            foodLoading: {
              adding: true,
              deleting: false,
            },
          };
        case "ADD_GOAL_LOADING":
          return {
            ...state,
            goalLoading: {
              adding: true,
              deleting: false,
            },
          };
        case "DELETE_EXERCISE_LOADING":
          return {
            ...state,
            exerciseLoading: {
              adding: false,
              deleting: true,
            },
          };
        case "UPDATE_EXERCISE_LOADING":
          return {
            ...state,
            exerciseLoading: {
              adding: false,
              deleting: true,
            },
          };
        case "DELETE_FOOD_LOADING":
          return {
            ...state,
            foodLoading: {
              adding: false,
              deleting: true,
            },
          };
        case "DELETE_GOAL_LOADING":
          return {
            ...state,
            goalLoading: {
              adding: false,
              deleting: true,
            },
          };
        case "UPDATE_FOOD_LOADING":
          return {
            ...state,
            foodLoading: {
              adding: false,
              deleting: true,
            },
          };
        case "UPDATE_GOAL_LOADING":
          return {
            ...state,
            goalLoading: {
              adding: false,
              deleting: true,
            },
          };
        case "ADD_EXERCISE_SUCCESS":
          return {
            ...state,
            todayExercises: [action.payload.payload, ...state.todayExercises],
            exerciseLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "ADD_FOOD_SUCCESS":
          return {
            ...state,
            todayFoods: [action.payload.payload, ...state.todayFoods],
            foodLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "ADD_GOAL_SUCCESS":
          return {
            ...state,
            todayGoals: [action.payload.payload, ...state.todayGoals],
            goalLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "ADD_DATA_FAILURE":
          return {
            ...state,
            error: "Something went wrong try again",
            exerciseLoading: {
              adding: false,
              deleting: false,
            },
          };
        case "UPDATE_EXERCISE_SUCCESS":
          return {
            ...state,
            todayExercises: action.payload.payload,
            exerciseLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "UPDATE_FOOD_SUCCESS":
          return {
            ...state,
            todayFoods: action.payload.payload,
            foodLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "UPDATE_GOAL_SUCCESS":
          return {
            ...state,
            todayGoals: action.payload.payload,
            goalLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "DELETE_EXERCISE_SUCCESS":
          return {
            ...state,
            todayExercises: action.payload.payload,
            exerciseLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "DELETE_FOOD_SUCCESS":
          return {
            ...state,
            todayFoods: action.payload.payload,
            foodLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "DELETE_GOAL_SUCCESS":
          return {
            ...state,
            todayGoals: action.payload.payload,
            goalLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        case "DELETE_DATA_FAILURE":
          return {
            ...state,
            error: "Something went wrong try again",
          };
        case "LOGOUT_SUCCESS":
          return {
            profile: {
              BMI: [],
              DOB: null,
              age: null,
              calories: [
                {
                  totalCaloriesBurned: 0,
                  totalCaloriesConsumed: 0,
                  totalCaloriesGoal: 0,
                  remainingCaloriestoGoal: 0,
                },
              ],
              email: "",
              gender: "",
              height: [],
              suggestions: [],
              userName: "",
              weight: [],
            },
            log: false,
            exercises: [],
            foods: [],
            goals: [],
            todayExercises: [],
            todayFoods: [],
            todayGoals: [],
            suggestions: { exercises: [], foods: [], goals: [] },
            yourSuggestions: { exercises: [], foods: [], goals: [] },
            loading: false,
            yourSuggestionsLoading: {
              adding: false,
              deleting: false,
            },
            suggestionsLoading: {
              adding: false,
              deleting: false,
            },
            exerciseLoading: {
              adding: false,
              deleting: false,
            },
            foodLoading: {
              adding: false,
              deleting: false,
            },
            goalLoading: {
              adding: false,
              deleting: false,
            },
            error: null,
          };
        default:
          return state;
      }
    },
  },
});

export default userSlice.reducer;

export const { userActions } = userSlice.actions;

export const selectUser = (state) => state.user;
