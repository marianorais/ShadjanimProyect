const createImage = (url:any) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

function getRadianAngle(degreeValue:any) {
	return (degreeValue * Math.PI) / 180;
}
export const dataURLtoFile = (dataurl:any, filename:any) => {
	const arr = dataurl.split(",");
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (n--) u8arr[n] = bstr.charCodeAt(n);

	return new File([u8arr], filename, { type: mime });
};
export default async function getCroppedImg(imageSrc:any, pixelCrop:any, rotation = 0) {
	const image:any = await createImage(imageSrc);
	const canvas = document.createElement("canvas");
	const ctx:any = canvas.getContext("2d");
	console.log("pixelcrop",pixelCrop)
	const maxSize = Math.max(image.width, image.height);
	 const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
	//const safeArea = 1800
	
	// set each dimensions to double largest dimension to allow for a safe area for the
	// image to rotate in without being clipped by canvas context
	canvas.width = image.width;
	canvas.height = image.height;
	// translate canvas context to a central location on image to allow rotating around the center.
	ctx.translate(image.width, image.height);
//	ctx.rotate(getRadianAngle(rotation));
	// if(pixelCrop.width>500){
	// 	console.log('zoom')
	// 	ctx.scale(0.80,1)
	// }
	ctx.translate(-image.width, -image.height);

	
	// draw rotated image and store data.
	ctx.drawImage(
	  image,
	  0,//maxSize * 0.125 - image.width * 0.125,
	  0//maxSize * 0.125 - image.height * 0.125
	);

	const data = ctx.getImageData(pixelCrop.x,pixelCrop.y, pixelCrop.width,pixelCrop.height);
		
	// set canvas width to final desired crop size - this will clear existing context
	// canvas.width = image.height;
	// canvas.height =image.width;
	console.log("pixelCrop: ",pixelCrop)

	const modalWidth =   360
	const modalHeight =   230
	const conteinerlWidth =   333
	const conteinerHeight =   380

	const escalaWidth = conteinerlWidth / pixelCrop.width 
	const escalaHeight = conteinerHeight / pixelCrop.height
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	const relacionWidth = 333 / pixelCrop.with
  
	// canvas.height = pixelCrop.height * escalaHeight
	// canvas.width = pixelCrop.width * escalaWidth

	// if(image.width>image.height)
	// {
	// canvas.height=image.height*333/image.width
	// canvas.width=333
	// }
	// else
	// {
	// 	canvas.width=image.width*380/image.height
	// 	canvas.height=380
	// }

	// if(image.width > image.height){
	// 	console.log("Maxima Ancho", image.width, image.height)
	// 	ctx.scale(0.1,0.1)
	// }
	// else{
	// 	console.log("maxima Alto", image.width, image.height)
	// 	ctx.scale(pixelCrop.width/333,pixelCrop.width/333)
	// }
  
	// paste generated rotate image with correct offsets for x,y crop values.
	ctx.putImageData(
		data,
		0,
		0		
	  );

	//ctx.scale(0.3,1)
	//ctx.scale(relacionWidth,relacionWidth)

	// As Base64 string
	// return 
	const base64Image = canvas.toDataURL("image/jpeg");
  	return base64Image;
}
