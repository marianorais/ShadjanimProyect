import React,{useState,useCallback} from 'react';
//import Slider from "@material-ui/core/Slider"; Fijarse si utilizarlo
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";

interface ImageResizerProps {
    auxImage?: string;
    setCroppedArea: (area: Area) => void;
}

export const ImageResizer: React.FC<ImageResizerProps> = ({ auxImage, setCroppedArea}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    /* console.log(croppedArea, croppedAreaPixels); */
    setCroppedArea(croppedAreaPixels)
  },[]);
//<img src={auxImage} alt="" />
  const reSizeZoom = () =>{

  } 
  const CONTAINER_HEIGHT = 180;
return (
    <div className="App">
    <div className="crop-container">
    <Cropper
    //Aspet Width= 413 & Height=310
      image={auxImage}
      crop={crop}
      //rotation={rotation}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      //onRotationChange={setRotation}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      onMediaLoaded={mediaSize => {
        // Adapt zoom based on media size to fit max height
        // setZoom(CONTAINER_HEIGHT / mediaSize.naturalHeight)
      }}
    />
    </div>
    </div>
  )
}
