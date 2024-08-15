import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useState} from 'react';

export default function AddEdit({auth, product, categories}) {
    const [images, setImages] = useState([]);
    const {data, setData, post, errors, processing} = useForm({
        name: product?.name || '',
        category_id: product?.category_id || '',
        price: product?.price || '',
        description: product?.description || '',
    });

    const handleFileChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category_id', data.category_id);
        formData.append('price', data.price);
        formData.append('description', data.description);

        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        let productRoute = product ? route('products.store', [product.id]) : route('products.store');
        post(productRoute, {
            data: formData,
            preserveState: true,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={product ? 'Edit product' : 'Add product'}/>
            <div>
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>{product ? 'Edit product' : 'Add product'}</div>

                    <div className="mt-6 relative">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name"/>
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                />
                                <InputError className="mt-2" message={errors.name}/>
                            </div>
                            <div>
                                <InputLabel htmlFor="category_id" value="Category"/>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories && categories.length > 0 && categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError className="mt-2" message={errors.category_id}/>
                            </div>
                            <div>
                                <InputLabel htmlFor="price" value="Price"/>
                                <TextInput
                                    id="price"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.price}/>
                            </div>
                            <div>
                                <InputLabel htmlFor="description" value="Description"/>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.description}/>
                            </div>
                            <div>
                                <InputLabel htmlFor="images" value="Images"/>
                                <input
                                    id="images"
                                    type="file"
                                    className="mt-1 block w-full text-customLightblue"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <InputError className="mt-2" message={errors.images}/>
                            </div>
                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
