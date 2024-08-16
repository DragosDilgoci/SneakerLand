import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useState} from 'react';

export default function View({auth, product}) {
    // Verify that the URL is correct
    const [mainImage, setMainImage] = useState(product.images[0]?.url || '/default-image-url.jpg');

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Product - ${product.name}`} />
            <div className="py-4 px-6 relative text-customLightblue">
                <div className="flex flex-wrap lg:flex-nowrap">
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <div className="flex flex-col items-center">
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-80 h-80 object-cover mb-4"
                            />
                            <div className="flex space-x-2">
                                {product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-24 h-24 object-cover cursor-pointer"
                                        onClick={() => setMainImage(image.url)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 lg:pl-8 mt-6 lg:mt-0">
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <h2 className="text-2xl font-bold mb-2">{product.category?.name}</h2>
                        <p className="text-xl font-semibold mb-4">{product.price} RON</p>
                        <p className="mb-6">{product.description}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
