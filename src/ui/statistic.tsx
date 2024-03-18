import { ReactElement } from "react";
import LinkBlock from "../components/linkBlock";

interface Data {
    title: any,
    label: string,
    location: string,
    icon: ReactElement<any, any>
    highlightLabel?: boolean,
    isMoney?: boolean
}

function Statistic({ items }: { items: Data[] }) {
    return (
        <div className="w-full flex lg:flex-wrap overflow-x-scroll md:overflow-auto mb-4 gap-y-4 sticky top-0">
            {
                items.map((item, index) => {
                    return (
                        <div className="w-auto md:w-1/4 pr-4 box-border" key={index}>
                            <LinkBlock
                                title={item.title.toString()}
                                label={item.label}
                                location={item.location}
                                icon={item.icon}
                                highlightLabel={true}
                                isMoney={item.isMoney}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Statistic;