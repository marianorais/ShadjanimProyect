import React, { useContext, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-date-picker';
import { getUserLocalStorage } from '../../helpers/login';
import { User } from "../../interfaces/user.interface";
import { UserContext } from '../auth/UserContext';

import { DateTime } from 'luxon';

//import Select from 'react-select';
import Select from 'react-select'

export const BasicDetails = ({history}: any) => {
    const { user, setUser, setUiState } = useContext(UserContext);
    const { Nombre, Cumpleanos, Altura, Pais, EdadoFecha, ZipCode } = user;
    const [date, setDate] = useState<Date | string>();

    const dayBirthday = useRef<HTMLInputElement>(null);
    const monthBirthday = useRef<HTMLInputElement>(null);
    const yearBirthday = useRef<HTMLInputElement>(null);
    
    const [ editName, setEditName]             = useState<boolean>( Nombre === '');
    const [ editCountry, setEditCountry]             = useState<boolean>( Pais === '');
    const [ editHeight, setEditHeight]             = useState<boolean>( Altura === '');
    const [ editZipCode, setEditZipCode]             = useState<boolean>( ZipCode === undefined);

    const [tipoDeColorName,setTipoDeColorName] = useState('colorSection');
    const [tipoDeColorCountry,setTipoDeColorCountry] = useState('colorSection');
    const [tipoDeColorHeight,setTipoDeColorHeight] = useState('colorSection');
    const [tipoDeColorZipCode,setTipoDeColorZipCode] = useState('colorSection');

    const options = [
        {value: 'Argentina', label: 'Argentina'},
        {value: 'Brazil', label: 'Brazil'},
        {value: 'Israel', label: 'Israel'},
        {value: 'Australia', label: 'Australia'},
        {value: 'England', label: 'England'},
        {value: 'France', label: 'France'},
        {value: 'Chile', label: 'Chile'},
        {value: 'Italy', label: 'Italy'},
        {value: 'Spain', label: 'Spain'},
        {value: 'Uruguay', label: 'Uruguay'},
        {value: 'United States', label: 'United States'},
        {value: 'Mexico', label: 'Mexico'},
        {value: 'Canada', label: 'Canada'},
        {value: 'Panama', label: 'Panama'},
    ]
    type LabelValueObject = {
        value: string,
        label: string
    }

    useEffect(() => {
        const userLocal: User | undefined  = getUserLocalStorage();
        if (userLocal) {
            //Default Values
            if(userLocal.Nombre === undefined){
                userLocal.Nombre = "John Doe"
                setTipoDeColorName('colorDefault')}
            if(userLocal.Altura === undefined){
                 userLocal.Altura = "5.4"
                 setTipoDeColorHeight('colorDefault')}
            if(userLocal.Pais === undefined){
                userLocal.Pais = "Miami, Florida"
                setTipoDeColorCountry('colorDefault')}
            if(userLocal.ZipCode === undefined){
                userLocal.ZipCode = 33101
                setTipoDeColorZipCode('colorDefault')}

            setUser(userLocal);
            setUiState({isLogged: true, error: false, message: '', isLoading: false});
        }       
    }, []);

    const formatBirthDate = (): void => {
        const { value:monthValue } = monthBirthday.current! || '';
        const { value:dayValue } = dayBirthday.current! || '';
        const { value:yearValue } = yearBirthday.current! || '';

        if(Number(yearValue)>1900 && Number(dayValue)>0 && Number(monthValue)>0
           && Number(yearValue)<3000 && Number(dayValue)<32 && Number(monthValue)<13){
            
            console.log("monthValue",Number(monthValue))
            console.log("dayValue",Number(dayValue))
            
            const newDate = Number(monthValue)+"-"+Number(dayValue)+"-"+Number(yearValue);
            const ms = Date.parse(newDate)
            const date = new Date(ms)

            const day = (Number(dayValue) < 10) ? `0${date.getDate()}` : date.getDate();
            const month = (Number(monthValue) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            
            const dateAux = `${yearValue}-${month}-${day}`;


            const date1 = DateTime.fromJSDate(date);
            const date2 = DateTime.fromJSDate(new Date());

            const { years } = date2.diff(date1, ["years"]);
            setDate(date);
            setUser({
                ...user, 
                Cumpleanos: dateAux,
                Edad: Math.round(years)
            });
        }
    }
    const initialDate = (type:String) =>{
     
        if(type==="Day"){
            if(user.Cumpleanos!==undefined){
                const day = new Date(Cumpleanos).getDate()
                return day + 1
            }
            if(dayBirthday.current===null){
                return ''
            }
            else{
                return dayBirthday.current!.value || ''
            }
        }

        if(type==="Month"){
            if(user.Cumpleanos!==undefined){
                const month = new Date(Cumpleanos).getMonth()
                return month + 1
            }
            if(monthBirthday.current===null){
                return ''
            }
            else{
                return monthBirthday.current!.value || ''
            }
        }
        if(type==="Year"){
            if( user.Cumpleanos !== undefined){
                const year = new Date(Cumpleanos).getFullYear()
                return year
             }
             if(yearBirthday.current===null){
                return ''
            }
             else{
                 return yearBirthday.current!.value || ''
             }
        }
    }

    const ChangeValue = (e:any,type:string)=>{
        if(type==="name"){
            if (e.target.value.length === 0) {

            }
            else{
                setUser({...user, Nombre: e.target.value})
                setTipoDeColorName("colorSection")
            }
            setEditName(false)
        }

        if(type==="country"){
            if (e.target.value.length === 0) {
            
            }
            else{
                setUser({...user, Pais: e.target.value})
                setTipoDeColorCountry("colorSection")
            }
            setEditCountry(false)
        }

        if(type==="height"){
            if (e.target.value.length === 0) {
            
            }
            else{
                setUser({...user, Altura: e.target.value})
                setTipoDeColorHeight("colorSection")
            }
            setEditHeight(false)
        }

        if(type==="zipCode"){
            if (e.target.value.length === 0) {
            
            }
            else{
                setUser({...user, ZipCode: e.target.value})
                setTipoDeColorZipCode("colorSection")
            }
            setEditZipCode(false)
        }
    }

    return (
        <div className="basic-details">
            <div className="basic-details__input">
                <p className="basic-details__input--title">*Your name</p>
                
                {  (Nombre === '' || editName) 
                    ?
                    <span onClick={() => setEditName(true)}>
                        <input 
                        type="text" 
                        className="basic-details__input--input" 
                        autoFocus={true}
                        onBlur={(e)=>ChangeValue(e,"name")}
                        name='Nombre'
                        placeholder={Nombre === '' ? '' :Nombre}
                        />
                    </span>
                    :
                        <span
                        onClick={() => setEditName(true)}
                        className={tipoDeColorName + " basic-details__input--input"}>
                            <div
                                style={{height: '28px'}}>
                                {Nombre}
                            </div>
                        </span>
                }                 
            </div>
            <div  className="basic-details__input">
                <p className="basic-details__input--title">*Birthday</p>
            </div>

            <div className="basic-details__birthday">
                <div className="basic-details__input">
                    
                    <div >
                        <div className='birthday'>
                            <p >Month</p>
                            <p>Day</p>
                            <p style={{marginLeft:'25px'}}>Year</p>
                        </div>
                        <div style={{opacity:0.4}} className="basic-details__input--input">
                            <div className='birthday'>
                                <input 
                                defaultValue={initialDate("Month")}
                                placeholder='MM' type="number" maxLength={2} ref={monthBirthday} onChange={()=>formatBirthDate()}/>
                                <input 
                                placeholder='DD'
                                defaultValue={initialDate("Day")}
                                 type="number" maxLength={2} ref={dayBirthday} onChange={()=>formatBirthDate()}/>
                                <input 
                                defaultValue={initialDate("Year")} 
                                placeholder='YYYY' type="number" ref={yearBirthday} onChange={()=>formatBirthDate()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            
                {
                    EdadoFecha === 1 ?
                    <div style={{marginTop:'-30px',marginLeft: '7px'}} className="basic-details__input">
                        
                        <input 
                            type="radio" 
                            value={ EdadoFecha }
                            name='EdadoFecha'
                            checked={ EdadoFecha === 1 }
                            onClick={ () => setUser({...user, EdadoFecha: 0}) }
                        /> <span style={{verticalAlign: 'super'}}className="basic-details__input--radio">Show exact date</span>
                    </div>
                    :
                    <div style={{marginTop:'-30px',marginLeft: '7px'}} className="basic-details__input">
                        <input 
                            type="radio" 
                            value={ EdadoFecha }
                            name='EdadoFecha'
                            onChange={ () => setUser({...user, EdadoFecha: 1}) }
                        /> <span style={{verticalAlign: 'super'}}className="basic-details__input--radio">Show exact date</span>
                    </div>
                }

            <div className="basic-details__input">
                <p className="basic-details__input--optional">(Optional) Your family's city and state</p>

                {/* <Select 
                    className='react-select-container'
                    placeholder="Select a Country"                    
                    options={options} 
                    defaultValue={ options.find((option)=> option.label === Pais ) }
                    onChange={ handleChangeCoun     try }
                />               */}
                {   (Pais === '' || editCountry) 
                    ?
                    <span onClick={() => setEditCountry(true)}>
                        <input 
                        className='basic-details__input--input'
                        type="text" 
                        autoFocus={true}
                        placeholder={Pais === '' ? '' : Pais}
                        onBlur={ (e) => ChangeValue(e,"country") }>
                        </input>
                    </span>
                    :
                    <span
                        onClick={() => setEditCountry(true)}
                        className={tipoDeColorCountry + " basic-details__input--input"}>
                        <div
                        style={{height: '28px'}}>
                            {Pais}</div>
                    </span>
                }
            </div>

            <div className="basic-details__input">
                <p className="basic-details__input--optional">(Optional) Height</p>
                { (Altura === '' || editHeight) ?
                    
                    <span onClick={() => setEditHeight(true)}>
                        <input 
                        autoFocus={true}
                        type="number" 
                        className="basic-details__input--input" 
                        name='Altura'
                        onBlur={ (e) => ChangeValue(e,"height") }
                        placeholder={Altura === '' ? '' : Altura}
                        />
                    </span>
                    :
                    <span
                    onClick={() => setEditHeight(true)}
                    className={tipoDeColorHeight + " basic-details__input--input"}>

                        <div style={{height: '28px'}}>
                            {Altura}
                        </div>
                    </span>
                }
            </div>

            <div className="basic-details__input">
                <p className="basic-details__input--optional">(Optional) ZipCode</p>
                {   (ZipCode === undefined || editZipCode) ?
                    <input 
                    autoFocus={true}
                    type="number" 
                    className="basic-details__input--input" 
                    name='ZipCode'
                    onBlur={(e)=> ChangeValue(e,"zipCode")}
                    placeholder={ZipCode === undefined ? undefined : ZipCode.toString()}
                    // onChange={ (e) => setUser({...user, ZipCode: Number(e.target.value)}) }
                    />
                    :
                    <span
                    onClick={() => setEditZipCode(true)}
                    className={tipoDeColorZipCode + " basic-details__input--input"}>

                        <div style={{height: '28px'}}>
                            {ZipCode}
                        </div>
                    </span>
                }

            </div>
        </div>
    )
}