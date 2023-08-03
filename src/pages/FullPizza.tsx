import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const FullPizza: React.FC = () => {
   const [pizzas, setPizzas] = React.useState<{
      imageUrl: string;
      title: string;
      price: number;
   }>()
   const { id } = useParams()
   React.useEffect(() => {
      async function getPizza() {
         await axios.get('https://63e07e1d8b24964ae0feef3e.mockapi.io/items/' + id).then(response => {
            setPizzas(response.data)
         }).catch((error) => {
            // console.log('error', error.message)
            alert("Ошиюка при получений пиццы!")
         })
      }
      getPizza()
   }, [])
   if (!pizzas) {
      return <>Loading ...</>
   }
   return (
      <div className="pizza-block__wrapper">
         <div className="pizza-block__image">
            <img src={pizzas.imageUrl} alt="" />
         </div>
         <div className="pizza-block__title">{pizzas.title}</div>
         <div className="pizza-block__price">{pizzas.price}</div>
      </div>
   )
};

export default FullPizza;