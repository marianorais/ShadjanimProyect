import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { GrFormAdd } from 'react-icons/gr';
import { getSectionLocalStorage, saveSectionLocalStorage } from '../../../helpers/section';
import { Section } from "../../../interfaces/section.interface";
import { UserContext } from '../../auth/UserContext';
import { ShowSection } from "./Section";

export const Sections = () => {
    const { user, section, setSection } = useContext(UserContext);
    const [ buttonPressedAddSection, setButtonPressedAddSection ] = useState(false)
    const [ lista, updateLista ] = useState(section);

    useEffect(() => { //carga info la primera vez      
      const sectionLocal: Section[] | undefined  = getSectionLocalStorage();
      if ( sectionLocal ) {
        const sortedList = sectionLocal.sort((a, b) => (a.Posicion > b.Posicion ? 1 : -1 ))

        for(var i=0;i<sectionLocal.length;i++){
          sortedList[i].Posicion = i
        }
        // actualizo el estado con la nueva lista ya ordenada
        updateLista(sortedList)
        setSection(sortedList)
      }
      else{ //Si es un usuario nuevo, agrego secciones por default.
        
        //Content Default
        const locationContent = {
          ID:0.1,
          Tipo: "TEXTO",
          Bullet: " ",
          Texto: "From Miami, FL currently residing in Crown Heights, Brooklyn NY (open to relocating)",
          Contactos: " ",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.1,
          Section_Users_idResume: 0,
        }
        const parentContent = {
          ID:0.2,
          Tipo: "TEXTO",
          Bullet: " ",
          Texto: "Rabbi Zalmen Brenner married to Rochel Brenner (knee Sandmen)",
          Contactos: " ",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.2,
          Section_Users_idResume: 0,
        }
        const sibilingContent = {
          ID:0.3,
          Tipo: "TEXTO",
          Bullet: " ",
          Texto: "Sara is 1 of 8 Ble'H",
          Contactos: " ",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.3,
          Section_Users_idResume: 0,
        }
        const bioContent = {
          ID:0.4,
          Tipo: "TEXTO",
          Bullet: " ",
          Texto: "Sara is an erliche. ballas midos, sweet, mature, talented, responsible and intelligent girl.",
          Contactos: " ",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.4,
          Section_Users_idResume: 0,
        }
        const lookingForContent = {
          ID:0.5,
          Tipo: "TEXTO",
          Bullet: " ",
          Texto: "She is looking for a baal midos, sensitive, mature intelligent, ehrliche chassidish boy passionate about shlichus",
          Contactos: " ",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.5,
          Section_Users_idResume: 0,
        }
        const educationContent = {
          ID:0.6,
          Tipo: "BULLET",
          Bullet: "Bies Rivka (2017 - 2019) ",
          Texto: " ",
          Contactos: " ",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.6,
          Section_Users_idResume: 0,
        }
        const educationContent2 = {
          ID:0.7,
          Tipo: "BULLET",
          Bullet: "Machon Alta Shlichus (2020 - 2021) ",
          Texto: " ",
          Contactos: " ",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.6,
          Section_Users_idResume: 0,
        }
        const workContent = {
          ID:0.8,
          Tipo: "BULLET",
          Bullet: "Teacher at Bies Rivka (2021 - Present) ",
          Texto: " ",
          Contactos: " ",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.7,
          Section_Users_idResume: 0,
        }
        const familyReferencesContent = {
          ID:0.9,
          Tipo: "CONTACT",
          Bullet: " ",
          Texto: "Benjamin Greenglass ",
          Contactos: "555-555-555",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.8,
          Section_Users_idResume: 0,
        }
        const familyReferencesContent2 = {
          ID:0.91,
          Tipo: "CONTACT",
          Bullet: " ",
          Texto: "Rebitzen Rachel Sandberg ",
          Contactos: "Rsandberg@gmail.com",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.8,
          Section_Users_idResume: 0,
        }
        const friendContent = {
          ID:0.92,
          Tipo: "CONTACT",
          Bullet: " ",
          Texto: "Rebitzen Rachel Sandberg bas Reb Yechiel ",
          Contactos: "555-555-555 ",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.9,
          Section_Users_idResume: 0,
        }
        const friendContent2 = {
          ID:0.93,
          Tipo: "CONTACT",
          Bullet: " ",
          Texto: "Benjamin Greenglass ",
          Contactos: "555-555-555",
          IsDefault: true,
          WasEditedDefault:false,
          SectionID: 0.9,
          Section_Users_idResume: 0,
        }
        //Section Default
        const locationSection = {
          ID:0.1,
          Titulo: "Location",
          Posicion: 0,
          IsDefault: true,
          editDefault: false,
          Enable: 1,
          Users_idResume: user.idResume,
          ContList: [locationContent]
        }
        const parentSection = {
          ID:0.2,
          Titulo: "Parents",
          Posicion: 1,
          IsDefault: true,
          editDefault: false,
          Enable: 1,
          Users_idResume: user.idResume,
          ContList: [parentContent]
        }
        const siblingSection = {
          ID:0.3,
          Titulo: "Siblings",
          Posicion: 2,
          IsDefault: true,
          editDefault: false,
          Enable: 1,
          Users_idResume: user.idResume,
          ContList: [sibilingContent]
        }
        const bioSection = {
          ID:0.4,
          Titulo: "Bio",
          Posicion: 3,
          IsDefault: true,
          editDefault: false,
          Enable: 1,
          Users_idResume: user.idResume,
          ContList: [bioContent]
        }
        const lookingForSection = {
          ID:0.5,
          Titulo: "Looking For",
          Posicion: 4,
          IsDefault: true,
          editDefault: false,
          Enable: 1,
          Users_idResume: user.idResume,
          ContList: [lookingForContent]
        }
        const educationSection = {
          ID:0.6,
          Titulo: "Education",
          Posicion: 5,
          IsDefault: true,
          editDefault: false,
          Enable: 1,
          Users_idResume: user.idResume,
          ContList: [educationContent,educationContent2]
        }
        const workSection = {
          ID:0.7,
          Titulo: "Work",
          Posicion: 6,
          IsDefault: true,
          editDefault: false,
          Enable: 1,
          Users_idResume: user.idResume,
          ContList: [workContent]
        }
        const familyRefSection = {
          ID:0.8,
          Titulo: "Family References",
          Posicion: 7,
          IsDefault: true,
          editDefault: false,
          Enable: 1,
          Users_idResume: user.idResume,
          ContList: [familyReferencesContent,familyReferencesContent2]
        }
        
        const friendsSection = {
          ID:0.9,
          Titulo: "Friends",
          Posicion: 8,
          IsDefault: true,
          editDefault: false,
          Enable: 1,
          Users_idResume: user.idResume,
          ContList: [friendContent,friendContent2]
        }
        section.push(locationSection,parentSection,siblingSection,bioSection,lookingForSection,educationSection,workSection,friendsSection,familyRefSection)
        // setSection(section)

        saveSectionLocalStorage(section)
      }     

    }, [])

    useEffect(() => { //agrega un nuevo section al localstorage y al context
      if (buttonPressedAddSection) {
        setSection(section);
  
        setButtonPressedAddSection(false)
      }
    }, [section, setSection, buttonPressedAddSection, setButtonPressedAddSection]);

    const reorder = (listaSection:any,startIndex:any,endIndex:any)=>{
        const result = [...listaSection];      
        const [orderItem] = result.splice(startIndex,1);
        result.splice(endIndex,0,orderItem);
   
        return result;
    };

    function handleEnd(resultado: any) {
      if(!resultado.destination){
        return;
      }
      if(resultado.source.index === resultado.destination.index &&
        resultado.droppableId === resultado.destination.droppableId)
        {
          //Si el destino no pertenece a ninguna posicion de la lista no lo ordeno
            return;
        }
        
      //cambian las posiciones de cada uno de los registros
      const { source, destination } = resultado;
      section[source.index].Posicion = destination.index;
      section[destination.index].Posicion = source.index;
      

      updateLista((prevList) => 
        reorder(prevList,resultado.source.index,resultado.destination.index)  
      );
      
      setSection(reorder([...section],resultado.source.index,resultado.destination.index))
    }

    const handleNewSection = () => {
      const lastSection = section[section.length - 1];
      if (lastSection?.Titulo === '') {
        //no lo dejo agregar otra section hasta que la anterior no se le puso el titulo
        return;
      }

      const newSection: Section = { 
        ID: Math.random(),
        Titulo: "",
        Posicion: section.length + 1,
        IsDefault: false,
        editDefault: false,
        Enable: 0,
        Users_idResume: user.idResume,
        ContList: []
      };

      section.push(newSection);
      setButtonPressedAddSection(true);
    }

    return (
        <div style={{zIndex: 1000}} className="sections-container">
        {
          <header>
              <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId="lista" direction="vertical">
                  {
                    (provided)=>(
                      <div ref={provided.innerRef}>                
                      {
                        section?.map((list, index) => {
                          return(
                            <Draggable key={list.ID} draggableId={`${list.ID}`} index={index}>
                              {
                              (provided)=>(     
                                <ShowSection section={list} provided={provided}/>
                              )}
                            </Draggable>
                          );
                        })
                      }
                      {provided.placeholder}
                      </div>
                    )
                  }
                </Droppable>
              </DragDropContext>
            </header>       
        }
          <button className="sections-container__btn" onClick={handleNewSection}>
            <GrFormAdd className="sections-container__icon" />Add Section
          </button>
        </div>
    )
}