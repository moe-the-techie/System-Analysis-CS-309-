document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Loaded");

    const table = document.getElementById("ContentPlaceHolder2_GridView1");
    const rows = table.getElementsByTagName("tr");
    
    const data = [];
    // get headers from first table row

    for (let i = 1; i < rows.length; i++) { // start from 1 to skip header row
        // fill data with rows contents
        data.push(rows[i].getElementsByTagName("td"));
    }

    const filteredData = data.filter(e => e[4].innerText != "غ" && e[4].innerText != "ر"); // filter data so that only passing rows are filtered

    const groupedData = ["المتسوي الاول:\n", "المستوي الثاني:\n", "المستوي الثالث:\n"];

    for (let i = 0; i < filteredData.length; i++) { 
        if (filteredData[i][1].innerText[1] == '1') groupedData[0] += filteredData[i][1].innerText + "\n";
        else if (filteredData[i][1].innerText[1] == '2') groupedData[1] += filteredData[i][1].innerText + "\n";
        else groupedData[2] += filteredData[i][1].innerText + "\n";
    }

    Object.values(groupedData).forEach(group => {
        const groupDiv = document.createElement("div");
        // fill groupDiv with passed subjects
        groupDiv.append(group);
        table.insertAdjacentElement('beforeBegin', groupDiv);
    });

    // show unfinished subjects in other divs
    
    console.log("DOM Finished");
});