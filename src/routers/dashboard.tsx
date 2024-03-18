import { LineChart } from "@mui/x-charts";
import Heading from "../components/heading";

function Dashboard() {
    return (
        <div className='w-full flex flex-wrap'>
            <div className="w-full">
                <Heading text="Revenue" />
                <div className="bg-white mt-4">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        height={400}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
