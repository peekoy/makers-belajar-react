import Button from '../components/Elements/Button';
import CardProduct from '../components/Fragments/CardProduct';
import {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProduct';
import withAuth from '../hocs/withAuth';
import { logout } from '../redux/auth/actions';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  deleteSingleCart,
  deleteAllCart,
} from '../redux/cart/actions';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  // const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const products = useProducts();
  const dispatch = useDispatch();
  const totalPriceRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  // const { cart, handleAddToCart, handleDeleteSingleCart, handleDeleteAllCart } =
  //   useCart();
  const cart = useSelector((state) => state.cart);

  // const totalPrice = () => {
  //   console.log('%cCalculating total price...', 'color: orange');
  //   if (products.length > 0 && cart.length > 0) {
  //     return cart.reduce((acc, item) => {
  //       const product = products.find((product) => product.id === item.id);
  //       return acc + product.price * item.qty;
  //     }, 0);
  //   }
  //   return 0;
  // };

  const totalPrice = useMemo(() => {
    console.log('%cCalculating total price...', 'color: orange');
    if (products.length > 0 && cart.length > 0) {
      return cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
    }
    return 0;
  }, [cart, products]);

  // useEffect(() => {
  //   console.log('%cCalculating total price...', 'color: orange');
  //   if (products.length > 0 && cart.length > 0) {
  //     const sum = cart.reduce((acc, item) => {
  //       const product = products.find((product) => product.id === item.id);
  //       return acc + product.price * item.qty;
  //     }, 0);
  //     setTotalPrice(sum);
  //     localStorage.setItem('cart', JSON.stringify(cart));
  //   }
  // }, [cart, products]);

  // ref

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = 'table-row';
    } else {
      totalPriceRef.current.style.display = 'none';
    }
  }, [cart]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  const addToCartHandler = useCallback(
    (id) => {
      console.log('add cart suscces');
      dispatch(addToCart(id));
    },
    [dispatch]
  );

  const deleteSingleCartHandler = useCallback(
    (id) => {
      dispatch(deleteSingleCart(id));
    },
    [dispatch]
  );

  const deleteAllCartHandler = useCallback(() => {
    dispatch(deleteAllCart());
  }, [dispatch]);

  return (
    <>
      <div className='flex justify-end h-20 bg-blue-600 text-white items-center px-10'>
        {user?.username}
        <Button classname='ml-5 bg-black' onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className='flex justify-center py-5'>
        <div className='w-4/6 flex flex-wrap'>
          {products.length > 0 &&
            products.map((product) => (
              <CardProduct
                key={product.id}
                product={product}
                handleAddToCart={addToCartHandler}
              />
            ))}
        </div>
        <div className='w-2/6'>
          <h1 className='text-3xl font-bold text-blue-600 ml-5 mb-2'>Cart</h1>
          <table className='text-left table-auto border-separate border-spacing-x-5'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                cart.map((item) => {
                  const product = products.find(
                    (product) => product.id === item.id
                  );
                  return (
                    <tr key={item.id}>
                      <td>{product.title.substring(0, 20)}...</td>
                      <td>
                        ${' '}
                        {product.price.toLocaleString('id-ID', {
                          styles: 'currency',
                          currency: 'USD',
                        })}
                      </td>
                      <td>{item.qty}</td>
                      <td>
                        ${' '}
                        {(item.qty * product.price).toLocaleString('id-ID', {
                          styles: 'currency',
                          currency: 'USD',
                        })}
                      </td>
                      <td>
                        <Button
                          classname='bg-red-500'
                          type='button'
                          onClick={() => deleteSingleCartHandler(item.id)}
                        >
                          -
                        </Button>
                      </td>
                    </tr>
                  );
                })}

              <tr ref={totalPriceRef}>
                <td colSpan={3}>
                  <b>Total Price</b>
                </td>
                <td>
                  <b>
                    ${' '}
                    {totalPrice.toLocaleString('id-ID', {
                      styles: 'currency',
                      currency: 'USD',
                    })}
                  </b>
                </td>
                <td>
                  <Button
                    classname='bg-red-500'
                    type='button'
                    onClick={() => deleteAllCartHandler()}
                  >
                    Clear
                  </Button>
                </td>
              </tr>
              {cart.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <p>Cart kosong! Tambahkan produk terlebih dahulu!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default withAuth(ProductsPage);
