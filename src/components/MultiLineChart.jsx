/** @format */

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const MultiLineChart = ({ data }) => {
	const ref = useRef();

	useEffect(() => {
		const width = 800;
		const height = 400;
		const margin = { top: 20, right: 20, bottom: 30, left: 40 };

		const seriesCount = data[0][1].length;

		const seriesData = Array.from({ length: seriesCount }, (_, i) =>
			data.map(([ts, values]) => [ts, values[i]]).filter(([, value]) => value !== null),
		);

		const flatAll = seriesData.flat();
		const x = d3
			.scaleLinear()
			.domain(d3.extent(flatAll, (d) => d[0]))
			.range([margin.left, width - margin.right]);

		const y = d3
			.scaleLinear()
			.domain(d3.extent(flatAll, (d) => d[1]))
			.range([height - margin.bottom, margin.top]);

		const colors = ["blue", "green", "red"];

		d3.select(ref.current).selectAll("*").remove();
		const svg = d3.select(ref.current).append("svg").attr("width", width).attr("height", height);

		const line = d3
			.line()
			.x((d) => x(d[0]))
			.y((d) => y(d[1]));

		seriesData.forEach((series, i) => {
			svg
				.append("path")
				.datum(series)
				.attr("fill", "none")
				.attr("stroke", colors[i])
				.attr("stroke-width", 2)
				.attr("d", line);
		});

		svg
			.append("g")
			.attr("transform", `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(x));

		svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));
	}, [data]);

	return <div ref={ref}></div>;
};

export default MultiLineChart;
