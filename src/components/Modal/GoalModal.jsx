import "./Modal.css";
import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import goalServices from "./../../services/goalServices";
import { selectUser, userActions } from "../../features/user/userSlice";
import { toast } from "react-toastify";

const GoalModal = ({ state, setState, data }) => {
  const today = new Date();
  let mm = today.getMonth() + 1;
  let dd = today.getDate() ;
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const year = today.getFullYear();
  const [formData, setFormData] = useState({
    goalName: "New Goal",
    goalDescription: "New Goal",
    targetDate: `${year}-${mm}-${dd}`,
    targetCaloriesValue: "",
    status: "In Progress",
  });
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const goals = user.todayGoals;

  useEffect(() => {
    if (data) {
      const { _id, goalDescription, goalName, status, targetCaloriesValue } =
        data;

      setFormData({
        ...formData,
        _id,
        goalDescription,
        goalName,
        targetCaloriesValue,
      });
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
      goalServices
        .update(formData)
        .then((response) => {
          const final = goals.map((d) =>
            data._id !== d._id ? d : response.data.updateGoal
          );
          dispatch(
            userActions({
              type: "UPDATE_GOAL_SUCCESS",
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
      dispatch(userActions({ type: "ADD_GOAL_LOADING" }));
      goalServices
        .post(formData)
        .then((response) => {
          if (data) {
            dispatch(userActions({ type: "ADD_GOAL_LOADING" }));
            const suggestions = user.suggestions;
            const final = suggestions.goals.filter(
              (data) => data._id !== formData._id
            );
            dispatch(
              userActions({
                type: "ADD_GOAL_SUCCESS",
                payload: { ...suggestions, goals: final },
              })
            );
          }
          dispatch(
            userActions({
              type: "ADD_GOAL_SUCCESS",
              payload: {
                ...response.data.savedGoal,
              },
            })
          );
          const { message } = response.data;
          toast.dismiss();
          toast.success(message);
          if (data) {
            return;
          }
          setFormData(() => ({
            goalName: "New Goal",
            goalDescription: "New Goal",
            targetDate: new Date(),
            targetCaloriesValue: "",
            status: "In Progress",
          }));
        })
        .catch((e) => {
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
          <Dialog.Title className="DialogTitle">Add Goal</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Add Goal here. Click save when you're done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="goalName">
              Name
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
            <label className="Label" htmlFor="targetDate">
              {"Target Date"}
            </label>
            <input
              className="Input"
              type="date"
              name="targetDate"
              value={formData.targetDate}
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
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="status">
              Status
            </label>
            <select
              className="Input"
              name="status"
              style={{ backgroundColor: "rgb(31,33,37)" }}
              value={formData.status}
              onChange={(e) => formDataHandler(e)}
            >
              <option value="Achieved">Achieved</option>
              <option value="Abandoned">Abandoned</option>
              <option value="In Progress">In Progress</option>
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
                {state} Goal
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

export default GoalModal;
