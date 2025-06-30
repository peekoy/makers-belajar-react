import { memo } from 'react';
import Button from '../Elements/Button';

// Komponen internal bisa tetap di sini atau dipisah jika lebih kompleks
const Header = ({ image }) => {
  console.log('render header');

  return (
    <img src={image} alt='product' className='p-8 rounded-t-lg h-60 w-full' />
  );
};

const Body = ({ name, children }) => {
  console.log('render body');

  return (
    <div className='px-5 pb-5 h-full'>
      <h5 className='text-xl font-semibold tracking-tight text-white'>
        {name.substring(0, 20)}...
      </h5>
      <p className='text-m text-white'>{children.substring(0, 100)}...</p>
    </div>
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
      <Header image={product.image} />
      <Body name={product.title}>{product.description}</Body>
      <Footer
        id={product.id}
        price={product.price}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
});

// Hapus export terpisah untuk Header, Body, dan Footer jika tidak digunakan di tempat lain
// CardProduct.Header = Header;
// CardProduct.Body = Body;
// CardProduct.Footer = Footer;

export default CardProduct;
