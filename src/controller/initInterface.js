import loadViewer from "./loadViewer.js";
import * as d3 from 'd3';
import * as data from '../data.js'



export default function initInterface() {
    d3.select("#miserables-data").on("click", () => {
        d3.selectAll(".nav-item").select("a").classed("active", false);
        d3.select("#miserables-data").select("a").classed("active", true);
        loadViewer(data.miserables);
    })

    d3.select("#random-data").on("click", () => {
        d3.selectAll(".nav-item").select("a").classed("active", false);
        d3.select("#random-data").select("a").classed("active", true);
        loadViewer(data.randomData());
    })

    d3.select("main").append("div").attr("class", "cursor");
    const cursor = document.querySelector(".cursor");
    window.addEventListener("pointermove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    })

    
}

export function hideCursor(){
    d3.select(".cursor").style("display", "none");
}

export function appearCursor() {
    d3.select(".cursor").style("display", "block");
}