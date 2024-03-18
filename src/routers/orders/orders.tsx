import { Chart, Diagram, MoneyRecive, MoneySend, TruckFast, TruckRemove, TruckTick, TruckTime } from "iconsax-react";
import { Suspense, lazy } from "react";
import Heading from "../../components/heading";
import Statistic from "../../ui/statistic";
const Table = lazy(() => import('../../components/table'));

function Orders() {
    const items = [
        {
            title: 69,
            label: 'Total Orders',
            location: '#',
            icon: <Chart
                size={50}
                variant="Bold"
                className="p-2 text-watermelon-500 bg-watermelon-50 rounded-full" />
        },
        {
            title: 69,
            label: 'Orders Today',
            location: '#',
            icon: <Diagram
                size={50}
                variant="Outline"
                className="p-2 text-primary-400 bg-primary-50 rounded-full" />
        },
        {
            title: 43516000,
            isMoney: true,
            label: 'Revenue',
            location: '#',
            icon: <MoneySend
                size={50}
                variant="Outline"
                className="p-2 text-warning-400 bg-warning-50 rounded-full" />
        },
        {
            title: 17477089,
            isMoney: true,
            label: 'Profit',
            location: '#',
            icon: <MoneyRecive
                size={50}
                variant="Outline"
                className="p-2 text-success-400 bg-success-50 rounded-full" />
        },
        {
            title: 69,
            label: 'Pending',
            location: '#',
            icon: <TruckTime
                size={50}
                variant="Bold"
                className="p-2 text-warning-500 bg-warning-50 rounded-full" />
        },
        {
            title: 0,
            label: 'Shipping',
            location: '#',
            icon: <TruckFast
                size={50}
                variant="Bold"
                className="p-2 text-info-500 bg-info-50 rounded-full" />
        },
        {
            title: 0,
            label: 'Delivered',
            location: '#',
            icon: <TruckTick
                size={50}
                variant="Bold"
                className="p-2 text-success-500 bg-success-50 rounded-full" />
        },
        {
            title: 0,
            label: 'Cancelled',
            location: '#',
            icon: <TruckRemove
                size={50}
                variant="Bold"
                className="p-2 text-seconadary-500 bg-seconadary-50 rounded-full" />
        },
    ];

    return (
        <div className="mt-8">
            <Statistic items={items} />
            <div className="w-full">
                <div className="mb-8">
                    <Heading text="Latest Products" />
                </div>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Table table="orders" />
                </Suspense>
            </div>
        </div>
    )
}

export default Orders;