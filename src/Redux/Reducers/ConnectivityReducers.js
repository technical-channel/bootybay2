const initialState = {
  metamaskAddress: "",
  metamaskBalance: "",
  metamaskNetwork: "",
  LaunchpadList: [],
  metamaskConnect: false,
  Contract: [],
  provider: "",
};

export function ConnectivityReducer(state = initialState, action) {
  switch (action.type) {
    case "WALLET_DISCONNECT":
      return {
        metamaskAddress: "",
        metamaskBalance: "",
        metamaskNetwork: "",
        metamaskConnect: false,
      };
    case "LAUNCHPAD_LIST":
      return {
        LaunchpadList: action.payload,
      };
    default:
      return state;
  }
}
