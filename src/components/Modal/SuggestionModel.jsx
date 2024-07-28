import "./Modal.css";
import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { userActions } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { exerciseCalories } from "../../Constants";
import suggestionServices from "../../services/suggestionServices";
import { fetchYourSuggestion } from "../../services/loader";

const types = (type) => {
  switch (type) {
    case "goal":
      return {
        age: "0-18",
        stage: "Under weight",
        gender: "male",
        goalName: "",
        goalDescription: "",
        targetCaloriesValue: null,
      };
    case "exercise":
      return {
        age: "0-18",
        stage: "Under weight",
        gender: "male",
        name: "",
        duration: 15,
        exerciseType: "yoga",
      };
    case "food":
      return {
        age: "0-18",
        stage: "Under weight",
        gender: "male",
        foodName: "",
        calories: "",
        protein: "",
        carbohydrates: "",
        fat: "",
      };
    default: {
    }
  }
};

const validate = (values) => {
  let error = {
    state: false,
  };
  const age = values.age.split("-").map(Number);
  if (!values.gender) {
    error.message = "Gender is required";
    error.state = true;
  }
  if (error.state) {
    return error;
  }
  switch (values.type) {
    case "goal":
      if (!values.goalName) {
        error.message = "goalName is required";
        error.state = true;
      } else if (!values.goalDescription) {
        error.state = true;
        error.message = "goalDescription is required";
      } else if (!values.targetCaloriesValue) {
        error.message = "targetCaloriesValue is required";
        error.state = true;
      }
      return error;
    case "exercise":
      if (!values.name) {
        error.message = "exercise name is required";
        error.state = true;
      } else if (!values.duration) {
        error.message = "duration is required";
        error.state = true;
      } else if (!values.exerciseType) {
        error.message = "exerciseType is required";
        error.state = true;
      }
      return error;
    case "food":
      if (!values.foodName) {
        error.message = "foodName is required";
        error.state = true;
      } else if (!values.calories) {
        error.message = "calories is required";
        error.state = true;
      } else if (!values.protein) {
        error.message = "protein is required";
        error.state = true;
      } else if (!values.carbohydrates) {
        error.message = "carbohydrates is required";
        error.state = true;
      } else if (!values.fat) {
        error.message = "fat is required";
        error.state = true;
      }
      return error;
  }
  return error;
};

const SuggestionModel = ({ state, setState, data }) => {
  const [formData, setFormData] = useState({
    type: "exercise",
    age: "0-18",
    stage: "Under weight",
    gender: "male",
    name: "",
    duration: 15,
    exerciseType: "yoga",
  });
  const dispatch = useDispatch();
  const formDataHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);
  useEffect(() => {
    if (!data) {
      const type = types(formData.type);
      setFormData({ type: formData.type, ...type });
    }
  }, [formData.type]);

  const submitHandler = () => {
    toast.loading("Please Wait...");
    let error = validate(formData);
    if (error.state) {
      toast.dismiss();
      return toast.info(error.message);
    }
    dispatch(userActions({ type: "ADD_YOUR_SUGGESTION_LOADING" }));
    let data = { ...formData };
    if (formData.type == "exercise") {
      const caloriesBurnt =
        formData.duration *
        exerciseCalories[formData.exerciseType].caloriePerUnit;
      data = {
        ...formData,
        caloriesBurnt,
      };
    }
    if (state == "Update") {
      suggestionServices
        .update(data)
        .then((response) => {
          fetchYourSuggestion(dispatch, userActions);
          const { message } = response.data;
          toast.dismiss();
          toast.success(message);
          setFormData({
            type: "exercise",
            age: "0-18",
            stage: "Under weight",
            gender: "male",
            name: "",
            duration: 15,
            exerciseType: "yoga",
          });
          setState(false);
        })
        .catch((e) => {
          console.log(e);
          const message = e.response.data.message;
          toast.dismiss();
          return toast.error(message);
        });
    } else {
      suggestionServices
        .post(data)
        .then((response) => {
          setState(false);
          fetchYourSuggestion(dispatch, userActions);
          const { message } = response.data;
          toast.dismiss();
          toast.success(message);
          if (data) {
            return;
          }
          setFormData({
            type: "exercise",
            age: "0-18",
            stage: "Under weight",
            gender: "male",
            name: "",
            duration: 15,
            exerciseType: "yoga",
          });
        })
        .catch((e) => {
          console.log(e);
          const message = e.response.data.message;
          toast.dismiss();
          return toast.error(message);
        });
    }
  };

  return (
    <Dialog.Root open={state} onOpenChange={setState}>
      <Dialog.Trigger>open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add Suggestion</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Add Suggestion here. Click save when you're done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="type">
              Type
            </label>
            <select
              className="Input"
              name="type"
              style={{ backgroundColor: "rgb(31,33,37)" }}
              value={formData.type}
              onChange={(e) => formDataHandler(e)}
            >
              <option value="exercise">Exercise</option>
              <option value="goal">Goal</option>
              <option value="food">Food</option>
            </select>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="age">
              Age Limit
            </label>
            <select
              className="Input"
              style={{ backgroundColor: "rgb(31,33,37)" }}
              name="age"
              value={formData.age}
              onChange={(e) => formDataHandler(e)}
            >
              <option value="0-18">Under 18</option>
              <option value="18-30">18-30</option>
              <option value="31-50">31-50</option>
              <option value="50-100">51+</option>
            </select>
          </fieldset>{" "}
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="stage">
              Stage
            </label>
            <select
              className="Input"
              name="stage"
              style={{ backgroundColor: "rgb(31,33,37)" }}
              value={formData.stage}
              onChange={(e) => formDataHandler(e)}
            >
              <option value="Under weight">Under weight</option>
              <option value="Normal weight">Normal weight</option>
              <option value="Over weight">Over weight</option>
              <option value="Obese">Obese</option>
            </select>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="gender">
              Gender
            </label>
            <select
              className="Input"
              name="gender"
              value={formData.gender}
              onChange={(e) => formDataHandler(e)}
              style={{ backgroundColor: "rgb(31,33,37)" }}
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </fieldset>
          {formData.type == "exercise" && (
            <>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="name">
                  Exercise Name
                </label>
                <input
                  className="Input"
                  name="name"
                  value={formData.name}
                  onChange={(e) => formDataHandler(e)}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="duration">
                  {"Duration (in minutes)"}
                </label>
                <input
                  className="Input"
                  name="duration"
                  type="number"
                  min="0"
                  value={formData.duration}
                  onChange={(e) => formDataHandler(e)}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="exerciseType">
                  Exercise Type
                </label>
                <select
                  className="Input"
                  name="exerciseType"
                  value={formData.exerciseType}
                  onChange={(e) => formDataHandler(e)}
                  style={{ backgroundColor: "rgb(31,33,37)" }}
                >
                  <option value="yoga">Yoga</option>
                  <option value="aerobic">Aerobic</option>
                  <option value="strengthTraining">Strength Training</option>
                  <option value="walking">walking</option>
                  <option value="running">Running</option>
                  <option value="cycling">Cycling</option>
                </select>
              </fieldset>
            </>
          )}
          {formData.type == "food" && (
            <>
              {" "}
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="foodName">
                  Food Name
                </label>
                <input
                  className="Input"
                  name="foodName"
                  value={formData.foodName}
                  onChange={(e) => formDataHandler(e)}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="calories">
                  {"Calories"}
                </label>
                <input
                  className="Input"
                  name="calories"
                  type="number"
                  min="0"
                  value={formData.calories}
                  onChange={(e) => formDataHandler(e)}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="protein">
                  {"Protein (in Grams)"}
                </label>
                <input
                  className="Input"
                  name="protein"
                  type="number"
                  min="0"
                  value={formData.protein}
                  onChange={(e) => formDataHandler(e)}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="carbohydrates">
                  {"Carbs (in Grams)"}
                </label>
                <input
                  className="Input"
                  name="carbohydrates"
                  type="number"
                  min="0"
                  value={formData.carbohydrates}
                  onChange={(e) => formDataHandler(e)}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="fat">
                  {"Fat (in Grams)"}
                </label>
                <input
                  className="Input"
                  name="fat"
                  type="number"
                  min="0"
                  value={formData.fat}
                  onChange={(e) => formDataHandler(e)}
                />
              </fieldset>
            </>
          )}
          {formData.type == "goal" && (
            <>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="goalName">
                  Goal Name
                </label>
                <input
                  className="Input"
                  name="goalName"
                  value={formData.goalName}
                  onChange={(e) => formDataHandler(e)}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="goalDescription">
                  {"Goal Description"}
                </label>
                <input
                  className="Input"
                  name="goalDescription"
                  value={formData.goalDescription}
                  onChange={(e) => formDataHandler(e)}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="targetCaloriesValue">
                  {"Target calories"}
                </label>
                <input
                  className="Input"
                  name="targetCaloriesValue"
                  type="number"
                  min="0"
                  value={formData.targetCaloriesValue}
                  onChange={(e) => formDataHandler(e)}
                />
              </fieldset>
            </>
          )}
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <button className="Button green" onClick={submitHandler}>
              Save Suggestion
            </button>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <RxCross2 />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SuggestionModel;
