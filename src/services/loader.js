import exerciseServices from "./exerciseServices";
import foodServices from "./foodServices";
import goalServices from "./goalServices";
import suggestionServices from "./suggestionServices";
import userServices from "./userServices";

export const fetchTodayExercises = async (dispatch, userActions) => {
  try {
    dispatch(userActions({ type: "FETCH_DATA_LOADING" }));
    const { data } = await exerciseServices.getToday();
    dispatch(
      userActions({
        type: "FETCH_TODAY_EXERCISES_SUCCESS",
        payload: data.exercises,
      })
    );
  } catch (error) {
    console.error("Error while fetching exercises:", error);
    dispatch(userActions({ type: "FETCH_TODAY_EXERCISES_FAILURE" }));
  }
};
export const fetchExercises = async (dispatch, userActions) => {
  try {
    dispatch(userActions({ type: "FETCH_DATA_LOADING" }));
    const { data } = await exerciseServices.get();
    dispatch(
      userActions({ type: "FETCH_EXERCISES_SUCCESS", payload: data.exercises })
    );
  } catch (error) {
    console.error("Error while fetching exercises:", error);
    dispatch(userActions({ type: "FETCH_EXERCISES_FAILURE" }));
  }
};

export const fetchTodayGoals = async (dispatch, userActions) => {
  try {
    dispatch(userActions({ type: "FETCH_DATA_LOADING" }));
    const { data } = await goalServices.getToday();
    dispatch(
      userActions({ type: "FETCH_TODAY_GOALS_SUCCESS", payload: data.goals })
    );
  } catch (error) {
    console.error("Error while fetching goals:", error);
    dispatch(userActions({ type: "FETCH_TODAY_GOALS_FAILURE" }));
  }
};
export const fetchGoals = async (dispatch, userActions) => {
  try {
    dispatch(userActions({ type: "FETCH_DATA_LOADING" }));
    const { data } = await goalServices.get();
    dispatch(userActions({ type: "FETCH_GOALS_SUCCESS", payload: data.goals }));
  } catch (error) {
    console.error("Error while fetching goals:", error);
    dispatch(userActions({ type: "FETCH_GOALS_FAILURE" }));
  }
};
export const fetchFoods = async (dispatch, userActions) => {
  try {
    dispatch(userActions({ type: "FETCH_DATA_LOADING" }));
    const { data } = await foodServices.get();
    dispatch(userActions({ type: "FETCH_FOODS_SUCCESS", payload: data.foods }));
  } catch (error) {
    console.error("Error while fetching foods:", error);
    dispatch(userActions({ type: "FETCH_FOODS_FAILURE" }));
  }
};
export const fetchTodayFoods = async (dispatch, userActions) => {
  try {
    dispatch(userActions({ type: "FETCH_DATA_LOADING" }));
    const { data } = await foodServices.getToday();
    dispatch(
      userActions({ type: "FETCH_TODAY_FOODS_SUCCESS", payload: data.foods })
    );
  } catch (error) {
    console.error("Error while fetching foods:", error);
    dispatch(userActions({ type: "FETCH_TODAY_FOODS_FAILURE" }));
  }
};
export const profile = async (dispatch, userActions) => {
  try {
    dispatch(userActions({ type: "FETCH_DATA_LOADING" }));
    const { data } = await userServices.checkAuth();
    dispatch(
      userActions({ type: "FETCH_PROFILE_SUCCESS", payload: data.user })
    );
  } catch (error) {
    dispatch(userActions({ type: "FETCH_PROFILE_FAILURE" }));
  }
};

export const fetchYourSuggestion = async (dispatch, userActions) => {
  try {
    dispatch(userActions({ type: "FETCH_DATA_LOADING" }));
    const { data } = await suggestionServices.getYour();
    let exercises = [];
    let foods = [];
    let goals = [];
    const split = (data) => {
      if (data.type == "exercise") {
        let temp = { ...data };
        delete temp.details;
        exercises.push({
          ...temp,
          ...data.details,
        });
      } else if (data.type == "food") {
        let temp = { ...data };
        delete temp.details;
        foods.push({
          ...temp,
          ...data.details,
        });
      } else if (data.type == "goal") {
        let temp = { ...data };
        delete temp.details;
        goals.push({
          ...temp,
          ...data.details,
        });
      }
    };
    data.suggestions.map((data) => split(data));
    const payload = { exercises, foods, goals };
    dispatch(
      userActions({
        type: "FETCH_YOUR_SUGGESTION_SUCCESS",
        payload,
      })
    );
  } catch (error) {
    console.error("Error while fetching suggestions:", error);
    dispatch(userActions({ type: "FETCH_YOUR_SUGGESTION_SUCCESS" }));
  }
};

export const fetchSuggestion = async (dispatch, userActions) => {
  try {
    dispatch(userActions({ type: "FETCH_DATA_LOADING" }));
    const { data } = await suggestionServices.get();
    let exercises = [];
    let foods = [];
    let goals = [];
    const split = (data) => {
      if (data.type == "exercise") {
        let temp = { ...data };
        delete temp.details;
        exercises.push({
          ...temp,
          ...data.details,
        });
      } else if (data.type == "food") {
        let temp = { ...data };
        delete temp.details;
        foods.push({
          ...temp,
          ...data.details,
        });
      } else if (data.type == "goal") {
        let temp = { ...data };
        delete temp.details;
        goals.push({
          ...temp,
          ...data.details,
        });
      }
    };
    data.suggestions.map((data) => split(data));
    const payload = { exercises, foods, goals };
    dispatch(
      userActions({
        type: "FETCH_SUGGESTION_SUCCESS",
        payload,
      })
    );
  } catch (error) {
    console.error("Error while fetching suggestions:", error);
    dispatch(userActions({ type: "FETCH_SUGGESTION_SUCCESS" }));
  }
};

export const BMI = (height, weight) => {
  return weight / (height / 100) ** 2;
};
