import {useState} from 'react';
import css from './Searchbar.module.css'

export default function Searchbar ({ onSubmit }){
    const [imgName, setImgName] = useState('')
    const inputValue= (e) => {
        setImgName(e.target.value.toLowerCase())
    }
    const formSubmit = (e) => {
        e.preventDefault();
        if (imgName.trim() === '') {
            return;
        }
        onSubmit(imgName);
        setImgName( imgName );
    }
      return(
        <>
            <form className={css.form} onSubmit={formSubmit}>
            <button className={css.button} type="submit">
            <span className={css.span}>&#128269;</span>
            </button>
            <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={imgName}
            onInput={inputValue}
            />
            </form>
        </>
      )
  }