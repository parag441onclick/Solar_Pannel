import React from 'react';

class TextType extends React.Component {
    onChange = (e) => {
        this.props.onChange({
            ['name']: e.target.name,
            ['value']: e.target.value
        });
        
        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)
    }

    renderTextOptions = options => {
        return options.map(({ label, type, name, defaultValue, id }) => {
            return (
                <div key={id} class="form-group">
                    <label for={id}>{label}</label>
                    <input
                        type={type}
                        class="form-control"
                        id={id}
                        name={name}
                        defaultValue={defaultValue}
                        aria-describedby="emailHelp"
                        onChange={this.onChange}
                    />
                </div>
            );
        })
    }

    renderTextQuestion = ({ question, options }) => {
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
                        {this.renderTextOptions(options)}
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