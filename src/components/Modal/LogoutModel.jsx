import "./Modal.css";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { userActions } from "../../features/user/userSlice";
import userServices from "./../../services/userServices";

const LogoutModal = ({ state, setState }) => {
  const dispatch = useDispatch();

  const submitHandler = () => {
    userServices.logout().then((response) => {
      dispatch(
        userActions({
          type: "LOGOUT_SUCCESS",
        })
      );
    });
  };

  return (
    <Dialog.Root open={state} onOpenChange={setState}>
      <Dialog.Trigger className="Button green">Log out</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <center>
            <Dialog.Title className="DialogTitle">Log out</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Are your continue to log out
            </Dialog.Description>
          </center>

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "space-around",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={submitHandler}>
                YES
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="Button green">CANCEL</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LogoutModal;
