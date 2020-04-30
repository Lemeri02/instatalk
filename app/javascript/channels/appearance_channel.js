import consumer from "./consumer"

consumer.subscriptions.create({channel: "AppearanceChannel"}, {
  initialized() {
    this.update = this.update.bind(this)
  },

  connected() {
    this.install()
    this.update()
  },

  disconnected() {
    this.uninstall()
  },

  rejected() {
    this.uninstall()
  },

  update() {
    this.documentIsActive ? this.update_online_status() : this.away()
  },

  update_online_status() {
    this.perform("update_online_status")
  },

  away() {
    this.perform("away")
    this.uninstall()
  },

  received(data) {
    let { user } = data;
    let { nickname, status, id } = user;
    let userNodeId = $('#user-list').find(`[data-user-id=${id}]`);

    if (!status){
      userNodeId.remove();
    };

    if (status && userNodeId.length != 1){
      $('#user-list').append(`
        <li data-user-id="${id}" data-user-status="${status}">
          <b>${nickname}</b>
          <span class="spinner-grow spinner-grow-sm text-success">&#183;</span>
        </li>`);
    };
  },

  install() {
    window.addEventListener("focus", this.update)
    window.addEventListener("blur", this.update)
    document.addEventListener("turbolinks:load", this.update)
    document.addEventListener("visibilitychange", this.update)
  },

  uninstall() {
    window.removeEventListener("focus", this.update)
    window.removeEventListener("blur", this.update)
    document.removeEventListener("turbolinks:load", this.update)
    document.removeEventListener("visibilitychange", this.update)
  },

  get documentIsActive() {
    return document.visibilityState == "visible" && document.hasFocus()
  },
});
