import { useState } from "react";

import Input from "../components/forms/Input";

import Button from "../components/forms/Button";

import toast from "react-hot-toast";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

export default function ForgotPasswowrd() {
  //context

  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        `/forgot-password`,
        { email }
      );

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(
          "Enter the code to reset your password from your email address."
        );
        setVisible(true)
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if(password !== confirm){
        toast.error("Passwords do not match")
        setLoading(false)
        return
      }

      const { data } = await axios.post(
        `/reset-password`,
        { email, password, resetCode }
      );

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(
          "Password successfully reset. Now you can log in again.",
        );
        navigate('/login')
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-100px" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 authbox">
            <h1 className="fw-bold mb-3">Forgot password</h1>
            <form>
              <Input
                value={email}
                setValue={setEmail}
                label="Email"
                type="email"
              />
              {visible && (
                <>
                  <Input
                    value={resetCode}
                    setValue={setResetCode}
                    label="Reset code"
                    type="text"
                  />
                  <Input
                    value={password}
                    setValue={setPassword}
                    label="New Password"
                    type="password"
                  />
                  <Input
                    value={confirm}
                    setValue={setConfirm}
                    label="Confirm"
                    type="password"
                  />
                </>
              )}
              <Button handleSubmit={visible ? handleReset : handleSubmit} loading={loading} />
            </form>
            <p className="mt-3">
              <Link to="/login">Back to Login</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
