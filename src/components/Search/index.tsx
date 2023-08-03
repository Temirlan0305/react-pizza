import React from 'react';
import styles from './Search.module.scss'

import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, selectSearchValue } from '../redux/slices/filterSlice';


const Search = () => {
   const dispatch = useDispatch()
   const searchValue = useSelector(selectSearchValue)
   const [value, setValue] = React.useState('')
   const inputBlock = React.useRef<HTMLInputElement>(null);

   const onClickClear = () => {
      dispatch(setSearchValue(''))
      setValue('')
      if (inputBlock) {
         inputBlock.current?.focus();
      }
   }

   const onUpdateDebounce = React.useCallback(
      debounce((str: string) => {
         dispatch(setSearchValue(str))
      }, 250),
      [],
   )

   const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
      onUpdateDebounce(event.target.value)
   }

   return (
      <div className={styles.root}>
         <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_" />
         </svg>
         <input ref={inputBlock} value={value} onChange={(event) => { onChangeSearch(event) }} className={styles.input} placeholder='Поиск пиццы ...' />
         {searchValue && <svg onClick={() => { onClickClear() }} className={styles.closed} xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 16 16" width="16"><polygon fillRule="evenodd" points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414" /></svg>}
      </div>
   );
};
export default Search;