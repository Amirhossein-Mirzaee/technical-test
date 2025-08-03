/** @format */

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const SingleLineChart = ({ data }) => {
	const ref = useRef();

	useEffect(() => {
		const validData = data.filter((d) => d[1] !== null);

		const width = 800;
		const height = 400;
		const margin = { top: 20, right: 20, bottom: 30, left: 40 };

		d3.select(ref.current).selectAll("*").remove();
		const svg = d3.select(ref.current).append("svg").attr("width", width).attr("height", height);

		const x = d3
			.scaleLinear()
			.domain(d3.extent(validData, (d) => d[0]))
			.range([margin.left, width - margin.right]);

		const y = d3
			.scaleLinear()
			.domain(d3.extent(validData, (d) => d[1]))
			.range([height - margin.bottom, margin.top]);

		const line = d3
			.line()
			.x((d) => x(d[0]))
			.y((d) => y(d[1]));

		svg
			.append("path")
			.datum(validData)
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 2)
			.attr("d", line);

		svg
			.append("g")
			.attr("transform", `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(x));

		svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));
	}, [data]);

	return <div ref={ref}></div>;
};

export default SingleLineChart;
