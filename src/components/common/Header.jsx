import React, { useState } from "react";
import { IoCalendarNumber } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Header = ({ title }) => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			<style>
				{`
					.custom-datepicker-popper {
						z-index: 1050 !important;
					}
					.custom-datepicker-popper .react-datepicker {
						box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
					}
					header {
						z-index: 1000 !important;
					}
					.datepicker-container {
						position: relative;
						z-index: 1001;
					}
					.modal {
						position: fixed;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: rgba(0, 0, 0, 0.5);
						display: flex;
						justify-content: center;
						align-items: center;
						z-index: 1100;
					}
					.modal-content {
						background: black;
						padding: 20px;
						border-radius: 8px;
						max-width: 500px;
						width: 100%;
						box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
					}
				`}
			</style>
			<header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
				<div className="py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
					<h1 className="text-2xl font-semibold text-gray-100 text-left">{title}</h1>
					<div className="flex items-center relative datepicker-container">
						<IoCalendarNumber className="text-gray-100 mr-2 text-3xl cursor-pointer" onClick={toggleModal} />
						<span className="text-gray-100 ml-2 font-bold text-lg">
							{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
						</span>
					</div>
				</div>
			</header>
			{isModalOpen && (
				<div className="modal" onClick={toggleModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<h2 className="text-xl font-semibold mb-4 text-white">Select Date Range</h2>
						<div className="flex items-center">
							<DatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								selectsStart
								startDate={startDate}
								endDate={endDate}
								className="bg-gray-700 text-gray-100 px-2 py-1 rounded custom-datepicker"
								popperClassName="custom-datepicker-popper"
								popperPlacement="top-end"
							/>
							<span className="text-gray-100 mx-2">to</span>
							<DatePicker
								selected={endDate}
								onChange={(date) => setEndDate(date)}
								selectsEnd
								startDate={startDate}
								endDate={endDate}
								className="bg-gray-700 text-gray-100 px-2 py-1 rounded custom-datepicker"
								popperClassName="custom-datepicker-popper"
								popperPlacement="top-end"
							/>
						</div>
						<button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleModal}>
							Close
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Header;