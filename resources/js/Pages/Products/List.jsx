import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

export default function List({ auth, products }) {
    const { delete: deleteProduct } = useForm({});

    const handleDelete = (id) => {
        deleteProduct(route('products.delete', [id]));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Product list" />
            <div className="w-full">
                <div className="py-4 px-4">
                    <div className="text-xl font-bold">Products</div>

                    <div className="flex justify-end w-5/6 my-2 relative text-customPurple">
                        <Link href={route('products.create')}>
                            <FontAwesomeIcon icon={faPlus} /> Add new products
                        </Link>
                    </div>

                    <div className="mt-6 z-10 relative">
                        <div className="grid grid-cols-5 text-white">
                            <div className="font-bold mb-3">ID</div>
                            <div className="font-bold mb-3">Name</div>
                            <div className="font-bold mb-3">Category</div>
                            <div className="font-bold mb-3">Description</div>
                            <div className="font-bold mb-3">Actions</div>

                            {products.map((product, index) => (
                                <Fragment key={index}>
                                    <div className="mb-2">{product.id}</div>
                                    <div className="mb-2">{product.name}</div>
                                    <div className="mb-2">{product.category?.name || 'No category'}</div>
                                    <div className="mb-2">{product.description}</div>
                                    <div className="mb-2 flex space-x-2">
                                        <Link href={route('products.view', [product.id])}>
                                            <FontAwesomeIcon icon={faEye} className="text-customGreen" />
                                        </Link>
                                        <Link href={route('products.update', [product.id])}>
                                            <FontAwesomeIcon icon={faPencil} className="text-customLightblue" />
                                        </Link>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleDelete(product.id);
                                            }}
                                            className="inline ml-2"
                                        >
                                            <button type="submit">
                                                <FontAwesomeIcon icon={faTrash} className="text-customPurple" />
                                            </button>
                                        </form>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
