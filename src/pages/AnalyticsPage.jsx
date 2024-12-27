import Header from "../components/common/Header";
import OverviewCards from "../components/analytics/OverviewCards";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import DailySalesTrend from "../components/sales/DailySalesTrend";
import ProductPerformance from "../components/analytics/ProductPerformance";
import SalesTrendChart from "../components/products/SalesTrendChart";

const AnalyticsPage = () => {
    return (
        <div className='flex-1 overflow-auto relative bg-gray-900'>
            <Header title={"Dashboard"} />
            <main className='py-6 px-4 lg:px-8'>
                <OverviewCards />
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                    <ChannelPerformance />
                    <DailySalesTrend />
                    <ProductPerformance />
                    <SalesTrendChart />
                </div>
            </main>
        </div>
    );
};

export default AnalyticsPage;