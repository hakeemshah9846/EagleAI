import { patch } from "../../../helpers/api_helper";

class StateAPI {
    static SWITCH_STATE = "/user/switch-state";

    static switchState(payload) {
        return patch(this.SWITCH_STATE, payload);
    }
}

export default StateAPI
