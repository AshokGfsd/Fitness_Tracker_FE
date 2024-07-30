import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import "./FoodCard.css";
import foodServices from "./../../services/foodServices";
import { selectUser, userActions } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import suggestionServices from "../../services/suggestionServices";
import FoodModal from "../Modal/FoodModal";
import { RxDrawingPin, RxUpdate } from "react-icons/rx";
export const FoodCard = ({
  foodName,
  calories,
  protein,
  carbohydrates,
  fat,
  _id,
  state: sugg,
}) => {
  const [currentId, setCurrentId] = useState();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const food = user.todayFoods;
  const foodLoading = user.foodLoading;
  const suggestions = user.suggestions;
  const [state, setState] = useState(false);
  const data = {
    _id,
    foodName,
    calories,
    protein,
    carbohydrates,
    fat,
  };
  const addHandler = () => {
    setState("add");
  };
  const updateHandler = () => {
    setState("Update");
    setCurrentId(_id);

  };
  const deleteFoodHandler = () => {
    toast.loading("Please Wait...");
    setCurrentId(_id);
    if (!sugg) {
      dispatch(userActions({ type: "DELETE_FOOD_LOADING" }));
      const final = food.filter((data) => data._id !== _id);
      foodServices
        .delete(_id)
        .then((response) => {
          dispatch(
            userActions({
              type: "DELETE_FOOD_SUCCESS",
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
      dispatch(userActions({ type: "DELETE_SUGGESTION_LOADING" }));
      const final = suggestions.foods.filter((data) => data._id !== _id);
      suggestionServices
        .deleteByUser(_id)
        .then((response) => {
          dispatch(
            userActions({
              type: "DELETE_SUGGESTION_SUCCESS",
              payload: { ...suggestions, foods: final },
            })
          );
          const { message } = response.data;
          toast.dismiss();
          toast.success(message);
          setCurrentId(_id);
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
      data-deleting={foodLoading.deleting && currentId === _id}
      className={`foodCard`}
    >
      <h4>{foodName}</h4>
      <p>
        Calories {calories}, Protein {protein} <br /> Carbs {carbohydrates}, Fat{" "}
        {fat}
      </p>
      <img
        draggable="false"
        src="https://images.pexels.com/photos/6428245/pexels-photo-6428245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt={foodName}
      />
      <AiOutlineDelete
        onClick={deleteFoodHandler}
        className="foodCard__delete"
      />
      <FoodModal state={state} setState={setState} data={data} />

      {sugg ? (
        <RxDrawingPin onClick={addHandler} className="add_pin" />
      ) : (
        <RxUpdate onClick={updateHandler} className="add_pin" />
      )}
    </div>
  );
};
