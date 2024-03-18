import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import MyButton from "../../components/button";
import { DEFAULT_IMAGE, EXAMPLE_USER } from "../../lib/definitions";
import Heading from "../../components/heading";
import { createNewProduct, getAllFromTable, getCurrentUser } from "../../lib/apis";
import { capitalizeFirstLetter } from "../../lib/untils";
import AlertDialog from "../../components/alertDialog";

interface Item {
    label: string,
    type: string,
    hint: string,
    width: string,
    value: any,
    setValue: Dispatch<SetStateAction<any>>
}

function New() {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [stock, setStock] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [promotion, setPromotion] = useState<number>(0);
    const [category, setCategory] = useState<string>('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [thumbnail, setThumbnail] = useState<any>(null);
    const [author, setAuthor] = useState(EXAMPLE_USER);
    const [open, setOpen] = useState(false);
    const inputThumbnailRef = useRef<HTMLInputElement>(null);
    const [tempThumbnail, setTempThunbnail] = useState(DEFAULT_IMAGE);
    const [message, setMessage] = useState<{ title: string, content: string }>({
        title: 'Nothing',
        content: 'Nothing',
    });

    useEffect(() => {
        async function fetchCurrentUser() {
            const currentUser = await getCurrentUser();
            setAuthor(currentUser!.data);
        }
        fetchCurrentUser();
    }, []);

    async function fetchCategories() {
        const categories = await getAllFromTable({
            table: 'categories',
            offset: 0,
            limit: 0,
            keyword: category,
            auth: false,
        });
        setCategoriesList(categories['data']);
    }

    useEffect(() => {

        const getDataId = setTimeout(() => {
            fetchCategories();
        }, 500);

        return () => clearTimeout(getDataId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    const items: Item[] = [
        {
            label: 'Product Name',
            type: 'text',
            hint: 'Can\'t be longer than 255 characters',
            width: 'full',
            value: name,
            setValue: setName
        },
        {
            label: 'Price',
            type: 'text',
            hint: 'Must be larger than 200 ₫',
            width: '1/2',
            value: price,
            setValue: setPrice
        },
        {
            label: 'Stock',
            type: 'text',
            hint: 'Must be larger than 0',
            width: '1/2',
            value: stock,
            setValue: setStock
        },
        {
            label: 'Promotion (Optional)',
            type: 'text',
            hint: '50%, 25%, 99%',
            width: '1/2',
            value: promotion,
            setValue: setPromotion
        },
        // {
        //     label: 'Category',
        //     type: 'text',
        //     hint: 'Clothing, Foods, Home & Garden,...',
        //     width: '1/2',
        //     value: category,
        //     setValue: setCategory
        // },
    ];

    const handlInputThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            const file = e.target.files[0];
            setTempThunbnail(URL.createObjectURL(file));
            setThumbnail(file);
        }

    }

    const handleCreate = async () => {
        const formData = new FormData();
        if (!promotion) setPromotion(0);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category.toString());
        formData.append('price', price.toString());
        formData.append('stock', stock.toString());
        formData.append('promotion', promotion.toString());
        formData.append('author', author.id.toString());
        formData.append('thumbnail', thumbnail);
        try {
            const result = await createNewProduct(formData);
            console.log(result);

            setMessage({
                title: 'Create a successful product',
                content: 'You just created a successful product.'
            })
        } catch (error) {
            setMessage({
                title: 'Create a failed product',
                content: 'You just created a failed product.'
            })
        } finally {
            setOpen(true)
        }
    }


    return (
        <div className="block lg:flex justify-between flex-wrap w-full">
            <AlertDialog
                title={message.title}
                content={message.content}
                open={open}
                setOpen={setOpen}
            />

            <Heading text="Create Product" />

            <div className="flex w-full mt-4 items-center">
                <h1 className="font-bold">Author:</h1>
                <div className="bg-watermelon-500 text-white rounded-full py-1 px-4 mx-2 font-bold">
                    {author.full_name}
                </div>
                <div className="bg-primary-500 text-white rounded-full py-1 px-4 font-bold">
                    {capitalizeFirstLetter(author.role)}
                </div>
            </div>

            <div className="flex flex-wrap justify-between gap-y-8 mt-4 w-full lg:w-2/3">
                {
                    items.map((item, index) => {
                        return (
                            <div className={`w-${item.width} pr-3`} key={index}>
                                <label htmlFor="" className="font-bold mb-4 block">
                                    {item.label}
                                </label>
                                <input
                                    type={item.type}
                                    value={item.value}
                                    onChange={(e) => item.setValue(e.target.value)}
                                    placeholder={item.hint}
                                    className={`w-full border outline-0 py-4 px-4 rounded-lg focus:border-primary-500`}
                                />
                            </div>
                        );
                    })
                }
                <div className='w-1/2 pr-3'>
                    <label htmlFor="" className="font-bold mb-4 block">
                        Category
                    </label>
                    <input
                        type='text'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        // onBlur={() => setCategoriesList([])}
                        placeholder='Clothing, Foods, Home & Garden,...'
                        className={`w-full border outline-0 py-4 px-4 rounded-lg focus:border-primary-500  rounded-b-none`}
                    />
                    {categoriesList.length > 0 &&
                        <div className="bg-white max-h-48 border rounded-lg border-t-0 rounded-t-none overflow-y-scroll">
                            {
                                categoriesList.map((c, i) => {
                                    return (
                                        <button
                                            key={i}
                                            className="border-b px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                const value = c['Name'];
                                                setCategory(value);
                                                setCategoriesList([]);
                                            }}
                                        >
                                            {c['Name']}
                                        </button>
                                    );
                                })
                            }
                        </div>
                    }
                </div>
                <div className="w-full mt-8">
                    <label htmlFor="" className="font-bold mb-4 block">
                        Description (Optional)
                    </label>
                    <textarea className="w-full h-screen p-4 border rounded-lg resize-none outline-0 focus:border-primary-500" onChange={(e) => setDescription(e.target.value)} placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit alias qui minus officiis dolorum quam voluptatibus consectetur repudiandae veniam unde vel laudantium, animi itaque sunt commodi. Minima fugit aliquam accusamus?...">
                    </textarea>
                </div>
            </div>

            <div className="w-full lg:w-1/3">
                <label className="w-full font-bold mb-4 block">
                    Thumbnail
                </label>
                <div className="w-full">
                    <div className="w-full min-h-72">
                        <img src={tempThumbnail} alt="thumbnail" className="" />
                        <input type="file" accept="image/*" ref={inputThumbnailRef} hidden onChange={(e) => handlInputThumbnail(e)} />
                        <div className="mt-4 box-border">
                        </div>
                        <MyButton
                            text="Add Thumbnail"
                            rounded="lg"
                            width="full"
                            onClick={() => inputThumbnailRef.current?.click()}
                        />
                    </div>
                </div>
                {/* <div className="flex-1 flex flex-wrap w-full mt-8 gap-y-2 justify-evenly  max-h-96 overflow-scroll">
                    <div className="w-24 h-24 bg-primary-500">
                        <img src={DEFAULT_IMAGE} alt="thumbnail" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-24 h-2w-24 bg-primary-500">
                        <img src={DEFAULT_IMAGE} alt="thumbnail" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-24 h-2w-24 bg-primary-500">
                        <img src={DEFAULT_IMAGE} alt="thumbnail" className="w-full h-full object-cover" />
                    </div>
                </div> */}
                <div className="w-full z-50 my-4 px-2">
                    <MyButton text="Create" width="full" rounded="lg" onClick={handleCreate} />
                </div>
            </div>

        </div>

    );
}

export default New;