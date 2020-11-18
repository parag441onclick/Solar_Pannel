import React from "react";

class TextType extends React.Component {
  state = {
    emailTest: false,
    phoneNo: false,
  };

  onChange = (e, dataType) => {
    this.props.onChange({
      ["name"]: e.target.name,
      ["value"]: e.target.value,
    });

    if (dataType === "email") {
      let regexEMail = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (regexEMail.test(e.target.value)) {
        this.setState({ emailTest: true });
      }
    }
  };

  handleValidation = (dataType) => {
    console.log(dataType);
    if (dataType === "email") {
      if (this.state.emailTest === false) {
        return (
          <div class="alert alert-danger" role="alert">
            Please enter a valid email address.
          </div>
        );
      }

      return null;
    }

    if (dataType === "tel") {
      return (
        <div class="alert alert-danger" role="alert">
          Please enter a valid phone number in France and try again.
        </div>
      );
    }

    return null;
  };

  renderTextOptions = (options, type) => {
    let dataType = type;
    return options.map(({ label, type, name, defaultValue, id }) => {
      return (
        <div key={id} className="form-group">
          <label>{label}</label>
          <input
            type={type}
            className="form-control"
            id={id}
            name={name}
            defaultValue={defaultValue}
            aria-describedby="emailHelp"
            onChange={(e) => this.onChange(e, dataType)}
          />
          {this.handleValidation(dataType)}
        </div>
      );
    });
  };

  renderTextQuestion = ({ question, options, type }) => {
    return (
      <div className="container mt-sm-5 my-1">
        <div className="question ml-sm-5 pl-sm-5 pt-2">
          <div className="py-2 h5">
            <b>{`${question.charAt(0).toUpperCase() + question.slice(1)} ?`}</b>
          </div>
          <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
            {" "}
            {this.renderTextOptions(options, type)}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.renderTextQuestion(this.props.item);
  }
}

export default TextType;
