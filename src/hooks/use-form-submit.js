import { useState } from "react";
import { submitEntry } from "../services/services";

const useFormSubmit = (data) => {
  const [submitState, setSubmitState] = useState({
    success: false,
    error: false,
    loading: false,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    setSubmitState({ success: false, error: false, loading: true });
    submitEntry(data)
      .then((res) => {
        console.log(res);
        setSubmitState({ success: true, error: false, loading: false });
      })
      .catch((err) => {
        console.log(err);
        setSubmitState({ success: false, loading: false, error: true });
      });
  };

  return [handleFormSubmit, submitState];
};

export default useFormSubmit;
