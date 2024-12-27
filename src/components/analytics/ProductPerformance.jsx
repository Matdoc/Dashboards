import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

const metricsData = {
	TotalLeads: {
		componentName: "Total Leads",
		data: {
			value: 56874,
			frequency: [120, 150, 110, 180, 140, 170, 130, 200, 160, 190, 150, 210, 170, 230],
			labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	},
	NewLeads: {
		componentName: "New Leads",
		data: {
			value: 56874,
			frequency: [90, 110, 70, 140, 100, 130, 80, 160, 120, 150, 100, 170, 130, 190],
			labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	},
	Contacted: {
		componentName: "Contacted",
		data: {
			value: 56874,
			frequency: [100, 130, 90, 160, 120, 150, 110, 180, 140, 170, 130, 190, 150, 210],
			labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	},
	LeadConverted: {
		componentName: "Lead Converted",
		data: {
			value: 56874,
			frequency: [10, 20, 15, 25, 18, 22, 12, 30, 16, 28, 14, 32, 20, 35],
			labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	},
	LeadQualified: {
		componentName: "Lead Qualified",
		data: {
			value: 56874,
			frequency: [30, 50, 20, 70, 40, 60, 30, 90, 50, 80, 40, 100, 60, 110],
			labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	},
	LeadLost: {
		componentName: "Lead Lost",
		data: {
			value: 56874,
			frequency: [60, 80, 50, 100, 70, 90, 60, 120, 80, 110, 70, 130, 90, 150],
			labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
		}
	}
};

const metricsColors = {
	TotalLeads: {
		borderColor: "#FFD700", // Gold
		backgroundColor: "#FFFACD", // Lemon Chiffon
		textColor: "#000000", // Black
		chartColor: "#FFA500", // Orange
	},
	NewLeads: {
		borderColor: "#1E90FF", // Dodger Blue
		backgroundColor: "#87CEFA", // Light Sky Blue
		textColor: "#000000", // Black
		chartColor: "#4682B4", // Steel Blue
	},
	Contacted: {
		borderColor: "#008000", // Green
		backgroundColor: "#98FB98", // Pale Green
		textColor: "#000000", // Black
		chartColor: "#32CD32", // Lime Green
	},
	LeadConverted: {
		borderColor: "#4B0082", // Indigo
		backgroundColor: "#DDA0DD", // Plum
		textColor: "#FFFFFF", // White
		chartColor: "#9370DB", // Medium Purple
	},
	LeadQualified: {
		borderColor: "#FF4500", // Orange Red
		backgroundColor: "#FA8072", // Salmon
		textColor: "#FFFFFF", // White
		chartColor: "#FF6347", // Tomato
	},
	LeadLost: {
		borderColor: "#DC143C", // Crimson
		backgroundColor: "#FFB6C1", // Light Pink
		textColor: "#000000", // Black
		chartColor: "#FF69B4", // Hot Pink
	},
};

const ProductPerformance = () => {
	const [selectedMetrics, setSelectedMetrics] = useState(["TotalLeads", "NewLeads", "Contacted", "LeadConverted", "LeadQualified", "LeadLost"]);
	const [selectedRange, setSelectedRange] = useState("both");

	const handleCheckboxChange = (metric) => {
		setSelectedMetrics((prevSelected) => {
			if (prevSelected.includes(metric)) {
				if (prevSelected.length === 1) {
					return prevSelected; // Prevent deselecting the last remaining checkbox
				}
				return prevSelected.filter((item) => item !== metric);
			} else {
				return [...prevSelected, metric];
			}
		});
	};

	const handleRangeChange = (range) => {
		setSelectedRange(range);
	};

	const getFilteredData = (data) => {
		switch (selectedRange) {
			case "firstSeven":
				return data.slice(0, 7);
			case "lastSeven":
				return data.slice(-7);
			case "both":
			default:
				return data;
		}
	};

	const chartData = getFilteredData(metricsData[selectedMetrics[0]].data.labels).map((label, index) => {
		const dataPoint = { name: label };
		selectedMetrics.forEach((metric) => {
			dataPoint[metricsData[metric].componentName] = getFilteredData(metricsData[metric].data.frequency)[index];
		});
		return dataPoint;
	});

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">Leads comparision</h2>
			<div className="mb-6 flex flex-wrap gap-4">
				{Object.keys(metricsData).map((metric) => (
					<label
						key={metric}
						className="inline-flex items-center cursor-pointer"
					>
						<input
							type="checkbox"
							checked={selectedMetrics.includes(metric)}
							onChange={() => handleCheckboxChange(metric)}
							className="mr-2"
						/>
						{metricsData[metric].componentName}
					</label>
				))}
			</div>
			<div className="mb-6 flex flex-wrap gap-4">
				<label className="inline-flex items-center cursor-pointer">
					<input
						type="radio"
						name="range"
						checked={selectedRange === "firstSeven"}
						onChange={() => handleRangeChange("firstSeven")}
						className="mr-2"
					/>
					First 7 Days
				</label>
				<label className="inline-flex items-center cursor-pointer">
					<input
						type="radio"
						name="range"
						checked={selectedRange === "lastSeven"}
						onChange={() => handleRangeChange("lastSeven")}
						className="mr-2"
					/>
					Last 7 Days
				</label>
				<label className="inline-flex items-center cursor-pointer">
					<input
						type="radio"
						name="range"
						checked={selectedRange === "both"}
						onChange={() => handleRangeChange("both")}
						className="mr-2"
					/>
					Both
				</label>
			</div>
			<div style={{ width: "100%", height: 350 }}>
				<ResponsiveContainer>
					<BarChart data={chartData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
						<XAxis dataKey="name" stroke="#555" />
						<YAxis stroke="#555" />
						<Tooltip
							contentStyle={{
								borderColor: "#ccc",
								borderRadius: "8px",
							}}
							itemStyle={{ color: "#333" }}
						/>
						<Legend verticalAlign="top" />
						{selectedMetrics.map((metric) => (
							<Bar
								key={metric}
								dataKey={metricsData[metric].componentName}
								fill={metricsColors[metric].chartColor}
								radius={[10, 10, 0, 0]}
							/>
						))}
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default ProductPerformance;
