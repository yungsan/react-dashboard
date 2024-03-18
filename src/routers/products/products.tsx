import { useLocation } from "react-router-dom";
import { Add, Chart } from "iconsax-react";
import { Suspense, lazy } from "react";
import Heading from "../../components/heading";
import Statistic from "../../ui/statistic";
const Table = lazy(() => import('../../components/table'));

function Products() {
    const location = useLocation();
    const items = [
        {
            title: "Add new product",
            label: "Create a new product",
            location: `${location.pathname}/new`,
            isMoney: false,
            highlightLabel: false,
            icon: <Add
                size={50}
                className="p-2 text-primary-500 bg-primary-50 rounded-full" />
        },
        {
            title: 69,
            label: "Total product",
            location: `${location.pathname}/new`,
            highlightLabel: true,
            icon: <Chart
                size={50}
                className="p-2 text-watermelon-500 bg-watermelon-50 rounded-full" />
        },
    ];
    return (
        <div className="mt-8">
            <Statistic items={items} />
            <div className="w-full">
                <Heading text="Latest Products" />
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Table table="products" />
                </Suspense>
            </div>
        </div>
    )
}

export default Products;