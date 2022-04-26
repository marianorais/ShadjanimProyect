import { createContext } from "react";
import { Ui, UiContextState } from "../interfaces/ui.interface";

const startState: Ui = {
    error: false,
    isLoading: false,
    message: "",
    isLogged: false
}

const contextDefaultValue: UiContextState = {
    uiState: startState,
    setUiState: (uiState: Ui) => {}
}

export const UiContext = createContext<UiContextState>(contextDefaultValue);

