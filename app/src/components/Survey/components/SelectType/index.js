import React from 'react';

class SelectType extends React.Component {
    onChange = (e) => {
        this.props.onChange({
            ['name']: e.target.options[e.target.selectedIndex].text,
            ['value']: e.target.value
        });
    }

    renderSelectOptions = options => {
        return options.map(({value, name}, index) => {
            return (
                <option key={index} name={name} value={value}>{value}</option>
            );
        })
    }

    renderSelectQuestion = ({ question, options }) => {
        return (
            <div className="container mt-sm-5 my-1">
                <div className="question ml-sm-5 pl-sm-5 pt-2">
                    <div className="py-2 h5">
                        <b>{`${question.charAt(0).toUpperCase() +
                            question.slice(1)
                            } ?`}</b>
                    </div>
                    <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                        {" "}
                        <div className="form-group">
                            <select onChange={this.onChange} className="form-control" id="exampleFormControlSelect1">
                                {this.renderSelectOptions(options)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return this.renderSelectQuestion(this.props.item)
    }
}

export default SelectType;