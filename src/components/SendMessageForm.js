import React from 'react'

class SendMessageForm extends React.Component {
    state = {
        message: ''
    }

    handleChange(event) {
        this.setState({message: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
        
    }
    render() {        
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="send-message-form">
                <input
                    disabled={this.props.disabled}
                    onChange={this.handleChange.bind(this)}
                    value={this.state.message}
                    placeholder="Type Message and Press ENTER"
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm