import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import useFormPopulate from "../hooks/use-form-populate";
import useFormSubmit from "../hooks/use-form-submit";
import { bibleBooks } from "../utils/bible-books";

const Form = () => {
  const { loading, tags, categories, error } = useFormPopulate();
  const [formData, setFormData] = useState({
    chapter: "",
    verses: [],
    book_id: "",
    difficulty: "",
    tags: [],
  });
  const [handleSubmit, submitState] = useFormSubmit(formData);
  return loading ? (
    <p className="form">Loading...</p>
  ) : !submitState.success ? (
    !!error ? (
      <p className="error-msg">{error}</p>
    ) : (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label for="book">Book</label>
          <select
            name="book"
            id="book"
            required
            onChange={(e) => {
              setFormData({ ...formData, book_id: e.target.value });
            }}
          >
            <option disabled selected value="">
              Choose
            </option>
            {bibleBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
          <p className="error-text">This is a required question</p>
        </div>
        <div className="form-field">
          <label for="chapter">Chapter</label>
          <span>The text chapter in number</span>
          <input
            id="chapter"
            type="number"
            required
            onChange={(e) => {
              setFormData({ ...formData, chapter: e.target.value });
            }}
          />
          <p className="error-text">This is a required question</p>
        </div>
        <div className="form-field">
          <label for="verses">Verses </label>
          <span>
            Verse or verses (if more than one). separate verses with a comma e.g
            23,24
          </span>
          <input
            id="verses"
            type="text"
            required
            onChange={(e) => {
              setFormData({ ...formData, verses: e.target.value.split(",") });
            }}
          />
          <p className="error-text">This is a required question</p>
        </div>
        <div className="form-field">
          <label for="tag">Tag (most appropriate)</label>
          <span>
            Please select the most appropriate scriptural theme this verse
            aligns with (based on your opinion)
          </span>
          <CreatableSelect
            isMulti
            options={tags}
            onChange={(e) => {
              setFormData({ ...formData, tags: e.map((i) => i.label) });
            }}
          />
          <p className="error-text">This is a required question</p>
        </div>
        <div className="form-field">
          <label for="category">Category</label>
          <span>
            I feel this portion of scripture fits more to this emphasis...
          </span>
          <select
            name="category"
            id="category"
            required
            onChange={(e) => {
              setFormData({ ...formData, difficulty: e.target.value });
            }}
          >
            <option disabled selected value="">
              Choose
            </option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <p className="error-text">This is a required question</p>
        </div>
        {!!submitState.error ? (
          <p className="error-msg">{submitState.error}</p>
        ) : (
          ""
        )}
        <button className="submit" type="submit">
          {submitState.loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    )
  ) : (
    <div className="success">
      <p className="success-text">Entry successfully saved!</p>
      <a className="success-link" href="/">
        Continue
      </a>
    </div>
  );
};

export default Form;
