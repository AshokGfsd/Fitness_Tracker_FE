import "./Modal.css";

import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { exerciseCalories } from "../../Constants";
import { useDispatch, useSelector } from "react-redux";
import exerciseServices from "./../../services/exerciseServices";
import { selectUser, userActions } from "../../features/user/userSlice";
import { toast } from "react-toastify";

const ExerciseModal = ({ state, setState, data }) => {
  const [formData, setFormData] = useState({
    name: "New Exercise",
    duration: 15,
    exerciseType: "yoga",
  });
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { todayExercises: exercises } = user;

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);
  const formDataHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = () => {
    toast.loading("Please Wait...");
    if (state == "Update") {
      dispatch(userActions({ type: "UPDATE_EXERCISE_LOADING" }));
      const caloriesBurnt =
        formData.duration *
        exerciseCalories[formData.exerciseType].caloriePerUnit;
      exerciseServices
        .update({
          ...formData,
          caloriesBurnt,
        })
        .then((response) => {
          const final = exercises.map((d) =>
            data._id !== d._id ? d : response.data.updateExercise
          );
          const { message } = response.data;
          toast.dismiss();
          toast.success(message);
          dispatch(
            userActions({
              type: "UPDATE_EXERCISE_SUCCESS",
              payload: [...final],
            })
          );
          setFormData(() => ({
            name: "New Exercise",
            duration: 15,
            exerciseType: "yoga",
          }));
        })
        .catch((e) => {
          const message = e.response.data.message;
          toast.dismiss();
          return toast.error(message);
        });
    } else {
      dispatch(userActions({ type: "ADD_EXERCISE_LOADING" }));
      const caloriesBurnt =
        formData.duration *
        exerciseCalories[formData.exerciseType].caloriePerUnit;
      exerciseServices
        .post({
          ...formData,
          caloriesBurnt,
        })
        .then((response) => {
          if (data) {
            dispatch(userActions({ type: "DELETE_SUGGESTION_LOADING" }));
            const suggestions = user.suggestions;
            dispatch(userActions({ type: "DELETE_SUGGESTION_LOADING" }));
            const final = suggestions.exercises.filter(
              (data) => data._id !== formData._id
            );
            dispatch(
              userActions({
                type: "DELETE_SUGGESTION_SUCCESS",
                payload: { ...suggestions, exercises: final },
              })
            );
          }
          const { message } = response.data;
          toast.dismiss();
          toast.success(message);
          dispatch(
            userActions({
              type: "ADD_EXERCISE_SUCCESS",
              payload: {
                ...response.data.savedExercise,
              },
            })
          );
          setFormData(() => ({
            name: "New Exercise",
            duration: 15,
            exerciseType: "yoga",
          }));
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
          <Dialog.Title className="DialogTitle">Add Exercise</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Add Exercise here. Click save when you're done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input
              className="Input"
              name="name"
              defaultValue={formData.name}
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
              defaultValue={formData.duration}
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
              defaultValue={formData.exerciseType}
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
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={submitHandler}>
                {state} Exercise
              </button>
            </Dialog.Close>
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

export default ExerciseModal;
