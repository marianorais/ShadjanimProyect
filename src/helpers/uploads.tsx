import axios from "axios";

export const uploadImage = async ( file: File, idResume: number, imgNumber: number ) => {    
    // Subir Imagen

    //var nombreDeArchivo = ''
    //const url = `http://localhost:9016/Users/upload/${idResume}/${imgNumber}`;
    const formData = new FormData();
    //formData.append('images',file);    
    formData.append('files',file);    
    formData.append('userId', idResume.toString());
    formData.append('imgNumber', imgNumber.toString());
    const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/User/UpdateFile',formData);

    return data;
    
}
export const cropImage = async ( canvas: string, idResume: number, imgNumber: number ) => {    
    // Update Imagen
    var jsonCrop = {imgCrop:canvas,userId:idResume.toString(),imgNumber:imgNumber.toString()}
    const { data } = await axios.post('https://shadjanim.jojma.com.ar/Api/User/UpdateImageBase64',jsonCrop);
    return data;
}

export const deleteImage =  (imgName: string) => {

}