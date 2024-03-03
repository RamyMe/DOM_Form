// Retrieve saved data from localStorage and populate the table
window.onload = function() {
    const savedData = JSON.parse(localStorage.getItem('formData')) || [];
    const tableBody = document.getElementById('tableBody');
    savedData.forEach(data => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${data.firstName}</td>
        <td>${data.lastName}</td>
        <td>${data.address}</td>
        <td>${data.pincode}</td>
        <td>${data.gender}</td>
        <td>${data.food.join(', ')}</td>
        <td>${data.state}</td>
        <td>${data.country}</td>
      `;
      tableBody.appendChild(newRow);
    });
  };

  function addEntry() {
    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    // Check if at least 2 food items are selected
    const selectedFood = formData.getAll('food');
    if (selectedFood.length < 2) {
      alert('Select at least 2 food items');
      return;
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${formData.get('firstName')}</td>
      <td>${formData.get('lastName')}</td>
      <td>${formData.get('address')}</td>
      <td>${formData.get('pincode')}</td>
      <td>${formData.get('gender')}</td>
      <td>${selectedFood.join(', ')}</td>
      <td>${formData.get('state')}</td>
      <td>${formData.get('country')}</td>
    `;

    const tableBody = document.getElementById('tableBody');
    tableBody.appendChild(newRow);

    // Save data to localStorage
    const savedData = JSON.parse(localStorage.getItem('formData')) || [];
    savedData.push({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      address: formData.get('address'),
      pincode: formData.get('pincode'),
      gender: formData.get('gender'),
      food: selectedFood,
      state: formData.get('state'),
      country: formData.get('country')
    });
    localStorage.setItem('formData', JSON.stringify(savedData));

    // Clear form fields after submission
    form.reset();
  }