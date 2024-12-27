import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const dataMap = {
	"Total Leads": {
		"componentName": "Total Leads",
		"data": {
			"value": 56874,
			"frequency": [120, 150, 110, 180, 140, 170, 130, 200, 160, 190, 150, 210, 170, 230],
			"labels": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	},
	"Contacted": {
		"componentName": "Contacted",
		"data": {
			"value": 56874,
			"frequency": [100, 130, 90, 160, 120, 150, 110, 180, 140, 170, 130, 190, 150, 210],
			"labels": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	},
	"New Leads": {
		"componentName": "New Leads",
		"data": {
			"value": 56874,
			"frequency": [90, 110, 70, 140, 100, 130, 80, 160, 120, 150, 100, 170, 130, 190],
			"labels": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	},
	"Lead Lost": {
		"componentName": "Lead Lost",
		"data": {
			"value": 56874,
			"frequency": [60, 80, 50, 100, 70, 90, 60, 120, 80, 110, 70, 130, 90, 150],
			"labels": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	},
	"Lead Qualified": {
		"componentName": "Lead Qualified",
		"data": {
			"value": 56874,
			"frequency": [30, 50, 20, 70, 40, 60, 30, 90, 50, 80, 40, 100, 60, 110],
			"labels": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	},
	"Lead Converted": {
		"componentName": "Lead Converted",
		"data": {
			"value": 56874,
			"frequency": [10, 20, 15, 25, 18, 22, 12, 30, 16, 28, 14, 32, 20, 35],
			"labels": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	}
};

const SalesTrendChart = () => {
	const [selectedComponents, setSelectedComponents] = useState(Object.keys(dataMap));

	const handleCheckboxChange = (component) => {
		setSelectedComponents((prevState) =>
			prevState.includes(component)
				? prevState.filter((item) => item !== component)
				: [...prevState, component]
		);
	};

	const chartData = dataMap["Total Leads"].data.labels.map((label, index) => {
		const dataPoint = { label };
		Object.keys(dataMap).forEach((key) => {
			dataPoint[key] = dataMap[key].data.frequency[index];
		});
		return dataPoint;
	});

	return (
		<motion.div
			className="bg-gray-900 bg-opacity-60 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-700"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className="text-2xl font-bold text-gray-100 mb-6 text-center"> Lead Trends </h2>
			<div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-3 lg:grid-cols-4">
				{Object.keys(dataMap).map((key) => (
					<label
						key={key}
						className="flex items-center text-gray-200 cursor-pointer hover:text-gray-50"
					>
						<input
							type="checkbox"
							checked={selectedComponents.includes(key)}
							onChange={() => handleCheckboxChange(key)}
							className="mr-2 accent-blue-500 focus:ring focus:ring-blue-300"
						/>
						{dataMap[key].componentName}
					</label>
				))}
			</div>
			<div className="w-full h-[350px]">
				<ResponsiveContainer>
					<LineChart data={chartData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
						<XAxis dataKey="label" stroke="#9CA3AF" />
						<YAxis stroke="#9CA3AF" />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(17, 24, 39, 0.8)",
								borderColor: "#374151",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend
							wrapperStyle={{
								color: "#9CA3AF",
								paddingTop: "10px",
							}}
						/>
						{selectedComponents.map((key, index) => (
							<Line
								key={key}
								type="monotone"
								dataKey={key}
								stroke={`hsl(${index * 60}, 70%, 60%)`}
								strokeWidth={2}
								activeDot={{ r: 8 }}
								fill='url(#gradient)'
							/>
						))}
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesTrendChart;