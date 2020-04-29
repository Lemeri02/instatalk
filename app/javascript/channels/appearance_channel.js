import consumer from "./consumer"

$(document).on("turbolinks:load", function() {
  createAppearanceChannel();

  let userNodeStatus = $('#user-list').find(`[data-user-status=false]`);
  userNodeStatus.remove();
});

const createAppearanceChannel = () => {
  consumer.subscriptions.create({channel: "AppearanceChannel"}, {
    connected() {
    },

    disconnected() {
    },

    received(data) {
      let user = data.user;
      let nickname = user.nickname;
      let status = data.user.status;
      let userNodeId = $('#user-list').find(`[data-user-id=${user.id}]`);

      if (!status){
        userNodeId.remove();
      };

      if (status && (userNodeId.length != 1)){
        $('#user-list').append(`
          <li data-user-id="${user.id}" data-user-status="${user.status}">
            <b>${nickname}</b>
            <span class="spinner-grow spinner-grow-sm text-success">&#183;</span>
          </li>`);
      };
    },
  });
};
