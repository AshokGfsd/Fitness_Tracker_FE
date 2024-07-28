import { exerciseCalories } from "../../Constants";
import "./ExerciseCard.css";
import { AiOutlineDelete, AiOutlineFire } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import exerciseServices from "./../../services/exerciseServices";
import { selectUser, userActions } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import suggestionServices from "../../services/suggestionServices";
import ExerciseModal from "../Modal/ExerciseModal";
import { RxDrawingPin, RxUpdate } from "react-icons/rx";

export const ExerciseCard = ({
  name,
  _id,
  exerciseType,
  caloriesBurnt,
  duration,
  state: sugg,
}) => {
  const [currentId, setCurrentId] = useState();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const exerciseLoading = user.exerciseLoading;
  const exercises = user.exercises;
  const suggestions = user.suggestions;
  const [state, setState] = useState(false);
  const data = { _id, name, duration, exerciseType };
  const addHandler = () => {
    setState("add");
  };
  const updateHandler = () => {
    setCurrentId(_id);
    setState("Update");
  };
  const deleteExerciseHandler = () => {
    toast.loading("Please Wait...");
    setCurrentId(_id);
    if (!sugg) {
      dispatch(userActions({ type: "DELETE_EXERCISE_LOADING" }));
      const final = exercises.filter((data) => data._id !== _id);
      exerciseServices
        .delete(_id)
        .then((response) => {
          dispatch(
            userActions({
              type: "DELETE_EXERCISE_SUCCESS",
              payload: [...final],
            })
          );
          const { message } = response.data;
          toast.dismiss();
          toast.success(message);
        })
        .catch((e) => {
          console.log(e);
          const message = e.response.data.message;
          toast.dismiss();
          return toast.error(message);
        });
    } else {
      suggestionServices
        .deleteByUser(_id)
        .then((response) => {
          dispatch(userActions({ type: "DELETE_SUGGESTION_LOADING" }));
          const final = suggestions.exercises.filter(
            (data) => data._id !== _id
          );
          dispatch(
            userActions({
              type: "DELETE_SUGGESTION_SUCCESS",
              payload: { ...suggestions, exercises: final },
            })
          );
          const { message } = response.data;
          toast.dismiss();
          toast.success(message);
        })
        .catch((e) => {
          const message = e.response.data.message;
          toast.dismiss();
          return toast.error(message);
        });
    }
  };
  return (
    <div
      data-deleting={exerciseLoading.deleting && currentId === _id}
      className="exerciseCard"
    >
      <h4>{name}</h4>
      <p>{exerciseCalories[exerciseType]?.type}</p>
      <p>{duration} Min</p>
      <p>
        {caloriesBurnt} <AiOutlineFire />{" "}
      </p>
      <img src={exerciseCalories[exerciseType]?.imgSrc} alt={name} />
      <AiOutlineDelete
        tabIndex={"0"}
        className="exerciseCard__delete"
        onClick={deleteExerciseHandler}
      />
      <ExerciseModal state={state} setState={setState} data={data} />

      {sugg ? (
        <RxDrawingPin onClick={addHandler} className="add_pin" />
      ) : (
        <RxUpdate onClick={updateHandler} className="add_pin" />
      )}
    </div>
  );
};
