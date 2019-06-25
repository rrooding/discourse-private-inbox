import { withPluginApi } from "discourse/lib/plugin-api";
import { default as computed } from "ember-addons/ember-computed-decorators";

function initializePrivateInbox(api) {
  api.modifyClass("controller:user", {
    @computed("viewingSelf", "currentUser.admin")
    showPrivateMessages(viewingSelf, isAdmin) {
      if(!viewingSelf && this.siteSettings.private_inbox_enabled) {
        return false;
      } else {
        return this._super();
      }
    }
  });
}

export default {
  name: "apply-private-inbox",

  initialize() {
    withPluginApi("0.8.8", initializePrivateInbox);
  }
};
