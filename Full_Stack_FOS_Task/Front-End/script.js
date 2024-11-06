document.addEventListener('DOMContentLoaded', () => {
	// console.log(document);
	fetchDepartments();
    console.log("fetchDepartments")
});



async function fetchDepartments() {
	try {
		const response = await fetch('http://localhost:8000/departments');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const departments = await response.json();
		console.log(departments)
		displayDepartments(departments);
	} catch (error) {
		console.error('Error fetching departments:', error);
		// Display an error message on the page
		const departmentsSection = document.getElementById('featured-programs');
		departmentsSection.innerHTML = "<p>Error loading department information.</p>";
	}
}


function displayDepartments(departments) {
	const departmentsSection = document.getElementById("featured-programs");
    console.log(departmentsSection)
	departmentsSection.innerHTML = "<br><br><h2>Departments</h2><div class='program-cards'></div>";  // Clear and add h2

	const cardContainer = departmentsSection.querySelector('.program-cards');  // Get the card container

	departments.forEach(department => {
		console.log(department);
		const card = document.createElement('div');
		card.classList.add('card');
		// Dynamically create the icon element
		const icon = document.createElement('i');
		icon.className = department.icon || 'fas fa-flask'; // Default if no icon provided

		card.innerHTML = `
            ${icon.outerHTML}
            <h3>${department.name}</h3>
            <p>${department.description || "Information coming soon."}</p>
            <a href="${department.link || "#"}" class="learn-more">Learn More</a>
        `;
		cardContainer.appendChild(card);
	});
}
