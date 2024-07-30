import { useState } from "react";
import { AiFillFire, AiOutlineDelete } from "react-icons/ai";
import { RxDrawingPin, RxTarget, RxUpdate } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import "./GoalCard.css";
import goalServices from "../../services/goalServices";
import { selectUser, userActions } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import suggestionServices from "../../services/suggestionServices";
import GoalModal from "../Modal/GoalModal";

export const GoalCard = ({ goal, state: sugg }) => {
  const [currentId, setCurrentId] = useState();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [state, setState] = useState(false);
  const goalLoading = user.goalLoading;
  const suggestions = user.suggestions;
  const goals = user.todayGoals;
  const data = {
    ...goal,
  };
  const formatDate = () => {
    const date = new Date(goal.targetDate);
    return new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };
  const addHandler = () => {
    setState("add");
  };
  const updateHandler = () => {
    setState("Update");
    setCurrentId(goal._id);
  };
  const deleteFoodHandler = () => {
    toast.loading("Please Wait...");
    setCurrentId(goal._id);
    if (!sugg) {
      dispatch(userActions({ type: "DELETE_GOAL_LOADING" }));
      const final = goals.filter((data) => data._id !== goal._id);
      goalServices
        .delete(goal._id)
        .then((response) => {
          dispatch(
            userActions({
              type: "DELETE_GOAL_SUCCESS",
              payload: [...final],
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
    } else {
      setCurrentId(goal._id);
      dispatch(userActions({ type: "DELETE_GOAL_LOADING" }));
      const final = suggestions.goals.filter((data) => data._id !== goal._id);
      suggestionServices
        .deleteByUser(goal._id)
        .then((response) => {
          dispatch(
            userActions({
              type: "DELETE_GOAL_SUCCESS",
              payload: { ...suggestions, goals: final },
            })
          );
          const { message } = response.data;
          toast.dismiss();
          toast.success(message);
          setCurrentId(goal._id);
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
      data-deleting={goalLoading.deleting && currentId === goal._id}
      className="goalCard"
    >
      <h4>{goal.goalName}</h4>
      <p>{goal.goalDescription}</p>
      {goal.targetDate && <p>Target Date {formatDate()}</p>}
      {goal.targetCaloriesValue && (
        <p>Target Calorie {goal.targetCaloriesValue}</p>
      )}
      <p>{goal.status}</p>
      <img
        draggable="false"
        src="https://images.pexels.com/photos/2233388/pexels-photo-2233388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt={goal.goalName}
      />
      <AiOutlineDelete
        onClick={deleteFoodHandler}
        className="goalCard__delete"
      />
      <GoalModal state={state} setState={setState} data={data} />
      {sugg ? (
        <RxDrawingPin onClick={addHandler} className="add_pin" />
      ) : (
        <RxUpdate onClick={updateHandler} className="add_pin" />
      )}
    </div>
  );
};
