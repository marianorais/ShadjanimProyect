import React, {useContext} from 'react';
import validator from 'validator';
import { Section } from '../../../interfaces/section.interface';
import { UserContext } from '../../auth/UserContext';

interface SectionResumeProps {
  section: Section;
}

export const SectionResumePreview: React.FC<SectionResumeProps> = ({section}) => {
  const  { Titulo, ContList } = section;

  const Esmail = (texto:any) => {
    const email = 'mailto:' + texto
    const number = 'tel:+' + texto

    if (validator.isEmail(texto)) {
        
        return <a href={email}>{texto}</a>
    }
    else{

        if(validator.isNumeric(texto.toString())){
            return  <a href={number}><p> {texto} </p></a>
        }
        return  <p > {texto} </p>
    }
}

  return (
    <div className='save__section'>
      <div className='save__section--title'>{Titulo}</div>
      {
        ContList.map((cont) => { 
          switch (cont.Tipo) {
            case 'BULLET':
                return <div key={cont.ID} className='save__section--item bullet'>{cont.Bullet}</div>
            case 'TEXTO':
                return <div key={cont.ID} className='save__section--item'>{cont.Texto}</div>
            case 'CONTACT':
                return( 
                  <div key={cont.ID} className='save__section--item'>
                    <div>{cont.Texto}</div>
                    <div className='contacts'>{Esmail(cont.Contactos)}</div>
                  </div>)
          }
        })
      }
    </div>
  );
};
