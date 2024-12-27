import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const metricsSummary = [
	{ name: "Total Leads", value: 100 },
	{ name: "Lead Converted", value: 20 },
	{ name: "Lead Qualified", value: 33 },
	{ name: "Contacted", value: 70 },
	{ name: "New Leads", value: 30 },
	{ name: "Lead Lost", value: 17 }
];

const COLORS = [
	"rgba(255, 140, 17, 0.8)", // Total Leads
	"rgba(83, 112, 255, 0.8)", // Lead Converted
	"rgba(66, 255, 66, 0.8)", // Lead Qualified
	"rgba(251, 51, 74, 0.8)",  // Contacted
	"rgba(207, 42, 253, 0.8)", // New Leads
	"rgba(66, 255, 66, 0.8)"  // Lead Lost
];

const calculatePercentage = (value, total) => (value / total) * 100;

const ChannelPerformance = () => {
	const [selectedComponents, setSelectedComponents] = useState(metricsSummary.map(() => true));

	const handleCheckboxChange = (index) => {
		const newSelectedComponents = [...selectedComponents];
		newSelectedComponents[index] = !newSelectedComponents[index];
		setSelectedComponents(newSelectedComponents);
	};

	const totalLeads = metricsSummary[0].value;
	const filteredData = metricsSummary.slice(1).filter((_, index) => selectedComponents[index + 1]).map(metric => ({
		...metric,
		value: calculatePercentage(metric.value, totalLeads)
	}));

	return (
		<motion.div
			className='bg-gray-900 bg-opacity-90 shadow-xl rounded-2xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-2xl font-bold text-gray-100 mb-6 text-center'>
				Leads status
			</h2>
			<div className='mb-4'>
				{metricsSummary.slice(1).map((metric, index) => (
					<label key={index} className='text-gray-100 mr-4'>
						<input
							type='checkbox'
							checked={selectedComponents[index + 1]}
							onChange={() => handleCheckboxChange(index + 1)}
							className='mr-2'
						/>
						{metric.name}
					</label>
				))}
			</div>
			<div
				style={{
					width: "100%",
					height: 350,
					background: "linear-gradient(145deg, #1f2937, #111827)",
					borderRadius: "12px",
					padding: "15px",
				}}
			>
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={filteredData}
							cx='50%'
							cy='50%'
							innerRadius={60}
							outerRadius={100}
							fill='#10B981'
							dataKey='value'
							label={({ name }) => name}
							labelLine={false}
						>
							{filteredData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(17, 24, 39, 0.95)",
								borderRadius: "8px",
								border: "1px solid #374151",
							}}
							itemStyle={{ color: "#E5E7EB" }}
							cursor={{ fill: "rgba(31, 41, 55, 0.5)" }}
						/>
						<Legend
							verticalAlign='bottom'
							align='center'
							formatter={(value, entry) => entry.payload.value.toFixed(2) + '%'}
							wrapperStyle={{
								color: "#D1D5DB",
								fontSize: "14px",
							}}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default ChannelPerformance;
