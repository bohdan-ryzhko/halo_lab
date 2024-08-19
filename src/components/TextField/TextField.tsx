import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { Input } from "antd";
import { FormikValues } from "formik";
import styles from "./styles.module.scss";

interface props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name: string;
  formik: FormikValues;
}

export const TextField: FC<props> = ({ label, name, formik }) => {
  const errorText = formik.errors[name];

  const isError = errorText && formik.touched[name];

  return (
    <div className={styles.wrapper}>
      <p>{label}</p>
      <Input
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        status={isError ? "error" : ""}
      />
      {isError && <p className={styles.errorText}>{errorText}</p>}
    </div>
  );
};
