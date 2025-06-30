import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailProducts } from '../services/product.service';

const DetailProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getDetailProducts(id, (data) => {
      setProduct(data);
    });
  }, [id]);

  console.log([product]);

  return (
    <div>
      <div className='h-100 w-100 k'>
        <img src={product.image} alt={product.title} />
        <p className=''>{product.title}</p>
        <p className=''>{product.price}</p>
      </div>
    </div>
  );
};

export default DetailProductPage;
