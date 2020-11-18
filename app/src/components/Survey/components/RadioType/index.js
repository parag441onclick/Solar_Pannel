import React from "react";

class RadioType extends React.Component {
  state = {
    formData: {},
  };

  componentDidUpdate() {
    console.log("props.field", this.props.field);
  }

  onChange = (e) => {
    this.props.onChange({
      ["name"]: e.target.name,
      ["value"]: e.target.value,
    });
  };

  renderRadioOptions = (options) => {
    let fieldLength = Object.values(this.props.field).length;

    return options.map(({ label, type, name, value, defaultChecked, id }) => {
      return (
        <div id="ques" key={id}>
          <label
            className={
              fieldLength === 0 && this.props.submitted === true
                ? "options error-radio"
                : "options"
            }
          >
            {`${label}`}{" "}
            <input
              type={type}
              name={name}
              value={value}
              defaultChecked={false}
              onChange={this.onChange}
            />{" "}
            <span className="checkmark"></span>{" "}
          </label>{" "}
        </div>
      );
    });
  };

  renderRadioQuestion = ({ question, options }) => {
    let fieldLength = Object.values(this.props.field).length;
    console.log("FL", fieldLength, this.props.submitted);
    return (
      <div className="container mt-sm-5 my-1">
        <div className="question ml-sm-5 pl-sm-5 pt-2">
          <div className="py-2 h5">
            <b>{`${question.charAt(0).toUpperCase() + question.slice(1)} ?`}</b>
          </div>
          <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
            {" "}
            {this.renderRadioOptions(options)}
            <span
              className={
                fieldLength === 0 && this.props.submitted === true
                  ? "error-message"
                  : ""
              }
            >
              {fieldLength === 0 && this.props.submitted === true
                ? "This field is required"
                : ""}
            </span>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.renderRadioQuestion(this.props.item);
  }
}

export default RadioType;
