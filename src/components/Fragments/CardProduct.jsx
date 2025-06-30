import { memo } from 'react';
import Button from '../Elements/Button';
import { Link } from 'react-router-dom';

const Header = ({ image, id }) => {
  console.log('render header');

  return (
    <Link to={`/product/${id}`}>
      <img src={image} alt='product' className='p-8 rounded-t-lg h-60 w-full' />
    </Link>
  );
};

const Body = ({ name, children, id }) => {
  console.log('render body');

  return (
    <Link to={`/product/${id}`}>
      <div className='px-5 pb-5 h-full'>
        <h5 className='text-xl font-semibold tracking-tight text-white'>
          {name.substring(0, 20)}...
        </h5>
        <p className='text-m text-white'>{children.substring(0, 100)}...</p>
      </div>
    </Link>
  );
};

const Footer = ({ id, price, handleAddToCart }) => {
  console.log('render footer');

  return (
    <div className='flex items-center justify-between px-5 pb-5'>
      <span className='text-xl font-bold text-white'>
        ${' '}
        {price.toLocaleString('id-ID', { styles: 'currency', currency: 'USD' })}
      </span>
      <Button classname='bg-blue-600' onClick={() => handleAddToCart(id)}>
        Add To Cart
      </Button>
    </div>
  );
};

const CardProduct = memo(({ product, handleAddToCart }) => {
  return (
    <div className='w-full max-w-xs bg-gray-800 border border-gray-700 rounded-lg shadow mx-2 my-2 flex flex-col justify-between'>
      <Header image={product.image} id={product.id} />
      <Body name={product.title} id={product.id}>
        {product.description}
      </Body>
      <Footer
        id={product.id}
        price={product.price}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
});

export default CardProduct;
