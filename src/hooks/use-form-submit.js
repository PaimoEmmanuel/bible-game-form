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
        if (res.data.content.length < 1) {
          setSubmitState({
            success: false,
            loading: false,
            error: "Bible verse not found",
          });
          return;
        }
        let text = "";
        res.data.content.forEach(({ t }) => {
          text += " " + t;
        });
        submitEntry({ ...data, text })
          .then((res) => {
            setSubmitState({ success: true, error: false, loading: false });
          })
          .catch((err) => {
            console.log(err.response.data.message);
            setSubmitState({
              success: false,
              loading: false,
              error:
                err.response?.data?.message ||
                "An error occured, please try again.",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        setSubmitState({
          success: false,
          loading: false,
          error:
            err.response?.data?.message ||
            "An error occured, please try again.",
        });
      });
  };

  return [handleFormSubmit, submitState];
};

export default useFormSubmit;
