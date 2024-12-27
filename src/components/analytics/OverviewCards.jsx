import { motion } from "framer-motion";
import {
	FaUserGroup,
	FaRegThumbsUp,
	FaPersonArrowUpFromLine,
} from "react-icons/fa6";
import { IoMdTrendingUp } from "react-icons/io";
import { MdConnectWithoutContact } from "react-icons/md";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";

const icons = {
	TotalLeads: <FaUserGroup size={32} />, // Increase icon size
	LeadConverted: <IoMdTrendingUp size={32} />,
	LeadQualified: <FaRegThumbsUp size={32} />,
	Contacted: <MdConnectWithoutContact size={32} />,
	NewLeads: <FaPersonArrowUpFromLine size={32} />,
	LeadLost: <HiOutlinePhoneMissedCall size={32} />,
};

const colors = {
	TotalLeads: "rgba(242, 255, 158, 0.8)", // Brighter colors
	LeadConverted: "rgba(173, 187, 255, 0.8)",
	LeadQualified: "rgba(154, 251, 154, 0.8)",
	Contacted: "rgba(98, 216, 266, 0.8)",
	NewLeads: "rgba(230, 132, 266, 0.8)",
	LeadLost: "rgba(270, 110, 162, 0.8)",
};

let metricsData = {
	TotalLeads: {
		componentName: "Total Leads",
		value: 56874,
	},
	Contacted: {
		componentName: "Contacted",
		value: 56874,
	},
	LeadLost: {
		componentName: "Lead Lost",
		value: 56874,
	},
	LeadConverted: {
		componentName: "Lead Converted",
		value: 56874,
	},
	NewLeads: {
		componentName: "New Leads",
		value: 56874,
	},
	LeadQualified: {
		componentName: "Lead Qualified",
		value: 56874,
	},
};

const OverviewCards = () => {
	return (
		<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 mb-8'>
			{Object.keys(metricsData).map((key, index) => (
				<motion.div
					key={key}
					className='bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg
			rounded-xl p-6 border border-gray-700 flex flex-col items-center justify-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					whileHover={{ scale: 1.05 }} // Add hover effect
					transition={{ delay: index * 0.1 }}
					style={{ zIndex: 1, backgroundColor: colors[key] }} // Set card background color
				>
					<div className='flex flex-col items-center'>
						<div className='p-3 rounded-full bg-transparent'>
							{icons[key]}
						</div>
						<h3 className='text-2xl font-bold text-black mt-4'>{metricsData[key].componentName}</h3>
						<p className='mt-1 text-3xl font-semibold text-black'>{metricsData[key].value}</p>
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default OverviewCards;
