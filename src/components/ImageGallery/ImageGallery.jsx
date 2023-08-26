import React, { useState , useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'components/Loader/Loader';
import css from './ImageGallery.module.css'


export default function ImageGallery ({imgName}) {
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const fetchImages = ()=> {
      fetch(
          `https://pixabay.com/api/?q=${imgName}&page=${page}&key=35758610-c07349af20f7ea2483391d0b9&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(res => {
            if (res.ok) {
              return res.json();
            }
          })
          .then(images => {
            if (images.hits.length < 1) {
              return Promise.reject(
                new Error(`Sorry, but there are currently no images for your request
                          ${imgName}`)
              );
            }
            if(page > 1){
                setImages((prevImages) => [...prevImages, ...images.hits])
                setStatus('resolved')
                downScroll()
            }
            else {
                  setImages(images.hits)
                  setStatus('resolved')
                  setTotal(images.total)
            }
          })
          .catch(error => {setError(error);setStatus('rejected')})
  }

  useEffect(() => {
    if (imgName) {
      resetState();
      setStatus('pending');
      fetchImages()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgName]);

  useEffect(() => {
    if (page > 1) {
      setStatus('pending');
      fetchImages()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const resetState = () => {
    setPage(1)
    setImages([])
  }  
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
    setPage((prevPage) => prevPage + 1);
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
                {images.map(image => (
                <ImageGalleryItem
                    key={image.id} 
                    imagesLink={image.webformatURL} 
                    imagesBigLink={image.largeImageURL} 
                    imageTag={image.tags} 
                ></ImageGalleryItem>
                ))}
            </ul>
            {total > images.length && (
                <div className={css.loadMore}>
                  <Button onClick={addPage}></Button>
                </div>
              )}

            </>
      );
  }
}

