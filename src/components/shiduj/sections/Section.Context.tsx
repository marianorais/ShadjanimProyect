import React, { createContext } from "react";
import { Section, SectionContextState } from '../../../interfaces/section.interface'


const contextDefaultValue: SectionContextState = {
    section : {} as Section,
    setSection: (section: Section) => {},
}

export const SectionContext = createContext<SectionContextState>(contextDefaultValue);