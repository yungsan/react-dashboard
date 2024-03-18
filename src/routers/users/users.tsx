import { Suspense, lazy } from "react";
import Heading from "../../components/heading";
const Table = lazy(() => import('../../components/table'));


function Users() {
    return (
        <div className="mt-8">
            <div className="w-full">
                <div className="mb-8">
                    <Heading text="New Accounts" />
                </div>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Table table="users" />
                </Suspense>
            </div>
        </div>
    );
}

export default Users;