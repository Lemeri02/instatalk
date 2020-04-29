import consumer from "./consumer"

let room = {};

const createRoomChannel = roomId => {
  room = consumer.subscriptions.create({
    channel: "RoomChannel",
    roomId: roomId
  }, {
    connected() {
    },

    disconnected() {
    },

    received(data) {
      $('#messages').append(data['message'])
      scrolling();
    },

    speak: function(message) {
      return this.perform('speak', {
        message: message
      });
    }
  });
};

$(document).on("turbolinks:load", function() {
  let messages = $('#messages');

  if (messages.length > 0) {
    createRoomChannel(messages.data('room-id'))
  };

  scrolling();
});

$(document).on("keypress", "#message_body", function(e) {
  let message = e.target.value;

  if (e.keyCode === 13 && message !== '') {
    room.speak(message);
    e.target.value = "";
  };

  if (e.keyCode === 13) {
    e.preventDefault();
  };
});

const scrolling = () => {
  let messagesInner = document.querySelector(".messages-inner");

  if (messagesInner) {
    messagesInner.scrollTop = messagesInner.scrollHeight;
  };
};
