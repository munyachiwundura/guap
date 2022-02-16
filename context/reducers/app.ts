type State = {
    dark: boolean
}

type Action = 
| {
    type: "DARK_MODE";
    // quantity: number;
}
| {
    type: "LIGHT_MODE";
    // quantity: number;
}

export function app(state: State, action: Action) {
    switch (action.type) {
      case "DARK_MODE":
        return { ...state, dark: true}
      case "LIGHT_MODE":
        return { ...state, dark: false}
      default:
        return state;
    }
  }