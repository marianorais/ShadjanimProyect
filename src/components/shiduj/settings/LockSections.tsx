import React,{useState} from 'react'

interface SectionProps {
  page: string;   
}

const sections = [
    {
       "id":"1",
       "titulo": "titulo 1"
    },
    {
       "id":"2",
       "titulo": "titulo 2"
    }
  ]
const LockSection: React.FC<SectionProps> = ({page}) => {
    const [listSection] = useState(sections);

    return (
      <div>
          {page === 'selectSections' ? 
           <p>*Choose what elements this user has permission to view</p> 
           :
           <p>*Choose what sections to lock</p>
          }<br/>
          {listSection.map(item => (
             <label key={item.id}>
             <input
               type="checkbox"
             />{" "}{item.titulo}<br/>
             </label>
          ))}
      </div>
    );
  };export default LockSection;