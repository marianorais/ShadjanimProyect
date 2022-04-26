export interface Ui {
    error: boolean;
    message: string;
    isLoading: boolean,
    isLogged?: boolean    
}

export type UiContextState = {
    uiState: Ui;
    setUiState: (ui: Ui) => void;
}