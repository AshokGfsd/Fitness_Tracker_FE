import "./Modal.css";

import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import foodServices from "./../../services/foodServices";
import { selectUser, userActions } from "../../features/user/userSlice";
import { toast } from "react-toastify";

const FoodModal = ({ state, setState, data }) => {
  const [formData, setFormData] = useState({
    foodName: "New food",
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
  });
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { todayFoods:foods } = user;

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, []);
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
      dispatch(userActions({ type: "UPDATE_FOOD_LOADING" }));

      foodServices
        .update(formData)
        .then((response) => {
          const final = foods.map((d) =>
            data._id !== d._id ? d : response.data.updatefood
          );
          dispatch(
            userActions({
              type: "UPDATE_FOOD_SUCCESS",
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
      dispatch(userActions({ type: "ADD_FOOD_LOADING" }));
      foodServices
        .post(formData)
        .then((response) => {
          if (data) {
            dispatch(userActions({ type: "DELETE_SUGGESTION_LOADING" }));
            const suggestions = user.suggestions;
            const final = suggestions.foods.filter(
              (data) => data._id !== formData._id
            );
            dispatch(
              userActions({
                type: "DELETE_SUGGESTION_SUCCESS",
                payload: { ...suggestions, foods: final },
              })
            );
          }
          dispatch(
            userActions({
              type: "ADD_FOOD_SUCCESS",
              payload: {
                ...response.data.savedFood,
              },
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
      setFormData(() => ({
        foodName: "New food",
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
      }));
    }
  };

  return (
    <Dialog.Root open={state} onOpenChange={setState}>
      <Dialog.Trigger>open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add Food</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Add Food here. Click save when you're done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="foodName">
              Name
            </label>
            <input
              className="Input"
              name="foodName"
              defaultValue={formData.foodName}
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
              defaultValue={formData.calories}
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
              defaultValue={formData.protein}
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
              defaultValue={formData.carbohydrates}
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
              defaultValue={formData.fat}
              onChange={(e) => formDataHandler(e)}
            />
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
                {state} Food
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

export default FoodModal;
