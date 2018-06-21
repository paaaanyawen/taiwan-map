var xhr = new XMLHttpRequest();
xhr.open('get',"http://opendata2.epa.gov.tw/AQI.json",true);


xhr.send();
console.log(xhr.responseText);
jQuery(function() {
        var width = 800,
            height = 600;

        var svg = d3.select("body").append("svg")
            // .attr("class", "svgback")
            .attr("width", width)
            .attr("height", height);

        var projection = d3.geo.mercator()
            .center([121, 24])
            .scale(6000);

        var path = d3.geo.path()
            .projection(projection);

        d3.json("TOWN_MOI_1070516.json", function(error, topology) {
            console.log(topology);
            var g = svg.append("g");

            // 縣市/行政區界線
            d3.select("svg").append("path").datum(
                topojson.mesh(topology,
                    topology.objects["TOWN_MOI_1070516"],
                    function(a,
                        b) {
                        return a !== b;
                    })).attr("d", path).attr("class", "subunit-boundary");

            d3.select("g").selectAll("path")
                .data(topojson.feature(topology, topology.objects.TOWN_MOI_1070516).features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr({
                    d: path,
                    name: function(d) {
                        return d.properties["COUNTYNAME"];
                    },
                    fill: '#fff',
                    stroke: "#FFD306"

                }).attr('stroke-width', "2")
                .on("mouseover", function(d) {
                    d3.select(this).attr("fill", "#FFDC35");

                }).on("mouseleave", function(d) {
                    d3.select(this).attr("fill", "#fff");
                });
        });
    })