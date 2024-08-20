import { FC, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { IInitGame } from "../../interfaces";

import { validationSchema } from "./utils";
import { useAppDispatch } from "../../hooks";
import { initApp, setComplexity } from "../../redux";
import { routes } from "../../constants";

import { TextField, HalloModal } from "../../components";
import { Statistics } from "./parts";

import styles from "./styles.module.scss";

const initialValues: IInitGame = {
  name: "",
  complexity: "",
};

export const Welcome: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (
    values: IInitGame,
    helpers: FormikHelpers<IInitGame>
  ) => {
    const response = await dispatch(initApp(values)).then(unwrapResult);
    dispatch(setComplexity(Number(values.complexity)));
    helpers.resetForm();

    if (response.id) {
      navigate(routes.game);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const onOk = () => {
    if (Object.keys(formik.errors).length > 0) return false;

    formik.handleSubmit();
    return true;
  };

  return (
    <div className={styles.wrapper}>
      <Statistics />
      <HalloModal onOk={onOk} open={open} setOpen={setOpen}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <TextField label={"Name"} name={"name"} formik={formik} />
          <TextField label={"Complexity"} name={"complexity"} formik={formik} />
        </form>
      </HalloModal>
    </div>
  );
};
