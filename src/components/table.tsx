import clsx from "clsx";
import { NumericFormat } from "react-number-format";
import { capitalizeFirstLetter, pagination } from "../lib/untils";
import { Link, useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ITEM_PER_PAGE } from "../lib/definitions";
import { getAllFromTable } from "../lib/apis";
import PaginationComponent from "./pagination";

const renderImage = (url: string) => {
	return (
		<div className="max-w-12 max-h-12 bg-red-500 m-auto">
			<img src={url}
				alt="thumbnail"
				className="object-covers w-full h-full"
			/>
		</div>
	);
}

const renderTag = (text: string) => {
	return (
		<p className={clsx(
			'font-bold px-2 py-1 rounded-full text-center',
			{ 'bg-watermelon-500 text-white': text === 'admin' },
			{ 'bg-primary-500 text-white': text === 'customer' },
			{ 'bg-warning-400 text-white': text === 'pending' },
		)}>
			{capitalizeFirstLetter(text)}
		</p>
	);
}

const renderMoney = (num: number) => {
	return (
		<NumericFormat
			value={num}
			displayType={'text'}
			thousandSeparator={true}
			suffix=" ₫"
		/>
	);
}

const renderLink = (url: string, text: string) => {
	return (
		<div className="hover:underline font-bold text-black w-48 line-clamp-3">
			<Link to={url}>
				{text}
			</Link>
		</div>
	);
}

function DataTable({ table }: { table: string }) {
	const location = useLocation();
	const [dataList, setDataList] = useState([]);
	const [titleList, setTitleList] = useState<string[]>([]);
	const [keyword, setKeyword] = useState('');
	const [totalRows, setTotalRows] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	const fetchData = async () => {

		const response = await getAllFromTable({
			table: table,
			limit: ITEM_PER_PAGE,
			offset: (currentPage - 1) * ITEM_PER_PAGE,
			keyword: keyword,
			auth: false
		});

		console.log(response);


		if (response['data'].length > 0) {
			setDataList(response['data']);
			setTitleList(Object.keys(response['data'][0]));
			const total = pagination(response['total_rows']);
			setTotalRows(total);
		}
		else {
			setTotalRows(0);
		}
	}

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	useEffect(() => {
		const getDataId = setTimeout(() => {
			fetchData();
			setCurrentPage(1);
		}, 500);

		return () => clearTimeout(getDataId);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyword]);

	const renderByType = (key: string, data: any) => {
		let result = data[key];
		if (key === 'Thumbnail' || key === 'Avatar') {
			result = renderImage(result);
		} else if (key === 'User Type' || key === 'status') {
			result = renderTag(result);
		} else if (key === 'Unit Price' || key === 'Promotional Price' || key === 'Total') {
			result = renderMoney(result);
		} else if (key === 'Name' || key === 'Full Name') {
			result = renderLink(`${location.pathname}/edit?productId=${data['ID']}`, result);
		}

		return result;
	}

	return (
		<div className="mt-8 overflow-hidden w-full">
			<div className="mb-4 w-full">
				<TextField
					value={keyword}
					onChange={(e) => {
						setKeyword(e.target.value);

					}}
					variant="outlined"
					fullWidth
					label='Search by a keyword'
					className="bg-white z-0"
				/>
			</div>

			<div className="relative overflow-x-scroll">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 border shadow-md sm:rounded-lg table-auto">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr className="bg-grey">
							<th scope="col" className="p-4">
								#
							</th>
							{
								titleList.map(title => {
									return (
										<th key={title} scope="col" className={clsx(
											"px-12 py-3 text-center",
											{
												"sticky start-0 bg-inherit": title == 'Name' || title == 'Full Name',
											}
										)}>
											{title}
										</th>
									);
								})
							}
						</tr>
					</thead>
					<tbody>
						{
							dataList.map((data, index) => {
								return (
									<tr key={index} className="bg-white border-b hover:bg-gray-50">
										<td className="w-4 p-4">
											<div className="flex items-center">
												<input id={`checkbox-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
													value={data['ID']}
												/>
												<label htmlFor="checkbox-table-search-1" className="sr-only">
													checkbox
												</label>
											</div>
										</td>
										{
											titleList.map(key => {
												return (
													<th key={key} className={clsx(
														"px-6 py-4 font-normal",
														{
															"sticky start-0 bg-inherit": key === 'Name' || key === 'Full Name',
															"text-center": key === 'ID',
															"text-right": data[key] === 0 || Number(data[key]) && key !== 'ID',
														}
													)}>
														{
															renderByType(key, data)
														}
													</th>
												);
											})
										}
									</tr>
								);
							})
						}
					</tbody>
				</table>
			</div>

			<div className="">
				{/* <table className="text-sm text-left rtl:text-right  text-gray-500 my-4 shadow-md border table-fixed">
					<thead>
						<tr className="text-xs text-black uppercase dark:text-gray-400 text-center">
							{
								titleList.map((title: string) => {
									return (
										<th key={title}
											className={
												clsx(
													"px-6 py-3 bg-inherit  bg-primary-100",
													{ 'sticky left-0': title === 'Name' }
												)}>
											{title}
										</th>
									);
								})
							}
						</tr>

					</thead>
					<tbody>
						{dataList.map((data, i) => {
							return (
								<tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 border-b" key={i}>
									{titleList.map(key => {
										return (
											<td scope="row" key={key}
												className={clsx(
													"px-8 py-4 text-gray-900 dark:text-white bg-inherit lg:whitespace-nowrap",
													{
														"sticky left-0 cursor-pointer font-bold p-0 hover:underline": key === 'Name' || key === 'Full Name'
													},
													{
														"text-right": Number(data[key]) || data[key] === 0
													},
												)}>
												{
													renderByType(key, data)
												}
											</td>
										);
									})}
								</tr>
							);
						})}

					</tbody>
				</table> */}
			</div>
			<div className="mt-4 w-full justify-center flex">
				<PaginationComponent
					totalPage={totalRows}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
}

export default DataTable;