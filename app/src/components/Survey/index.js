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
  };

  componentDidMount() {
    this.confirmNavigation();
    questions.get("/data").then((resp) => {
      this.setState({ questions: resp.data });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.confirmNavigation();
    }
  }

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

  confirmNavigation = () => {
    let checkedPageNo = Number(localStorage.getItem("checkedPageNo"));
    let parmasId = Number(this.props.match.params.id);
    console.log(checkedPageNo + 1 !== parmasId);
    if (checkedPageNo) {
      if (parmasId !== checkedPageNo + 1) {
        console.log("hello");
        if (parmasId >= 1 && parmasId < 10) {
          this.setState({ page: checkedPageNo + 1 });
          history.push(`/survey/question/${checkedPageNo + 1}`);
        } else if (parmasId < 1) {
          this.setState({ page: checkedPageNo + 1 });
          history.push(`/survey/question/${checkedPageNo + 1}`);
        } else if (parmasId >= 10) {
          this.setState({ page: checkedPageNo + 1 });
          history.push(`/survey/question/${checkedPageNo + 1}`);
        }
      } else {
        console.log("lello");
        if (parmasId > 10) {
          this.setState({ page: checkedPageNo + 1 });
          localStorage.setItem("checkedPageNo", 10);
          history.push("/result");
        }
      }
    } else {
      localStorage.setItem("checkedPageNo", 0);
      this.setState({ page: 1 });
      history.push(`/survey/question/${1}`);
    }
  };

  incermentRoute = (page) => {
    if (page <= 10) {
      localStorage.setItem(
        "checkedPageNo",
        Number(localStorage.getItem("checkedPageNo")) + 1
      );

      questions
        .post("/answers", this.state.field)
        .then((resp) => {
          console.log(resp);
          this.setState({ field: {} });
        })
        .catch((err) => console.log(err));

      this.setState({ page: page + 1 });
    }
  };

  renderQuestion = (question) => {
    return question.map((item) => {
      console.log("type", question);
      if (item.type === "radio") {
        return <RadioType item={item} onChange={this.onChange} />;
      }

      if (item.type === "text") {
        return <TextType item={item} onChange={this.onChange} />;
      }

      if (item.type === "select") {
        return <SelectType item={item} onChange={this.onChange} />;
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

  render() {
    const { page, questions } = this.state;
    return (
      <div>
        <h2>Save by comparing solar panel quotes</h2>
        <div className="d-flex flex-column justify-content-around">
          {this.renderQuestions(questions)}
          <Link
            className="next-page"
            onClick={(e) => this.incermentRoute(page)}
            to={page < 10 ? `/survey/question/${page + 1}` : "/result"}
          >
            Next
          </Link>
        </div>
      </div>
    );
  }
}

export default Survey;
