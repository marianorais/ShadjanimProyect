import { createContext } from "react";
import { Section } from "../../interfaces/section.interface";
import { Ui, UiContextState } from "../../interfaces/ui.interface";
import { User, UserContextState } from '../../interfaces/user.interface'


const contextDefaultValue: UserContextState & UiContextState = {
    //Global Data
    user : {} as User,
    setUser: (user: User) => {},
    section : [] as Section[],
    setSection:(section: Section[]) => {},
    sectionDelete: [] as number[],
    setSectionDelete:(contentDelete: number[]) => {},
    contentDelete: [] as number[],
    setContentDelete:(contentDelete: number[]) => {},
    uiState: {} as Ui,
    setUiState: (uiState: Ui) => {},
    imagesNewUser : [] as File[],
    setImagesNewUser : (imagesNewUser: File[]) => {}
}

export const UserContext = createContext<UserContextState & UiContextState>(contextDefaultValue);
UserContext.displayName = 'UserContext';