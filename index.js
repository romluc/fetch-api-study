// DOM manipulation

const btnText = document.querySelector('#get-text');
const btnJson = document.querySelector('#get-json');
const btnApi = document.querySelector('#get-api-data');
const btnAdd = document.querySelector('#add-data');

const output = document.querySelector('.output');

// Event Listeners
btnText.addEventListener('click', getText);
btnJson.addEventListener('click', getJson);
btnApi.addEventListener('click', getApiData);
btnAdd.addEventListener('click', addData);

function getText() {
  fetch('sample.txt')
    .then(res => res.text())
    .then(data => {
      let outputData = `
        <div class="container mb-3"
          <h2 class="mb-2">Text from .txt file</h2>
          <h3>${data}</h3>
        </div>
        `;

      output.innerHTML = outputData;
    })
    .catch(err => console.log(err));
}

function getJson() {
  fetch('users.json')
    .then(res => res.json())
    .then(data => {
      let outputData = '<h2 class="mb-3">Users from JSON file</h2>';
      data.forEach(user => {
        outputData += `
          <ul class="list-group mb-3">
            <li class="list-group-item">User Name: ${user.name}</li>
            <li class="list-group-item">User Id: ${user.id}</li>
            <li class="list-group-item">User e-mail: ${user.email}</li>
          </ul>
        `;
      });
      output.innerHTML = outputData;
    })
    .catch(err => console.log(err));
}

function getApiData() {
  // fetch('http://jsonplaceholder.typicode.com/posts')
  fetch('http://dummy.restapiexample.com/api/v1/employees')
    .then(res => res.json())
    .then(data => {
      let outputData = '<h2 class="mb-3">API Data</h2>';
      data.data.forEach(item => {
        outputData += `
            <div class="card card-body mb-3">
              <h5>Id: ${item.id}</h5>
              <p>Name: ${item.employee_name}</p>
              <p>Age: ${item.employee_age}</p>
              <p>Salary: ${item.employee_salary}</p>
           </div>
          `;
      });
      output.innerHTML = outputData;
    });
}

function addData(e) {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const age = document.querySelector('#age').value;
  const salary = document.querySelector('#salary').value;

  fetch('http://dummy.restapiexample.com/api/v1/create', {
    method: 'POST',
    header: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ name, age, salary })
  })
    .then(res => res.json())
    .then(data => (output.innerHTML += data.data));
}
