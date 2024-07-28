import { useState } from "react";
import { AiOutlineDelete, AiOutlineFire } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import "./SuggestionCard.css";
import { selectUser, userActions } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import suggestionServices from "../../services/suggestionServices";
import { exerciseCalories } from "../../Constants";
import SuggestionModel from "./../Modal/SuggestionModel";
import { RxUpdate } from "react-icons/rx";
export const SuggestionCard = ({ data }) => {
  const [currentId, setCurrentId] = useState();
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const user = useSelector(selectUser);
  const foodLoading = user.foodLoading;
  const goalLoading = user.goalLoading;
  const exerciseLoading = user.exerciseLoading;
  const suggestions = user.yourSuggestions;
  const deleteHandler = () => {
    toast.loading("Please Wait...");
    setCurrentId(data._id);
    dispatch(userActions({ type: "DELETE_YOUR_SUGGESTION_LOADING" }));
    const final = suggestions[`${data.type}s`].filter(
      (d) => d._id !== data._id
    );
    suggestionServices
      .delete(data._id)
      .then((response) => {
        const { message } = response.data;
        toast.dismiss();
        dispatch(
          userActions({
            type: "DELETE_YOUR_SUGGESTION_SUCCESS",
            payload: { ...suggestions, [`${data.type}s`]: final },
          })
        );
        toast.success(message);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toast.dismiss();
        return toast.error(message);
      });
  };
  const updateHandler = () => {
    setCurrentId(data._id);
    setState("Update");
  };
  return (
    <div>
      {data.type == "food" && (
        <div
          data-deleting={foodLoading.deleting && currentId === data._id}
          className={`foodCard`}
        >
          age : {data.age} <br />
          gender : {data.gender} <br />
          stage : {data.stage} <br />
          type : {data.type} <br />
          <h4>{data.foodName}</h4>
          <p>
            Calories {data.calories}, Protein {data.protein} <br /> Carbs{" "}
            {data.carbohydrates}, Fat {data.fat}
          </p>
          <img
            draggable="false"
            src="https://images.pexels.com/photos/6428245/pexels-photo-6428245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt={data.foodName}
          />
        </div>
      )}
      {data.type == "goal" && (
        <div
          data-deleting={goalLoading.deleting && currentId === data._id}
          className="goalCard"
        >
          age : {data.age} <br />
          gender : {data.gender} <br />
          stage : {data.stage} <br />
          type : {data.type} <br />
          <h4>{data.goalName}</h4>
          <p>{data.goalDescription}</p>
          {data.targetDate && <p>Target Date {formatDate()}</p>}
          {data.targetCaloriesValue && (
            <p>Target Calorie {data.targetCaloriesValue}</p>
          )}
          <p>{data.status}</p>
          <img
            draggable="false"
            src="https://images.pexels.com/photos/2233388/pexels-photo-2233388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt={data.goalName}
          />
        </div>
      )}
      {data.type == "exercise" && (
        <div
          data-deleting={exerciseLoading.deleting && currentId === data._id}
          className="exerciseCard"
        >
          age : {data.age} <br />
          gender : {data.gender} <br />
          stage : {data.stage} <br />
          type : {data.type} <br />
          <h4>{data.name}</h4>
          <p>{exerciseCalories[data.exerciseType]?.type}</p>
          <p>{data.duration} Min</p>
          <p>
            {data.caloriesBurnt} <AiOutlineFire />{" "}
          </p>
          <img
            src={exerciseCalories[data.exerciseType]?.imgSrc}
            alt={data.name}
          />
        </div>
      )}
      <div className="div1">
        <AiOutlineDelete
          tabIndex={"0"}
          className="suggCard__delete"
          onClick={deleteHandler}
        />
        <RxUpdate onClick={updateHandler} className="add_pin_s" />
      </div>
      <SuggestionModel state={state} setState={setState} data={data} />
    </div>
  );
};
