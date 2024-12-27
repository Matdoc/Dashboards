import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const updatedData = [
	{ 
	  id: 1,
	  name: "John Doe", 
	  phone: "123-456-7890", 
	  email: "john@example.com", 
	  franchise: "Franchise A", 
	  status: "New", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
	{ 
	  id: 2,
	  name: "Jane Smith", 
	  phone: "987-654-3210", 
	  email: "jane@example.com", 
	  franchise: "Franchise B", 
	  status: "Contacted", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
	{ 
	  id: 3,
	  name: "Bob Johnson", 
	  phone: "555-123-4567", 
	  email: "bob@example.com", 
	  franchise: "Franchise C", 
	  status: "Lead Lost", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
	{ 
	  id: 4,
	  name: "Alice Brown", 
	  phone: "444-987-1234", 
	  email: "alice@example.com", 
	  franchise: "Franchise A", 
	  status: "Lead Converted", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
	{ 
	  id: 5,
	  name: "Charlie Wilson", 
	  phone: "222-555-7890", 
	  email: "charlie@example.com", 
	  franchise: "Franchise B", 
	  status: "Lead Qualified", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
	{ 
	  id: 6,
	  name: "Charlie Wilson", 
	  phone: "222-555-7890", 
	  email: "charlie@example.com", 
	  franchise: "Franchise B", 
	  status: "New", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
	{ 
	  id: 7,
	  name: "John Doe", 
	  phone: "123-456-7890", 
	  email: "john@example.com", 
	  franchise: "Franchise A", 
	  status: "Contacted", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
	{ 
	  id: 8,
	  name: "Jane Smith", 
	  phone: "987-654-3210", 
	  email: "jane@example.com", 
	  franchise: "Franchise B", 
	  status: "Lead Lost", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
	{ 
	  id: 9,
	  name: "Bob Johnson", 
	  phone: "555-123-4567", 
	  email: "bob@example.com", 
	  franchise: "Franchise C", 
	  status: "Lead Converted", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
	{ 
	  id: 10,
	  name: "Alice Brown", 
	  phone: "444-987-1234", 
	  email: "alice@example.com", 
	  franchise: "Franchise A", 
	  status: "Lead Qualified", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
	{ 
	  id: 11,
	  name: "Charlie Wilson", 
	  phone: "222-555-7890", 
	  email: "charlie@example.com", 
	  franchise: "Franchise B", 
	  status: "New", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
	{ 
	  id: 12,
	  name: "Charlie Wilson", 
	  phone: "222-555-7890", 
	  email: "charlie@example.com", 
	  franchise: "Franchise B", 
	  status: "Contacted", 
	  command: "View Details", 
	  date: "2024-12-27" 
	},
];

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(updatedData);
	const [selectedStatuses, setSelectedStatuses] = useState([]);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		filterUsers(term, selectedStatuses);
	};

	const handleCheckboxChange = (e) => {
		const { value, checked } = e.target;
		const newSelectedStatuses = checked
			? [...selectedStatuses, value]
			: selectedStatuses.filter((status) => status !== value);
		setSelectedStatuses(newSelectedStatuses);
		filterUsers(searchTerm, newSelectedStatuses);
	};

	const filterUsers = (term, statuses) => {
		const filtered = updatedData.filter(
			(user) =>
				(user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)) &&
				(statuses.length === 0 || statuses.includes(user.status))
		);
		setFilteredUsers(filtered);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-semibold text-gray-100'>Users</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search users...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
				<div className='ml-4'>
					<label className='text-gray-100'>
						<input
							type='checkbox'
							value="New"
							checked={selectedStatuses.includes("New")}
							onChange={handleCheckboxChange}
							className='mr-2'
						/>
						New
					</label>
					<label className='text-gray-100 ml-4'>
						<input
							type='checkbox'
							value="Contacted"
							checked={selectedStatuses.includes("Contacted")}
							onChange={handleCheckboxChange}
							className='mr-2'
						/>
						Contacted
					</label>
					<label className='text-gray-100 ml-4'>
						<input
							type='checkbox'
							value="Lead Lost"
							checked={selectedStatuses.includes("Lead Lost")}
							onChange={handleCheckboxChange}
							className='mr-2'
						/>
						Lead Lost
					</label>
					<label className='text-gray-100 ml-4'>
						<input
							type='checkbox'
							value="Lead Converted"
							checked={selectedStatuses.includes("Lead Converted")}
							onChange={handleCheckboxChange}
							className='mr-2'
						/>
						Lead Converted
					</label>
					<label className='text-gray-100 ml-4'>
						<input
							type='checkbox'
							value="Lead Qualified"
							checked={selectedStatuses.includes("Lead Qualified")}
							onChange={handleCheckboxChange}
							className='mr-2'
						/>
						Lead Qualified
					</label>
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider'>
								Phone
							</th>
							<th className='px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider'>
								Status
							</th>
							<th className='px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider'>
								Franchise
							</th>
							<th className='px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider'>
								Date
							</th>
							<th className='px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider'>
								Command
							</th>
							<th className='px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((user) => (
							<motion.tr
								key={user.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold text-lg'>
												{user.name.charAt(0)}
											</div>
										</div>
										<div className='ml-4'>
											<div className='text-lg font-medium text-gray-100'>{user.name}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-xl text-gray-300'>{user.email}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-xl text-gray-300'>{user.phone}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-xl text-gray-300'>{user.status}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-xl text-gray-300'>{user.franchise}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-xl text-gray-300'>{user.date}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-xl text-gray-300'>{user.command}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-lg text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
									<button className='text-red-400 hover:text-red-300'>Delete</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default UsersTable;
