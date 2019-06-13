import React from "react";
import "./style.css";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";
import { tokenUrl, instanceLocator } from "./config";

const randomUsers = ['parker', 'john', 'virginie', 'jane']

class App extends React.Component {
  state = {
    roomId: null,
    messages: [],
    joinableRooms: [],
    joinedRooms: []
  };

  componentWillMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: randomUsers[Math.floor(Math.random() * Math.floor(4))],
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => console.log(" error on connecting", err));
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log(" error on join able rooms", err));
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this.getRooms();
      })
      .catch(err => console.log("error on sub to room", err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  createRoom(roomName) {
    this.currentUser
      .createRoom({
        name: roomName
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log("err Create room", err));
  }
  render() {
    return (
      <div className="app">
        <RoomList
          roomId={this.state.roomId}
          subscribe={this.subscribeToRoom.bind(this)}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage.bind(this)}
        />
        <NewRoomForm createRoom={this.createRoom.bind(this)} />
      </div>
    );
  }
}

export default App;
