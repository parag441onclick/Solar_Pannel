import React from 'react';

class RadioType extends React.Component {
    state = {
        formData: {},
    }

    onChange = (e) => {
        this.props.onChange({
            ['name']: e.target.name,
            ['value']: e.target.value
        });

        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)
    }

    renderRadioOptions = (options) => {
        return options.map(({ label, type, name, value, defaultChecked, id }) => {
            return (
                <div id="ques" key={id}>
                    <label class="">
                        {`${label}`}{" "}
                        <input
                            type={type}
                            name={name}
                            value={value}
                            defaultChecked={false}
                            onChange={this.onChange}
                        />{" "}
                        <span class=""></span>{" "}
                    </label>{" "}
                </div>
            );
        });
    };

    renderRadioQuestion = ({ question, options }) => {
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
                        {this.renderRadioOptions(options)}
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