import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Home({ auth, products }) {
    console.log(products);

    const productList = products?.data || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-center items-center py-10 animate-bounce font-bold w-full lg:text-1.40vw md:text-1.5vw text-3vw text-white leading-tight">
                    🌞Summer Sneaker Sale!🌞 Cool off with hot deals! Save up to 50% on the latest styles and top brands. Shop now and step into summer in style!
                </div>
            }
        >
            <Head title="SneakerLand - Summer Sale" />

            <div className="container mx-auto relative z-40">
                <h1 className="text-3xl mt-6 mb-4 text-white">Products</h1>
                <div className="grid grid-cols-3 gap-4 relative z-40">
                    {productList.map((product) => (
                        <div className="w-full p-4" key={product.id}>
                            <div className="bg-blue-300 border-4 border-blue-600 rounded-lg">
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
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    {products?.links?.map((link, key) => (
                        <Fragment key={key}>
                            {link.url && !link.active && (
                                <Link className="bg-blue-500 p-2 text-white mr-2" href={link.url}>
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Link>
                            )}
                            {link.url && link.active && (
                                <span className="bg-gray-500 p-2 text-white mr-2">{link.label}</span>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
