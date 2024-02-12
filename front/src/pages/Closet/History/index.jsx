import React, { useState } from 'react';
import Calendar from "./CalendarComponent.jsx";
import MyLook from "./MyLookComponent.jsx";

export default function History() {
	const [selectedComponent, setSelectedComponent] = useState('calendar');

	return (
		<>
			<div className="flex">
				<button
					onClick={() => setSelectedComponent('calendar')}
					className={`flex-1 py-2 rounded-l-lg text-white font-semibold ${selectedComponent === 'calendar' ? 'bg-primary' : 'bg-gray-300'
						}`}
				>
					캘린더
				</button>
				<button
					onClick={() => setSelectedComponent('myLook')}
					className={`flex-1 py-2 rounded-r-lg text-white font-semibold ${selectedComponent === 'myLook' ? 'bg-primary' : 'bg-gray-300'
						}`}
				>
					나의 감각들
				</button>
			</div>

			{selectedComponent === 'calendar' && <Calendar />}
			{selectedComponent === 'myLook' && <MyLook />}
		</>
	)
}
