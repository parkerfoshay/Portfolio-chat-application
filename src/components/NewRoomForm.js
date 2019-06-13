import React from "react";

class NewRoomForm extends React.Component {
  state = {
    roomName: ""
  };

  handleChange(event) {
    this.setState({
      roomName: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({ roomName: "" });
  }

  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            value={this.state.roomName}
            onChange={this.handleChange.bind(this)}
            type="text"
            placeholder="Create New Room"
            required
          />
          <button id="create-room-btn" type="submit">
            +
          </button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
