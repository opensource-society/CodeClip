
    // 1. Time Spent Coding (Line Chart)
    const codingTimeCtx = document.getElementById('codingTimeChart').getContext('2d');
    new Chart(codingTimeCtx, {
    type: 'line',
    data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
    label: 'Hours Spent Coding',
    data: [2, 3, 1, 4, 2.5, 3.5, 5],
    backgroundColor: 'rgba(0,123,255,0.2)',
    borderColor: '#007BFF',
    borderWidth: 2,
    tension: 0.4,
    fill: true
}]
},
    options: {
    responsive: true,
    plugins: { legend: { position: 'top' } }
}
});

    // 2. Challenges Completed (Bar Chart)
    const challengesCtx = document.getElementById('challengesChart').getContext('2d');

    new Chart(challengesCtx, {
    type: 'bar',
    data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
    label: 'Challenges Completed',
    data: [4, 6, 5, 8],
    backgroundColor: '#007BFF'
}]
},
    options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
    y: { beginAtZero: true }
}
}
});
//
//     // 3. Skill Improvement (Radar Chart)
//     const skillsCtx = document.getElementById('skillsChart').getContext('2d');
//     new Chart(skillsCtx, {
//     type: 'radar',
//     data: {
//     labels: ['JavaScript', 'DSA', 'APIs', 'HTML/CSS', 'React'],
//     datasets: [{
//     label: 'Skill Level',
//     data: [7, 6, 5, 8, 4],
//     backgroundColor: 'rgba(255, 99, 132, 0.2)',
//     borderColor: 'rgb(255, 99, 132)',
//     borderWidth: 2
// }]
// },
//     options: {
//     responsive: true,
//     elements: {
//     line: { borderWidth: 2 }
// }
// }
// });

