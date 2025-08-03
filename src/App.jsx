/** @format */

import React, { useEffect, useState } from "react";
import Chart from "./components/Chart";
const App = () => {
	const [charts, setCharts] = useState([]);

	useEffect(() => {
		fetch("../public/data/data.json")
			.then((res) => res.json())
			.then((data) => setCharts(data))
			.catch((err) => console.log(err));
	}, []);
	useEffect(() => {
		console.log(charts);
	}, [charts]);
	return (
		<div className='p-4'>
			{charts.map((chart, index) => (
				<Chart key={index} data={chart.data} title={chart.title} />
			))}
		</div>
	);
};

export default App;
