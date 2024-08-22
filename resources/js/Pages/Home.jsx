import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Home({ auth, products }) {
    console.log(products);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-center items-center py-10 animate-bounce font-bold w-full lg:text-1.40vw md:text-1.5vw text-3vw text-white leading-tight">🌞Summer Sneaker Sale!🌞 Cool off with hot deals! Save up to 50% on the latest styles and top brands. Shop now and step into summer in style!</div>}
        >
            <Head title="SneakerLand - Summer Sale" />

            <div className={'grid grid-cols-4 text-white'}>
                            <div className={'font-bold mb-3'}>ID</div>
                            <div className={'font-bold mb-3'}>Name</div>
                            <div className={'font-bold mb-3'}>Category</div>
                            <div className={'font-bold mb-3'}>Description</div>
                            <div className={'font-bold mb-3'}>Price</div>

                            {currentItems.map((product, index) => (
                                <Fragment key={index}>
                                    <div className={'mb-2'}>{products.id}</div>
                                    <div className={'mb-2'}>{product.name}</div>
                                    <div className={'mb-2'}>{product.category?.name}</div>
                                    <div className={'mb-2'}>{product.description}</div>
                                    <div className={'mb-2'}>{product.price}</div>
                                </Fragment>
                            ))}
            </div>
        </AuthenticatedLayout>
    );
}
