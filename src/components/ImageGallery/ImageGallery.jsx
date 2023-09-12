import React, { useState , useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'components/Loader/Loader';
import css from './ImageGallery.module.css'


export default function ImageGallery ({imgName}) {
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  const [perPage, setPerPage] = useState(0)
  const fetchImages = imgNames => {
      setStatus('pending');
      setPerPage(12)
      fetch(
          `https://pixabay.com/api/?q=${imgNames}&key=35758610-c07349af20f7ea2483391d0b9&image_type=photo&orientation=horizontal&per_page=200`
        )
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(new Error('Image not found'));
          })
          .then(data => {
            setImages([...data.hits]);
            setStatus('resolved');
            setError(false);
          })
          .catch(error => {setError(error);setStatus('rejected')})
  }

  useEffect(() => {
    if (imgName) {
      fetchImages(imgName)
    }
  }, [imgName]);
  const downScroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 0);
  }
  const addPage = () => {
    setPerPage(perPage => perPage + 12)
    downScroll()
  };
    if (status === 'pending') {
      return <div className={css.Loader}><Loader></Loader></div>;
    }
    if (status === 'rejected') {
      return <h1 className={css.error}>{error.message}</h1>;
    }
    if (status === 'resolved') {
        return (
            <>
            <ul className={css.gallery}>
            {images.length > 0 ? (
                images
                  .slice(0, perPage)
                  .map(image => (
                  <ImageGalleryItem
                      key={image.id} 
                      imagesLink={image.webformatURL} 
                      imagesBigLink={image.largeImageURL} 
                      imageTag={image.tags} 
                  ></ImageGalleryItem>
                  ))
              ):(
                <h1>Sorry, we do not have the image for your request</h1>
              )}
            </ul>
            {images.length > 12&& (
                <div className={css.loadMore}>
                  <Button onClick={addPage}></Button>
                </div>
              )}

            </>
      );
  }
}

