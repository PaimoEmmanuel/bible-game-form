import { useState } from "react";
import { submitEntry, getBibleText } from "../services/services";

const useFormSubmit = (data) => {
  const [submitState, setSubmitState] = useState({
    success: false,
    error: false,
    loading: false,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitState({ success: false, error: false, loading: true });
    getBibleText(data.book_id, data.chapter, data.verses)
      .then((res) => {
        let text = "";
        res.data.content.forEach(({ t }) => {
          text += " " + t;
        });
        console.log(text);
        submitEntry({ ...data, text })
          .then((res) => {
            setSubmitState({ success: true, error: false, loading: false });
          })
          .catch((err) => {
            setSubmitState({ success: false, loading: false, error: true });
          });
      })
      .catch((err) => {
        console.log(err);
        setSubmitState({ success: false, loading: false, error: true });
      });
  };

  return [handleFormSubmit, submitState];
};

export default useFormSubmit;
