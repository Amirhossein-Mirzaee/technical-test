/** @format */

import React from "react";
import SingleLineChart from "./SingleLineChart";
import MultiLineChart from "./MultiLineChart";

const Chart = ({ data, title }) => {
	const isMultiSeries = Array.isArray(data[0][1]);

	return (
		<div className='mb-4'>
			<h3>{title}</h3>
			{isMultiSeries ? <MultiLineChart data={data} /> : <SingleLineChart data={data} />}
		</div>
	);
};

export default Chart;
