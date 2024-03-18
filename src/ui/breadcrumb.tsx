import { capitalizeFirstLetter } from "../lib/untils";

function Breadcrumb({
    pages
}: {
    pages: string[]
}) {

    return (<nav className="flex mb-8" aria-label="Breadcrumb">
        {
            pages.map((page, index) => {
                return (
                    <div className="flex items-center text-gray-400" key={index}>
                        /
                        <a href="#" className="ms-1 text-md font-medium hover:text-blue-600 md:ms-2 dark:hover:text-white">
                            {capitalizeFirstLetter(page)}
                        </a>
                        <span>&nbsp;</span>
                    </div>
                );
            })
        }
    </nav>
    );
}

export default Breadcrumb;