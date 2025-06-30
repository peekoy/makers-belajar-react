import Button from '../components/Elements/Button';
import CardProduct from '../components/Fragments/CardProduct';
import { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { getProducts } from '../services/product.service';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/cartContext';

const ProductsPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const { user, logout, isLoggedIn } = useContext(AuthContext);
  const { cart, handleAddToCart, handleDeleteSingleCart, handleDeleteAllCart } =
    useContext(CartContext);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = '/login';
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, products]);

  // ref
  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = 'table-row';
    } else {
      totalPriceRef.current.style.display = 'none';
    }
  }, [cart]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const addToCartHandler = useCallback(
    (id) => {
      handleAddToCart(id);
    },
    [handleAddToCart]
  );

  const deleteSingleCartHandler = useCallback(
    (id) => {
      handleDeleteSingleCart(id);
    },
    [handleDeleteSingleCart]
  );

  const deleteAllCartHandler = useCallback(() => {
    handleDeleteAllCart();
  }, [handleDeleteAllCart]);

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
              <CardProduct key={product.id}>
                <CardProduct.Header image={product.image}></CardProduct.Header>
                <CardProduct.Body name={product.title}>
                  {product.description}
                </CardProduct.Body>
                <CardProduct.Footer
                  price={product.price}
                  id={product.id}
                  handleAddToCart={() => addToCartHandler(product.id)}
                ></CardProduct.Footer>
              </CardProduct>
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

export default ProductsPage;
