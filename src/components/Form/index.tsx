import Button from "../Button";
import "./form.css";

interface FormProps {
  buttonText: string;
  title: string;
  body: string;
  handleSubmit?: (arg: any) => void;
  handleChange?: (arg: any) => void;
}

const Form = (props: FormProps) => {
  const { buttonText, title, body, handleSubmit, handleChange } = props;

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <label className="formLabel">Title</label>
        <input
          type="text"
          className="formInput"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Title"
          title="Title"
        />
        <label className="formLabel">Body</label>
        <textarea
          className="formInput formTextArea"
          name="body"
          value={body}
          onChange={handleChange}
          placeholder="Your content goes here..."
          title="Body"
        />

        <Button
          className="submitButton"
          disabled={!title || !body}
          value={buttonText}
        />
      </form>
    </div>
  );
};

export default Form;
