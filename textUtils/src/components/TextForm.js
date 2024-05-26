import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Upper-Case", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lower-Case", "success");
  };

  const handleToggleClick = () => {
    let newText = text
      .split("")
      .map((char) => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase();
        } else {
          return char.toUpperCase();
        }
      })
      .join("");
    setText(newText);
    props.showAlert("Case is toggelled", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed!", "success");
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    const toogle = document.getElementById("toggle");
    if (toogle.textContent === "Speak") {
      toogle.innerHTML = "Stop";
    } else {
      toogle.innerHTML = "Speak";
      if ((toogle.innerHTML = "Speak")) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to clipboard", "success");
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const [text, setText] = useState("");
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2 className="mb-4">{props.heading}</h2>
        <div className="mb-3">
          <textarea
            className="form-control my-3"
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>

          <button
            className="btn btn-primary mx-2 my-2"
            onClick={handleUpClick}
            disabled={text.length === 0}
          >
            Uppercase
          </button>

          <button
            className="btn btn-primary mx-2 my-2"
            onClick={handleLoClick}
            disabled={text.length === 0}
          >
            Lowercase
          </button>

          <button
            className="btn btn-primary mx-2 my-2"
            onClick={handleToggleClick}
            disabled={text.length === 0}
          >
            Toggel
          </button>

          <button
            className="btn btn-primary mx-2 my-2"
            onClick={handleExtraSpaces}
            disabled={text.length === 0}
          >
            Remove Extra Spaces
          </button>

          <button
            className="btn btn-warning mx-2 my-2"
            onClick={speak}
            id="toggle"
            type="submit"
            disabled={text.length === 0}
          >
            Speak
          </button>

          <button
            className="btn btn-primary mx-2 my-2"
            onClick={handleCopy}
            disabled={text.length === 0}
          >
            Copy
          </button>

          <button
            className="btn btn-primary mx-2 my-2"
            onClick={handleClearClick}
            disabled={text.length === 0}
          >
            Clear
          </button>
        </div>
      </div>
      <div
        className="container my-2"
        style={{
          backgroundColor: props.mode === "dark" ? "#042743" : "white",
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <h2>Your text summary</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words & {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes read
        </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  );
}
