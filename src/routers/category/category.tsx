import { Suspense, lazy } from "react";
import Heading from "../../components/heading";
const Table = lazy(() => import('../../components/table'));

function Category() {

    return (
        <div className="mt-8">
            <div className="w-full">
                <div className="mb-8">
                    <Heading text="Categories" />
                </div>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Table table="categories" />
                </Suspense>
            </div>
        </div>
    );
}

export default Category;