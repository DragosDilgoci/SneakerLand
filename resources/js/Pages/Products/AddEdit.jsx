import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

export default function AddEdit({ auth, product, categories }) {
    const [files, setFiles] = useState([]);
    const { data, setData, errors, processing } = useForm({
        name: product?.name || '',
        category_id: product?.category_id || '',
        price: product?.price || '',
        description: product?.description || '',
    });

    const handleFilePondUpdate = (fileItems) => {
        const fileList = fileItems.map(fileItem => fileItem.file);
        setFiles(fileList);
    };

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category_id', data.category_id);
        formData.append('price', data.price);
        formData.append('description', data.description);

        files.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        const url = product ? route('products.post.edit', product.id) : route('products.store');

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }

            window.location.href = route('products.list');
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={product ? 'Edit product' : 'Add product'} />
            <div>
                <div className="py-4 px-4">
                    <div className="text-xl font-bold">
                        {product ? 'Edit product' : 'Add product'}
                    </div>
                    <div className="mt-6 relative">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>
                            <div>
                                <InputLabel htmlFor="category_id" value="Category" />
                                <select
                                    id="category_id"
                                    name="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories?.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError className="mt-2" message={errors.category_id} />
                            </div>
                            <div>
                                <InputLabel htmlFor="price" value="Price" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.price} />
                            </div>
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    name="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>
                            <div> 
                                <InputLabel htmlFor="images" value="Images" />
                                <FilePond
                                    files={files}
                                    onupdatefiles={handleFilePondUpdate}
                                    allowMultiple={true}
                                    maxFiles={5}
                                    server={{
                                        process: {
                                            url: '/upload',
                                            method: 'POST',
                                            headers: {
                                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                            },
                                        },
                                    }}
                                    name="images"
                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                />
                                <InputError className="mt-2" message={errors.images} />
                            </div>
                            <div className="flex items-center gap-4 relative z-40">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}