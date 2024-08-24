import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Fragment, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import PaginationOutlined from '@/Components/Pagination';

export default function Home({ auth, products }) {
    const { delete: deleteProduct } = useForm({});
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 3;

    const categories = useMemo(() => {
        const uniqueCategories = new Set(products.map(product => product.category?.name || 'No category'));
        return ['All', ...Array.from(uniqueCategories)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = products;

        if (selectedCategory !== 'All') {
            result = result.filter(product => product.category?.name === selectedCategory);
        }

        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return result;
    }, [products, selectedCategory, searchTerm]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const handleDelete = (id) => {
        deleteProduct(route('products.delete', [id]));
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={
                <div className="flex justify-center items-center pt-7 animate-bounce font-bold w-full lg:text-1.40vw md:text-1.5vw text-3vw text-white leading-tight">
                    🌞Summer Sneaker Sale!🌞 Cool off with hot deals! Save up to 50% on the latest styles and top brands. Shop now and step into summer in style!
                </div>
            }>
            <Head title="SneakerLand - Summer Sale" />
            <div className="w-full relative z-40">
                <div className="px-4">
                    <div className='flex flex-row items-center pb-10'>
                        <div className="my-4 relative">
                            <label htmlFor="search" className="mr-2 font-bold">Search by Name:</label>
                            <input
                                id="search"
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="p-2 border rounded"
                                placeholder="Search products..."
                            />
                        </div>
                        <div className="relative">
                        <label htmlFor="category-filter" className="mr-2 font-bold">Filter by Category:</label>
                        <select
                            id="category-filter"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="p-2 border rounded"
                        >
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    </div>
                    <div className="mt-6 z-10 relative">
                        <div className="grid grid-cols-3 gap-4">
                            {currentItems.map((product) => (
                                <div key={product.id} className="bg-blue-300 border-4 border-blue-600 rounded-lg p-4">
                                    <div className="flex items-center justify-center overflow-hidden h-40">
                                        {product.images.length > 0 && (
                                            <img
                                                src={product.images[0].url}
                                                alt=""
                                                className="w-full"
                                                height={200}
                                            />
                                        )}
                                    </div>
                                    <div className="text-lg font-bold px-2 mt-2 leading-7">{product.name}</div>
                                    <div className="px-2 mt-2 text-red-600 font-medium">#{product.category?.name || 'No category'}</div>
                                    <div className="px-2 mt-2 font-medium mb-3">&euro;{product.price}</div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-center mt-6'>
                            <PaginationOutlined 
                                count={totalPages} 
                                page={currentPage} 
                                onChange={handlePageChange} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
