import { Menu, Settings, TrendingUp, LogOut } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{ name: "Dashboard", icon: TrendingUp, color: "#3B82F6", href: "/home/:userid", iconSize: 24, textSize: "text-2xl" },
	{ name: "User", icon: TrendingUp, color: "#3B82F6", href: "/users/:userid", iconSize: 24, textSize: "text-2xl" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings/:userid", iconSize: 24, textSize: "text-2xl" }
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const navigate = useNavigate();
	const userid = localStorage.getItem("currentUserId");

	const handleLogout = () => {
		localStorage.removeItem(`token_${userid}`);
		localStorage.removeItem(`userdata_${userid}`);
		localStorage.removeItem("currentUserId");
		navigate("/login");
	};

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={45} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href.replace(":userid", userid)}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
								<item.icon size={30} style={{ color: item.color, minWidth: "30px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className={`ml-4 whitespace-nowrap ${item.textSize}`}
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>

				<div className='mt-auto'>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={handleLogout}
						className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors w-full'
					>
						<LogOut size={30} style={{ color: "#EF4444", minWidth: "30px" }} />
						<AnimatePresence>
							{isSidebarOpen && (
								<motion.span
									className='ml-4 whitespace-nowrap text-2xl'
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "auto" }}
									exit={{ opacity: 0, width: 0 }}
									transition={{ duration: 0.2, delay: 0.3 }}
								>
									Logout
								</motion.span>
							)}
						</AnimatePresence>
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};

export default Sidebar;