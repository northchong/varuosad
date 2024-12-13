let partsData = [];

// papa-parsega loeb csv faili
document.addEventListener('DOMContentLoaded', () => {
    Papa.parse('varuosad.csv', {
        download: true,
        header: true,
        complete: function(results) {
            partsData = results.data;
            displayParts(partsData);
            console.log(results.data);
        }
    });
});

// lehel kuvamine
function displayParts(data) {
    const output = document.getElementById('data');
    output.innerHTML = '';
    // kui datat pole, kuvab et vaste puudub
    if (data.length === 0) {
        output.innerHTML = '<p>Vaste puudub</p>';
        return;
    }
    // teeb tabeli kuhu kuvada asjad
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Nimi</th>
            <th>Seerianumber</th>
            <th>Hind</th>
        </tr>
    `;
    // tabeliread ja datad
    data.forEach(part => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${part.Nimi || ''}</td>
            <td>${part.Seerianumber || ''}</td>
            <td>${part.Hind || ''}</td>
        `;
        table.appendChild(row);
    });
    // paneb tabelisse
    output.appendChild(table);
}

// filter nime/seerianumbri järgi
function filterParts() {
    const otsing = document.getElementById('searchInput').value.toLowerCase();

    const filtered = partsData.filter(part =>
        (part.Nimi && part.Nimi.toLowerCase().includes(otsing)) ||
        (part.Seerianumber && part.Seerianumber.toLowerCase().includes(otsing))
    );

    displayParts(filtered);
}
