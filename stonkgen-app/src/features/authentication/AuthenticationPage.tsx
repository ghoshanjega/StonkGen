import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { login, signup, selectUser, selectDisplayLogin, toggleDisplayLogin, selectError } from "./AuthenticationSlice";
import { useHistory } from "react-router-dom";

export const AuthenticationPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const displayLogin = useSelector(selectDisplayLogin);
  const error = useSelector(selectError);

  const history = useHistory();

  if (user) {
    history.push("/");
  }

  const wrapInLoginToggle = (text: string, disabled: boolean = false) => {
    return (
      <button className={`btn btn-lg btn-link`} data-test={text} disabled={disabled} onClick={() => dispatch(toggleDisplayLogin())}>
        {text}
      </button>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto p-5">
          <div className="d-flex justify-content-between mb-3">
            <div>{displayLogin ? wrapInLoginToggle("Login", true) : wrapInLoginToggle("Login")}</div>
            <div>{!displayLogin ? wrapInLoginToggle("Sign Up", true) : wrapInLoginToggle("Sign Up")}</div>
          </div>
          <Formik
            initialValues={{ userName: "", password: "", fullName: "" }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              displayLogin ? dispatch(login(values)) : dispatch(signup(values));
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {!displayLogin && (
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <Field type="text" name="fullName" className="form-control" />
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="userName">User Name</label>
                  <Field type="text" name="userName" className="form-control" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <Field type="text" name="password" className="form-control" />
                </div>

                <div className="col-md-12 text-center ">
                  <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm" disabled={isSubmitting}>
                    Login
                  </button>
                </div>
                {error && <p className="text-danger my-3 text-center">{error.message}</p>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
