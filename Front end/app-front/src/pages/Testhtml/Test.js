import React from 'react'

const Table = () => {
    const rows = [
        { name: 'Mohamed Tibari', status: 'Évalué', emploi: 'CCPRO11', emploiDetail: 'Tenue de poste', time: '14:30', date: '29 - 06 - 2022' },
        { name: 'Ahmed Taoufik', status: 'Évalué', emploi: 'CCPARTA1', emploiDetail: 'Tenue de poste', time: '14:30', date: '29 - 06 - 2022' },
        { name: 'Samia Ouchen', status: 'Évalué', emploi: 'DA11', emploiDetail: 'Tenue de poste', time: '14:30', date: '29 - 06 - 2022' },
        { name: 'Nouaaman Laajaj', status: 'Évalué', emploi: 'DA1', emploiDetail: 'Tenue de poste', time: '14:30', date: '29 - 06 - 2022' },
        { name: 'Amine Tifaoui', status: 'Évalué', emploi: 'RA11', emploiDetail: 'Tenue de poste', time: '14:30', date: '29 - 06 - 2022' },
        { name: 'Robert Johnstons', status: 'Évalué', emploi: 'SA11', emploiDetail: 'Tenue de poste', time: '14:30', date: '29 - 06 - 2022' }
    ];

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Collaborateur</th>
                        <th>Statut</th>
                        <th>Emploi</th>
                        <th>RDV</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td><span className="status">{row.status}</span></td>
                            <td>{row.emploi}<br /><small>{row.emploiDetail}</small></td>
                            <td>{row.time}<br /><small>{row.date}</small></td>
                            <td><a href="#" className="action-button">CHANGER RDV</a></td>
                            <td><a href="#" className="action-button">ÉVALUER</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;