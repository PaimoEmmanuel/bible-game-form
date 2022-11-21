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
    setSubmitState({ success: false, error: false, loading: true });
    submitEntry(data)
      .then((res) => {
        setSubmitState({ success: true, error: false, loading: false });
      })
      .catch((err) => {
        setSubmitState({ success: false, loading: false, error: true });
      });
  };

  return [handleFormSubmit, submitState];
};

export default useFormSubmit;
