import ForceGraph3D from '3d-force-graph';
export default function loadViewer (data) {
    const viewerWidth = window.innerWidth;
    const viewerHeight = window.innerHeight;

    ForceGraph3D({ controlType: "trackball" })(document.getElementById("viewer"))
        .width(viewerWidth)
        .height(viewerHeight)

        .backgroundColor("#000000")
        .nodeAutoColorBy('group')
        .linkAutoColorBy('value')
        .linkOpacity('0.7')

        .graphData(data)
        .enableNavigationControls(true);
    
}