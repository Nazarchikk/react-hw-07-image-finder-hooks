import React,{useState} from 'react';
import css from './ImageGalleryItem.module.css'
import Modal from "../Modal/Modal";

export default function ImageGalleryItem ({  imagesLink , imagesBigLink , imageTag}) {

    const [showModal, setShowModal] = useState(false)
    const fff = () => {
        setShowModal(!showModal);
      };
        return(
            <>
                <li className={css.liImg} 
                onClick={fff}
                >
                    <img className={css.img} src={imagesLink} alt={imageTag} />
                </li>
                {showModal && 
                <Modal imgBigSrc={imagesBigLink} imgTag={imageTag} onClose={fff}
                />
                }
            </>
        )
    }

