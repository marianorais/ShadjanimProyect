import React, { useRef, useState, useContext,useEffect } from 'react';
import { Area } from 'react-easy-crop/types';
import { IoMdTrash } from 'react-icons/io';
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import noImage from '../../../assets/img/noimage.png';
import { ImageResizer } from "./ImageResizer";
import getCroppedImg from "./ImagesCropped";
import { uploadImage,cropImage } from '../../../helpers/uploads';

import { UserContext } from '../../auth/UserContext';
import { useLocation } from 'react-router-dom';
import { getUserLocalStorage, saveUserLocalStorage } from '../../../helpers/login';
import { DeleteBox } from '../DeleteBox';
import { User } from '../../../interfaces/user.interface';


interface Lista {
  id: number;
  imageUrl: string;
  croppedImageUrl: string;
}

export const Images = () => {
    const [ modal, setModal ] = useState(false);
    const [ indexSlider, setIndexSlider ] = useState<number>(0);
    const [ image, setImage ] = useState<string>();
    const [ cropppedArea, setCroppedArea ] = useState<Area>();
    const [ preview, setPreview ] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const { user, setUser } = useContext(UserContext);
    const { imagesNewUser, setImagesNewUser } = useContext(UserContext);
    const { uiState, setUiState } = useContext(UserContext);
    const [modalDeleteImage, setModalDeleteImage] = useState(false)
    const location = useLocation();
    const [updateImage,setUpdateImage] = useState(true);
    const { isLoading } = uiState;


    let imagesData = [
      {
          id:1,
          imageUrl:noImage,
          croppedImageUrl:user.Imagen1,
      },
      {
          id:2,
          imageUrl:noImage,
          croppedImageUrl:user.Imagen2,
      },
      {
          id:3,
          imageUrl:noImage,
          croppedImageUrl:user.Imagen3,
      },
    ]
    const [ lista, updateLista ] = useState<Lista[]>(imagesData);

    useEffect(() => {
      if(Object.keys(user).length<1){
        var usuario = JSON.parse(localStorage.getItem('user')!);
        //  const userLocal: User | undefined  = getUserLocalStorage();
        if(usuario !== null){
          const imageUser = AgregarImagen(usuario)
          updateLista(imageUser)
        }
      }
      else{
        const imageUser = AgregarImagen(user)
        updateLista(imageUser)
      }

     }, []);

     const saveNewImage = (lista:any) =>{
       user.Imagen1 = lista[0].croppedImageUrl
       user.Imagen2 = lista[1].croppedImageUrl
       user.Imagen3 = lista[2].croppedImageUrl
       saveUserLocalStorage(user)
     }

     const AgregarImagen = (user:User) => {
      let imagesData = []
      if(user.Imagen1===undefined || user.Imagen2===undefined || 
       user.Imagen3 === undefined){

         imagesData = [
           {
               id:1,
               imageUrl:noImage,
               croppedImageUrl:noImage,
           },
           {
               id:2,
               imageUrl:noImage,
               croppedImageUrl:noImage,
           },
           {
               id:3,
               imageUrl:noImage,
               croppedImageUrl:noImage,
           },
         ]
       }
       else{
          imagesData = [
            {
                id:1,
                imageUrl:noImage,
                croppedImageUrl:user.Imagen1,
            },
            {
                id:2,
                imageUrl:noImage,
                croppedImageUrl:user.Imagen2,
            },
            {
                id:3,
                imageUrl:noImage,
                croppedImageUrl:user.Imagen3,
            },
          ]
        }
        return imagesData;
    }
    const allowedExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

    const settings: Settings = {
        lazyLoad: "ondemand",
        dots: true,
        /* centerMode: true, */
        fade: true,
        infinite: true,
        centerPadding: "80px",
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        draggable: true,
        arrows: false,
        /* dotsClass: "dots" */
        useCSS: true,
        afterChange: (index) => {
          setIndexSlider(index);
        }
    };

    const changeModalValue = () => {
      setModal(!modal);
    }

    const onSelectFile = (event:any) => {
      const file = event.target.files[0] as File;
      if (file && event.target.files.length > 0 && allowedExtensions.includes(file.type)) {
        setFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0])
        reader.addEventListener("load", () => {
          setImage(reader.result as string);
          changeModalValue();
        });
      }
    }

    const onCrop = async () => {
        if(!image)
        return
        //Cargando
        setUpdateImage(false)

        const canvas = await getCroppedImg(image, cropppedArea); //Imagen croppeada

        setPreview(canvas);


        const listaAux = updateArray(canvas);
        if(user.idResume === undefined){
          //Almaceno el archivo para despues guardarlo en base
          imagesNewUser[indexSlider] = file!
        }
        else{//Si es un usuario existente lo guardo en la base
          await uploadImage(file!, user.idResume, indexSlider + 1); // guardando en la base
          console.log("File: ",File)
          UpdateWithCanvas(canvas); //Update image with canvas
        }

        //seteo las medidas de la imagen
        setUser({...user,[`Imagen${indexSlider+1}`]: canvas});

        /* console.table(user); */
        saveNewImage(listaAux);
        updateLista(listaAux);

        //Termina de Cargar
        setUpdateImage(true)

        changeModalValue();
    }


        // llamo servicio de subida de imagen.
        // seteo la referencia a la imagen en el context y tambien pongo los parametros del canvas en el context

        // guardo el context

    const UpdateWithCanvas = async (canvas:any) => {
        cropImage(canvas, user.idResume,indexSlider + 1 )

    }
    const updateArray = (canvas: string): Lista[] => {
        const newLista: Lista[] = [...lista];
        newLista[indexSlider].croppedImageUrl = canvas;
        return newLista;
    }

    const deleteImage = (): void => {
      if(user.idResume!==undefined){
        cropImage(noImage, user.idResume,indexSlider + 1 )
      }
      const newLista: Lista[] = [...lista];
      newLista[indexSlider].croppedImageUrl = noImage;
      setUser({...user,[`Imagen${indexSlider+1}`]: noImage});//Guardo en el user la nueva foto default

      updateLista(newLista);
      setModalDeleteImage(false)
    }
    return (
        <>
          <div className="image-container">

            {
                modal &&
                      <div className="image-modal">
                        <div className="image-add-box">
                            <ImageResizer auxImage={image} setCroppedArea={setCroppedArea} />
                          </div>
                        <div className="button-area">
                          <button className="btn button-cancel" onClick={() => changeModalValue()}>Cancel</button>
                          {
                            updateImage 
                                ? <button className="btn button-update" onClick={() => onCrop()}>Update</button>
                                : <button style={{'cursor':'default'}} className="btn button-update" disabled={isLoading}>Updating</button>
                                }
                        </div>
                      </div>
            }
            {
                modalDeleteImage &&
                      <DeleteBox 
                        title='Delete Image'
                        message='Are you sure you want to delete your Image?'
                        onCancelClicked={() => setModalDeleteImage(false)}
                        onConfirmClicked={() => deleteImage()}
                      />

            }
            <Slider
              {...settings}
            >
              {
                lista.map((list:any) => (
                  <div key={list.id} className='image-preview'>
                      {
                        (list.croppedImageUrl !== noImage && location.pathname !== '/save' && location.pathname !== '/profile/profileHub') &&
                          <IoMdTrash
                            onClick={() => setModalDeleteImage(true)}
                            className='trash'
                          />
                      }
                      <img src={list.croppedImageUrl} alt="" className="showImage"/>
                     
                      {
                        (lista[indexSlider].croppedImageUrl === noImage && 
                          location.pathname === '/shiduj') &&
                          <label className="button-add-image">
                             <span className='inputImage btn btn__transparent'>Add Image</span>
                             <label>(Optional)</label>
                              <input
                               type="file"
                               style={{ display: "none" }}
                               ref={ fileInputRef }
                               accept="image/*"
                               onChange={onSelectFile}
                             /> 
                           </label>
                        }
                  </div>
               ))}

            </Slider>

          </div>
        </>
    )
}
