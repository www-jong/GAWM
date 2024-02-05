import React, { useState } from 'react';
import Calendar from "./CalendarComponent.jsx";
import MyLook from "./MyLookComponent.jsx";

export default function History() {
	const [selectedComponent, setSelectedComponent] = useState(null);

	return (
		<>
			<div>
				<button onClick={() => setSelectedComponent('calendar')}>캘린더</button>
				<button onClick={() => setSelectedComponent('myLook')}>나의 감각들</button>
			</div>

			{selectedComponent === 'calendar' && <Calendar />}
			{selectedComponent === 'myLook' && <MyLook />}
		</>
	)
}
