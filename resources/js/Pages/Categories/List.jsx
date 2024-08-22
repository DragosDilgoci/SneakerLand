import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import PaginationOutlined from '@/Components/Pagination';

export default function List({ auth, categories }) {
    const { delete: deleteCategory } = useForm({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(categories.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

    const handleDelete = (id) => {
        deleteCategory(route('categories.delete', [id]));
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Category list" />
            <div className="w-full">
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>Categories</div>

                    <div className={'flex justify-end w-5/6 my-2 relative text-customPurple'}>
                        <Link href={route('categories.create')}>
                            <FontAwesomeIcon icon={faPlus} /> Add new category
                        </Link>
                    </div>

                    <div className="mt-6 z-10 relative">
                        <div className={'grid grid-cols-4 text-white'}>
                            <div className={'font-bold mb-3'}>ID</div>
                            <div className={'font-bold mb-3'}>Name</div>
                            <div className={'font-bold mb-3'}>Order</div>
                            <div className={'font-bold mb-3'}>Actions</div>

                            {currentItems.map((category, index) => (
                                <Fragment key={index}>
                                    <div className={'mb-2'}>{category.id}</div>
                                    <div className={'mb-2'}>{category.name}</div>
                                    <div className={'mb-2'}>{category.order}</div>
                                    <div className={'mb-2'}>
                                        <Link href={route('categories.update', [category.id])}>
                                            <FontAwesomeIcon icon={faPencil} className={'text-customLightblue'} />
                                        </Link>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleDelete(category.id);
                                        }} className="inline ml-2">
                                            <button type="submit">
                                                <FontAwesomeIcon icon={faTrash} className={'text-customPurple'} />
                                            </button>
                                        </form>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                        <div className='flex justify-center mt-6'>
                        <PaginationOutlined 
                            count={totalPages} 
                            page={currentPage} 
                            onChange={handlePageChange} 
                        /></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
