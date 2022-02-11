data = (await FileAttachment("population.json").json()).slice(1).map(([population, state, county]) => {
    const id = state + county;
    const feature = features.get(id);
    return {
      id,
      position: feature && path.centroid(feature),
      title: feature && feature.properties.name,
      value: +population
    };
  })
radius = d3.scaleSqrt([0, d3.max(data, d => d.value)], [0, 40])
features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]))
path = d3.geoPath()
format = d3.format(",.0f")
us = FileAttachment("counties-albers-10m.json").json()
topojson = require("topojson-client@3")
d3 = require("d3@6")
chart = {
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, 975, 610]);
  
    svg.append("path")
        .datum(topojson.feature(us, us.objects.nation))
        .attr("fill", "#ddd")
        .attr("d", path);
  
    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);
  
    const legend = svg.append("g")
        .attr("fill", "#777")
        .attr("transform", "translate(915,608)")
        .attr("text-anchor", "middle")
        .style("font", "10px sans-serif")
      .selectAll("g")
        .data(radius.ticks(4).slice(1))
      .join("g");
  
    legend.append("circle")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("cy", d => -radius(d))
        .attr("r", radius);
  
    legend.append("text")
        .attr("y", d => -2 * radius(d))
        .attr("dy", "1.3em")
        .text(radius.tickFormat(4, "s"));
  
    svg.append("g")
        .attr("fill", "brown")
        .attr("fill-opacity", 0.5)
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
      .selectAll("circle")
      .data(data
          .filter(d => d.position)
          .sort((a, b) => d3.descending(a.value, b.value)))
      .join("circle")
        .attr("transform", d => `translate(${d.position})`)
        .attr("r", d => radius(d.value))
      .append("title")
        .text(d => `${d.title}
  ${format(d.value)}`);
  
    return svg.node();
  }