import { FC, useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Product } from '@/interfaces';
import { productService } from '@/services/productService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';

const AdminProducts: FC = () => {
  // ... (All previous state and logic remains exactly the same)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state for add/edit product
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    images: ['', '', ''],
    category: 'ring',
    featured: false,
    inStock: true,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setFormMode('add');
    setFormData({
      name: '',
      description: '',
      price: 0,
      images: ['', '', ''],
      category: 'ring',
      featured: false,
      inStock: true,
    });
    setIsAddEditDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setFormMode('edit');
    // Ensure images array has at least 3 entries
    const images = [...product.images];
    while (images.length < 3) {
      images.push('');
    }
    
    setFormData({
      ...product,
      images,
    });
    setIsAddEditDialogOpen(true);
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) return;
    
    try {
      setIsSubmitting(true);
      const success = await productService.deleteProduct(deleteProductId);
      
      if (success) {
        toast({
          title: 'Product Deleted',
          description: 'The product has been successfully deleted.',
        });
        
        // Update products list
        setProducts(products.filter(product => product.id !== deleteProductId));
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete the product. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setDeleteProductId(null);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate form data
      if (!formData.name || !formData.description || formData.price <= 0) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in all required fields and ensure price is greater than zero.',
          variant: 'destructive',
        });
        return;
      }

      // Filter out empty image URLs
      const filteredImages = (formData.images || []).filter(img => img.trim() !== '');
      
      if (filteredImages.length === 0) {
        toast({
          title: 'Validation Error',
          description: 'Please provide at least one product image URL.',
          variant: 'destructive',
        });
        return;
      }

      // Create or update product
      if (formMode === 'add') {
        const newProduct = await productService.createProduct({
          name: formData.name!,
          description: formData.description!,
          price: formData.price!,
          images: filteredImages,
          category: formData.category as Product['category'],
          featured: formData.featured || false,
          inStock: formData.inStock || true,
        });
        
        setProducts([...products, newProduct]);
        
        toast({
          title: 'Product Added',
          description: 'The new product has been successfully added.',
        });
      } else {
        const updatedProduct = await productService.updateProduct(formData.id!, {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          images: filteredImages,
          category: formData.category as Product['category'],
          featured: formData.featured,
          inStock: formData.inStock,
        });
        
        if (updatedProduct) {
          setProducts(products.map(product => 
            product.id === updatedProduct.id ? updatedProduct : product
          ));
          
          toast({
            title: 'Product Updated',
            description: 'The product has been successfully updated.',
          });
        }
      }
      
      // Close dialog and reset form
      setIsAddEditDialogOpen(false);
    } catch (err) {
      console.error('Error submitting product:', err);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const images = [...(formData.images || [])];
    images[index] = value;
    
    setFormData({
      ...formData,
      images,
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number): string => {
    return `KSH ${price.toLocaleString()}`;
  };

  return (
    <AdminLayout>
      <div className="space-y-8 px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-jewelry-black">Products</h1>
            <p className="text-gray-600">Manage your jewelry collection</p>
          </div>
          <Button
            onClick={handleAddProduct}
            className="bg-jewelry-gold hover:bg-jewelry-darkgold text-white w-full sm:w-auto"
          >
            Add New Product
          </Button>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-[180px]">
            <Select 
              value={categoryFilter} 
              onValueChange={(value) => setCategoryFilter(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="ring">Rings</SelectItem>
                <SelectItem value="necklace">Necklaces</SelectItem>
                <SelectItem value="bracelet">Bracelets</SelectItem>
                <SelectItem value="earring">Earrings</SelectItem>
                <SelectItem value="watch">Watches</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-jewelry-lightgold border-t-jewelry-gold rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button 
              onClick={fetchProducts}
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500 mb-4">No products found</p>
            <Button 
              onClick={handleAddProduct}
              className="bg-jewelry-gold hover:bg-jewelry-darkgold text-white"
            >
              Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="border rounded-md overflow-x-auto">
            <Table className="min-w-[800px] sm:min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] sm:w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead className="hidden xs:table-cell">Price</TableHead>
                  <TableHead className="text-center hidden sm:table-cell">Featured</TableHead>
                  <TableHead className="text-center hidden sm:table-cell">In Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded overflow-hidden bg-gray-100">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-jewelry-black">{product.name}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[150px] xs:max-w-[200px]">
                          {product.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell capitalize">
                      {product.category}
                    </TableCell>
                    <TableCell className="hidden xs:table-cell">{formatPrice(product.price)}</TableCell>
                    <TableCell className="text-center hidden sm:table-cell">
                      {product.featured ? (
                        <span className="inline-block w-3 h-3 bg-jewelry-gold rounded-full"></span>
                      ) : (
                        <span className="inline-block w-3 h-3 bg-gray-200 rounded-full"></span>
                      )}
                    </TableCell>
                    <TableCell className="text-center hidden sm:table-cell">
                      {product.inStock ? (
                        <span className="inline-block px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs sm:text-sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </Button>
                        <AlertDialog open={isDeleteDialogOpen && deleteProductId === product.id} onOpenChange={setIsDeleteDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs sm:text-sm border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() => {
                                setDeleteProductId(product.id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the product "{product.name}". 
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setDeleteProductId(null)}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteProduct}
                                className="bg-red-500 hover:bg-red-600 text-white"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? 'Deleting...' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Add/Edit Product Dialog */}
        <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {formMode === 'add' ? 'Add New Product' : 'Edit Product'}
              </DialogTitle>
              <DialogDescription>
                {formMode === 'add' 
                  ? 'Add a new product to your collection.' 
                  : 'Update the details of your existing product.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmitForm}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Diamond Eternity Ring"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (KSH) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="85000"
                      min="0"
                      step="1"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed description of the product..."
                    className="min-h-[100px] w-full"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={formData.images?.[index] || ''}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          placeholder={`Image URL ${index + 1}${index === 0 ? ' (Primary) *' : ''}`}
                          required={index === 0}
                          className="flex-1"
                        />
                        {formData.images?.[index] && (
                          <div className="flex-shrink-0 w-12 h-12 border rounded overflow-hidden">
                            <img
                              src={formData.images[index]}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=Error';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <p className="text-xs text-gray-500">
                      Please provide image URLs. At least one primary image is required.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ring">Ring</SelectItem>
                        <SelectItem value="necklace">Necklace</SelectItem>
                        <SelectItem value="bracelet">Bracelet</SelectItem>
                        <SelectItem value="earring">Earring</SelectItem>
                        <SelectItem value="watch">Watch</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between md:block space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="featured">Featured Product</Label>
                      <p className="text-sm text-gray-500 hidden md:block">Show on homepage</p>
                    </div>
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleCheckboxChange('featured', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between md:block space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="inStock">In Stock</Label>
                      <p className="text-sm text-gray-500 hidden md:block">Available for booking</p>
                    </div>
                    <Switch
                      id="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) => handleCheckboxChange('inStock', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddEditDialogOpen(false)}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-jewelry-gold hover:bg-jewelry-darkgold text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? (formMode === 'add' ? 'Adding...' : 'Updating...') 
                      : (formMode === 'add' ? 'Add Product' : 'Update Product')}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;