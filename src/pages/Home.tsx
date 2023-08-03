import React from 'react'
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { setPageNumber, setFillters, selectFilter, selectSearchValue } from '../components/redux/slices/filterSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sortList } from '../components/Sort';
import { fetchPizzas, selectPizzasData } from '../components/redux/slices/pizzas';
import qs from 'qs';

function Home() {
   const { categoryId, sortType, pageNumber } = useSelector(selectFilter);
   const { items, status } = useSelector(selectPizzasData);
   const searchValue = useSelector(selectSearchValue)
   const dispatch = useDispatch();
   const navigate = useNavigate();
   // const { searchValue } = React.useContext(searchContext)
   // const [pageNumber, setPageNumber] = React.useState(1)

   const isSearch = React.useRef(false)
   const isUpdate = React.useRef(false);

   const onChangePagination = (ev: number) => {
      dispatch(setPageNumber(ev))
   }

   const getPizzas = async () => {
      const sortOrder = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
      const sortBy = sortType.sortProperty.replace('-', '');
      const categoryBy = categoryId > 0 ? `&category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';
      // await axios.get(`https://63e07e1d8b24964ae0feef3e.mockapi.io/items?page=${pageNumber}&limit=4${categoryBy}&sortBy=${sortBy}&order=${sortOrder}${search}`).then((res) => {
      //    setItems(res.data);
      //    setIsLoading(!isLoading);
      // }).catch(error => {
      //    console.log('error bro', error)
      // });
      //@ts-ignore
      dispatch(fetchPizzas({
         sortOrder,
         sortBy,
         categoryBy,
         search,
         pageNumber, 
      }))
      window.scrollTo(0, 0)

   }

   React.useEffect(() => {
      if (isUpdate.current) {
         const queryString = qs.stringify({
            categoryId: categoryId,
            sortProperty: sortType.sortProperty,
            pageNumber: pageNumber,
         });
         navigate(`?${queryString}`);
      }
      isUpdate.current = true
   }, [categoryId, sortType, pageNumber]);

   React.useEffect(() => {
      if (window.location.search) {
         const queryParse = qs.parse(window.location.search.substring(1));
         const sortTypeProp = sortList.find(obj => obj.sortProperty === queryParse.sortProperty)
         dispatch(setFillters({
            ...queryParse, sortTypeProp,
         }))
         isSearch.current = true
      }
   }, []);

   React.useEffect(() => {
      window.scrollTo(0, 0);
      if (!isSearch.current) {
         getPizzas();
      }
      isSearch.current = false;
   }, [categoryId, sortType, searchValue, pageNumber]);


   // const pizzas = items.filter((obj) => {
   //    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
   //       return true
   //    }
   //    return false
   // }).map((obj) => <PizzaBlock key={obj.id} {...obj} />)

   const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
   const skeletonBlock = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status === 'error' ? (
            <div className='content__error-info'>
               <h2>Произошло ошибка 😕</h2>
               <p>К сожалению, не удалось получить питцы. Попробуйте повторить попытку позже!</p>
            </div>
         ) : (
            <div className="content__items">
               {status === 'loading' ? skeletonBlock : pizzas}
            </div>
         )
         }
         <Pagination value={pageNumber} onChangePagination={onChangePagination} />
      </div>
   )
}

export default Home