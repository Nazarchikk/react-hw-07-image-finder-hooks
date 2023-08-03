import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'

export default function App (){
  const [imgName, setImgName] = useState('')
  const handleFormSubmit = imgName => {
     setImgName( imgName );
  };

    return(
      <>
        <Searchbar onSubmit={handleFormSubmit}></Searchbar>
        <ImageGallery imgName={imgName}></ImageGallery>
      </>
    )
}
