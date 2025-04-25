import { FC } from 'react';
import { motion, TargetAndTransition, VariantLabels } from 'framer-motion';
import { Product } from '@/interfaces';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  className?: string;
  initial?: boolean | TargetAndTransition | VariantLabels;
  animate?: TargetAndTransition | VariantLabels;
  transition?: object;
}

const ProductCard: FC<ProductCardProps> = ({ 
  product, 
  featured = false,
  className,
  initial,
  animate,
  transition
}) => {
  const navigate = useNavigate();

  const formatPrice = (price: number): string => {
    return `KSH ${price.toLocaleString()}`;
  };

  const viewProduct = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <motion.div 
      initial={initial || { opacity: 0, y: 20 }}
      animate={animate || { opacity: 1, y: 0 }}
      transition={transition || { duration: 0.4 }}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`overflow-hidden transition-all duration-300 group ${
          featured ? 'border-jewelry-gold' : 'border-gray-200'
        } relative shadow-sm hover:shadow-xl`}
      >
        {/* Image Container with Hover Overlay */}
        <CardContent className="p-0 relative">
          <AspectRatio ratio={1 / 1} className="bg-gray-100 overflow-hidden">
            <motion.div
              className="relative h-full w-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </AspectRatio>

          {/* Animated Content Overlay */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-4 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -10 }}
          >
            <h3 className="font-serif text-xl font-bold tracking-tight truncate drop-shadow-lg">
              {product.name}
            </h3>
            <p className="mt-1 text-sm line-clamp-2 font-medium text-gray-200 group-hover:text-white transition-colors">
              {product.description}
            </p>
          </motion.div>
        </CardContent>

        {/* Product Details */}
        <div className="p-4 space-y-2">
          <motion.p
            className="font-medium text-jewelry-gold text-lg"
            whileHover={{ scale: 1.05 }}
          >
            {formatPrice(product.price)}
          </motion.p>
        </div>

        {/* Animated Button */}
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="outline" 
            onClick={viewProduct}
            className="w-full border-jewelry-gold text-jewelry-gold hover:bg-jewelry-gold hover:text-white transition-all duration-300 relative overflow-hidden"
          >
            <span className="flex items-center justify-center gap-2">
              View Details
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                className="inline-block"
              >
                <ArrowRightIcon className="w-4 h-4" />
              </motion.span>
            </span>
            
            {/* Gold Bar Animation */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-jewelry-gold"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;