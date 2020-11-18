import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import RadioType from "./components/RadioType";
import SelectType from "./components/SelectType";
import TextType from "./components/TextType";

import questions from "../../api/questions";
import { pageNumberCheck } from "../../actions/SurveyActions";
import history from "../../history";

class Survey extends React.Component {
  state = {
    page: 1,
    questions: null,
    formData: {
      fields: {},
    },
    field: {},
    submitted: false,
  };

  componentDidMount() {
    this.confirmNavigation();
    this.setQuestions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.confirmNavigation();
    }
  }

  setQuestions = () => {
    questions.get("/data").then((resp) => {
      this.setState({ questions: resp.data });
    });
  };

  onChange = ({ name, value }) => {
    this.setState({
      formData: {
        ...this.state.formData,
        fields: {
          ...this.state.formData.fields,
          [this.state.page]: {
            ...this.state.formData.fields[this.state.page],
            [name]: value,
          },
        },
      },

      field: { ...this.state.field, [name]: value },
    });
  };

  // confirmNavigation = () => {
  //   let checkedPageNo = Number(localStorage.getItem("checkedPageNo"));
  //   let parmasId = Number(this.props.match.params.id);
  //   console.log(checkedPageNo + 1 !== parmasId);
  //   if (checkedPageNo) {
  //     if (parmasId !== checkedPageNo + 1) {
  //       console.log("hello");
  //       if (parmasId >= 1 && parmasId < 10) {
  //         this.setState({ page: checkedPageNo + 1 });
  //         history.push(`/survey/question/${checkedPageNo + 1}`);
  //       } else if (parmasId < 1) {
  //         this.setState({ page: checkedPageNo + 1 });
  //         history.push(`/survey/question/${checkedPageNo + 1}`);
  //       } else if (parmasId >= 10) {
  //         this.setState({ page: checkedPageNo + 1 });
  //         history.push(`/survey/question/${checkedPageNo + 1}`);
  //       }
  //     } else {
  //       console.log("lello");
  //       if (parmasId > 10) {
  //         this.setState({ page: checkedPageNo + 1 });
  //         localStorage.setItem("checkedPageNo", 10);
  //         history.push("/result");
  //       }
  //     }
  //   } else {
  //     localStorage.setItem("checkedPageNo", 0);
  //     this.setState({ page: 1 });
  //     history.push(`/survey/question/${1}`);
  //   }
  // };

  confirmNavigation = () => {
    let checkedPageNo = Number(localStorage.getItem("checkedPageNo"));
    let parmasId = Number(this.props.match.params.id);
    if (checkedPageNo) {
      if (parmasId >= checkedPageNo) {
        this.setState({ page: checkedPageNo + 1 });
        history.push(`/survey/question/${checkedPageNo + 1}`);
      }

      if (parmasId <= checkedPageNo && parmasId >= 1) {
        history.push(`/survey/question/${parmasId}`);
      } else {
        history.push(`/survey/question/${checkedPageNo + 1}`);
      }
    } else {
      localStorage.setItem("checkedPageNo", 0);
      this.setState({ page: 1 });
      history.push(`/survey/question/${1}`);
    }
  };

  incermentRoute = (page) => {
    this.setState({ submitted: true})
    if (page <= 10 && Object.values(this.state.field).length !== 0) {
      localStorage.setItem(
        "checkedPageNo",
        Number(localStorage.getItem("checkedPageNo")) + 1
      );

      questions
        .post("/answers", this.state.field)
        .then((resp) => {
          this.setState({ field: {}, page: page + 1, submitted: false });
        })
        .catch((err) => {});
      history.push(`/survey/question/${page + 1}`);
    }
  };

  decrementRoute = (page) => {
    if (page >= 1) {
      localStorage.setItem(
        "checkedPageNo",
        Number(localStorage.getItem("checkedPageNo")) - 1
      );

      questions
        .post("/answers", this.state.field)
        .then((resp) => {
          this.setState({ field: {} });
        })
        .catch((err) => {});

      this.setState({ page: page - 1 });
    }
  };

  renderQuestion = (question) => {
    return question.map((item) => {
      if (item.type === "radio") {
        return (
          <RadioType
            item={item}
            onChange={this.onChange}
            field={this.state.field}
            submitted={this.state.submitted}
          />
        );
      }

      if (item.type === "text" || item.type === "email" || item.type === "tel") {
        return (
          <TextType
            item={item}
            onChange={this.onChange}
            field={this.state.field}
          />
        );
      }

      if (item.type === "select") {
        return (
          <SelectType
            item={item}
            onChange={this.onChange}
            field={this.state.field}
          />
        );
      }
    });
  };

  renderQuestions = (questions) => {
    if (questions === null) {
      return null;
    }

    let parmasId = this.props.match.params.id;
    let question = questions.filter((question) => question.id == parmasId);
    return this.renderQuestion(question);
  };

  renderNoPageFound = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>404 Not Found</h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { page, questions } = this.state;
    if (questions === null) {
      return this.renderNoPageFound();
    }

    return (
      <div>
        <h2>Save by comparing solar panel quotes</h2>
        <div className="d-flex flex-column justify-content-around">
          {this.renderQuestions(questions)}
          <Link
            style={{ display: page !== 1 ? "block" : "none" }}
            className="next-page"
            onClick={(e) => this.decrementRoute(page)}
            to={page < 10 ? `/survey/question/${page - 1}` : "/result"}
          >
            Back
          </Link>
          <div onClick={(e) => this.setState({ submitted: true })}>
            <Link
              className="next-page"
              onClick={(e) => this.incermentRoute(page)}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Survey;
