import { AppRouter } from "./routers/AppRouter";
import { UserContext } from "./components/auth/UserContext";
import { useState } from "react";
import { User } from "./interfaces/user.interface";
import { Ui } from "./interfaces/ui.interface";
import { Section } from "./interfaces/section.interface";

function ShidujApp() {
  const userAux = {} as User;
  //const contentAux = {} as Content;
  const sectionAux = [] as Section[];
  const sectionDeleteAux = [] as number[];
  const contentDeleteAux = [] as number[];
  const imagesNewUserAux = [] as File[];
  const ui = {} as Ui;


  const [user, setUser] = useState<User>(userAux);
  const [section, setSection] = useState<Section[]>(sectionAux);
  const [contentDelete, setContentDelete] = useState<number[]>(contentDeleteAux);
  const [sectionDelete, setSectionDelete] = useState<number[]>(sectionDeleteAux);
  const [imagesNewUser,setImagesNewUser] = useState<File[]>(imagesNewUserAux);

  const [uiState, setUiState] = useState<Ui>(ui)

  return (
    <div className="container">
      <UserContext.Provider value={{user, setUser, section, setSection,sectionDelete,setSectionDelete,contentDelete,setContentDelete, uiState, setUiState,imagesNewUser,setImagesNewUser}}>
        <AppRouter />
      </UserContext.Provider>
    </div>
  );
}

export default ShidujApp;