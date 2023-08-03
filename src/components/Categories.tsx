import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCategoryId, setCategoryId } from './redux/slices/filterSlice'

const Categories: React.FC = () => {
   const categoryId = useSelector(selectCategoryId);
   const dispatch = useDispatch();

   const categories = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые',
   ]

   return (
      <div className="categories">
         <ul>
            {categories.map((categoryName, id) => (
               <li key={id} onClick={() => dispatch(setCategoryId(id))} className={id === categoryId ? 'active' : ''}>
                  {categoryName}
               </li>
            ))}
         </ul>
      </div >
   );
}

export default Categories;