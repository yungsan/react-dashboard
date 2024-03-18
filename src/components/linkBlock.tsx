import { ReactElement } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

interface Data {
    title: any,
    label: string,
    location: string,
    icon: ReactElement<any, any>
    highlightLabel?: boolean,
    isMoney?: boolean
}

function LinkBlock(data: Data) {
    const label =
        <p className='text-sm text-inactive'>{data.label}</p>;

    return (
        <Link
            className="bg-white w-full h-24 flex lg:flex-wrap justify-between items-center px-4 rounded-xl border"
            to={data.location}>
            <div className="">
                {data.icon}
            </div>
            <div className="flex-1 pl-2">
                {
                    data.highlightLabel
                    && label
                }
                <p className='font-bold text-lg'>
                    {
                        data.isMoney != undefined ?
                            <NumericFormat
                                value={data.title}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix=" ₫"
                            />
                            : data.title
                    }
                </p>
                {
                    !data.highlightLabel
                    &&
                    label
                }
            </div>
        </Link>
    );
}

export default LinkBlock;