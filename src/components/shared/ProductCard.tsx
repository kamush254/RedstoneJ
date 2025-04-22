
import { FC } from 'react';
import { Product } from '@/interfaces';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ product, featured = false }) => {
  const navigate = useNavigate();

  const formatPrice = (price: number): string => {
    return `KSH ${price.toLocaleString()}`;
  };

  const viewProduct = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${
        featured ? 'border-jewelry-gold' : 'border-gray-200'
      }`}
    >
      <CardContent className="p-0">
        <AspectRatio ratio={1 / 1} className="bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
          />
        </AspectRatio>
        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold tracking-tight text-jewelry-black truncate">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{product.description}</p>
          <p className="mt-2 font-medium text-jewelry-gold">
            {formatPrice(product.price)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          variant="outline" 
          onClick={viewProduct}
          className="w-full border-jewelry-gold text-jewelry-gold hover:bg-jewelry-gold hover:text-white transition-colors"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
