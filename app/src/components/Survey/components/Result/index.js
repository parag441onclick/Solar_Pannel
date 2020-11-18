import React from "react";
import questions from "../../../../api/questions";

class Result extends React.Component {
  state = {
    answers: null,
  };

  componentDidMount() {
    questions
      .get("/answers")
      .then((resp) => {
          this.setState({ answers: resp.data });
      })
      .catch((err) => {});
  }

  renderSurveyResult = () => {
    if (this.state.answers === null) {
      return null;
    }

    return this.state.answers.map((answer) => {
      let answerValues = Object.values(answer);
      let answerKeys = Object.keys(answer);

      return (
        <tr>
          <th scope="row">{answerKeys[0]}</th>
          <td>{answerValues[0]}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">FieldName</th>
            <th scope="col">FieldValue</th>
          </tr>
        </thead>
        <tbody>{this.renderSurveyResult()}</tbody>
      </table>
    );
  }
}

export default Result;
