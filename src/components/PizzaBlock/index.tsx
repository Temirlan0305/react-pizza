import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem, selectCartId } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom';

type PizzaBlockType = { id: string; title: string;  price: number; imageUrl: string; sizes: number[]; types: number[]; }
const PizzaBlock: React.FC<PizzaBlockType> = ({ id, title, price, imageUrl, sizes, types }) => {
   const cartItem = useSelector(selectCartId(id));
   const dispatch = useDispatch();
   const typeNames: string[] = ['Тонкое', 'Традиционное'];
   const [activeType, setActiveType] = React.useState<number>(0);
   const [activeSize, setActiveSize] = React.useState<number>(0);
   const addedCount = cartItem ? cartItem.count : 0;
   const onClickType = (index: number) => {
      setActiveType(index)
   }
   const onClickSize = (index: number) => {
      setActiveSize(index)
   }
   const onClickAddItem = () => {
      const obj = {
         id: id,
         title: title,
         price: price,
         imageUrl: imageUrl,
         sizes: sizes[activeSize],
         types: typeNames[activeType]
      }
      dispatch(addCartItem(obj))
   }
   // const [pizzaCount, setPizzaCount] = React.useState(0)
   // const onClickAddButton = () => {
   //    setPizzaCount(pizzaCount + 1)
   // }

   return (
      <div className="pizza-block-wrapper">
         <div className="pizza-block">
            <Link to={`/pizzas/${id}`}>
               <img
                  className="pizza-block__image"
                  src={imageUrl}
                  alt="Pizza"
               />
            </Link>
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
               <ul>
                  {
                     types.map((typeId) => (
                        <li key={typeId} onClick={() => onClickType(typeId)} className={activeType === typeId ? 'active' : ''}>{typeNames[typeId]}</li>
                     ))
                  }
               </ul>
               <ul>
                  {
                     sizes.map((size, index) => (
                        <li key={size} onClick={() => onClickSize(index)} className={activeSize === index ? 'active' : ''}>{sizes[index]} см.</li>
                     ))
                  }
               </ul>
            </div>
            <div className="pizza-block__bottom">
               <div className="pizza-block__price">от {price} ₽</div>
               <button onClick={onClickAddItem} className="button button--outline button--add">
                  <svg
                     width="12"
                     height="12"
                     viewBox="0 0 12 12"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                     />
                  </svg>
                  <span>Добавить</span>
                  {addedCount > 0 && <i>{addedCount}</i>}
               </button>
            </div>
         </div>
      </div>
   )
}

export default PizzaBlock;
