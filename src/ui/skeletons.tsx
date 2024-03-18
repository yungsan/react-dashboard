/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TableSkeleton() {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2">STT</th>
                    <th className="px-4 py-2">Tên</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Số điện thoại</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">
                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                        <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                </tr>
                <tr>
                    <td className="px-4 py-2">2</td>
                    <td className="px-4 py-2">
                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                        <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                </tr>
                <tr>
                    <td className="px-4 py-2">3</td>
                    <td className="px-4 py-2">
                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                        <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
