import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const metricsSummary = [
	{ componentName: "Total Leads", value: 56874 },
	{ componentName: "Lead Converted", value: 5674 },
	{ componentName: "Lead Qualified", value: 5684 },
	{ componentName: "Contacted", value: 5874 },
	{ componentName: "New Leads", value: 5684 },
	{ componentName: "Lead Lost", value: 56874 }
];



const DailySalesTrend = () => {
	const [selectedMetrics, setSelectedMetrics] = useState(metricsSummary.map(() => true));

	const handleCheckboxChange = (index) => {
		const newSelectedMetrics = [...selectedMetrics];
		newSelectedMetrics[index] = !newSelectedMetrics[index];
		setSelectedMetrics(newSelectedMetrics);
	};

	const filteredMetrics = metricsSummary.filter((_, index) => selectedMetrics[index]);

	return (
		<motion.div
			className='bg-gray-900 bg-opacity-90 shadow-xl rounded-2xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-2xl font-bold text-gray-100 mb-4 text-center'>
				Metrics Summary
			</h2>

			<div className='mb-4 flex flex-wrap'>
				{metricsSummary.map((metric, index) => (
					<div key={metric.componentName} className='flex items-center mb-2 mr-4'>
						<input
							type='checkbox'
							checked={selectedMetrics[index]}
							onChange={() => handleCheckboxChange(index)}
							className='mr-2'
						/>
						<label className='text-gray-100'>{metric.componentName}</label>
					</div>
				))}
			</div>

			<div
				style={{
					width: "100%",
					height: 300,
					background: "linear-gradient(145deg, #1f2937, #111827)",
					borderRadius: "12px",
					padding: "10px",
				}}
			>
				<ResponsiveContainer>
					<BarChart data={filteredMetrics}>
						<CartesianGrid
							strokeDasharray='3 3'
							stroke='#4B5563'
							opacity={0.5}
						/>
						<XAxis
							dataKey='componentName'
							stroke='#D1D5DB'
							tick={{ fill: "#D1D5DB", fontSize: 12 }}
							tickLine={false}
						/>
						<YAxis
							stroke='#D1D5DB'
							tick={{ fill: "#D1D5DB", fontSize: 12 }}
							tickLine={false}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(17, 24, 39, 0.95)",
								border: "1px solid #374151",
								borderRadius: "8px",
								color: "#E5E7EB",
							}}
							itemStyle={{ color: "#E5E7EB" }}
							cursor={{ fill: "rgba(31, 41, 55, 0.5)" }}
						/>
						<Bar
							dataKey='value'
							fill='url(#gradient)'
							barSize={20}
							radius={[10, 10, 0, 0]}
						/>
						<defs>
							<linearGradient id='gradient' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='0%' stopColor='#34D399' />
								<stop offset='100%' stopColor='#059669' />
							</linearGradient>
						</defs>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default DailySalesTrend;
