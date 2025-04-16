import { Field, Form, Formik } from "formik";
import React from "react";
import { BsSearchHeart } from "react-icons/bs";

import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const initialValues = {
    query: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      <Form className={s.formWrapper}>
        <Field className={s.formInput} type="text" name="query" />
        <button className={s.button} type="submit">
          <BsSearchHeart />
        </button>
      </Form>
    </Formik>
  );
};

export default SearchBar;
