import React from 'react';

class SelectType extends React.Component {
    onChange = (e) => {
        this.props.onChange({
            ['name']: e.target.name,
            ['value']: e.target.value
        });
        
        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)
    }

    renderSelectOptions = options => {
        return options.map((optionValue, index) => {
            return (
                <option key={index} value={optionValue}>{optionValue}</option>
            );
        })
    }

    renderSelectQuestion = ({ question, options }) => {
        return (
            <div class="container mt-sm-5 my-1">
                <div class="question ml-sm-5 pl-sm-5 pt-2">
                    <div class="py-2 h5">
                        <b>{`${question.charAt(0).toUpperCase() +
                            question.slice(1)
                            } ?`}</b>
                    </div>
                    <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                        {" "}
                        <div class="form-group">
                            <select onChange={this.onChange} class="form-control" id="exampleFormControlSelect1">
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