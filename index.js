// DOM manipulation

const btnText = document.querySelector('#get-text');
const btnJson = document.querySelector('#get-json');
const btnApi = document.querySelector('#get-api-data');
const btnAdd = document.querySelector('#add-data');

const textOutput = document.querySelector('.text-output');
const jsonOutput = document.querySelector('.json-output');
const apiOutput = document.querySelector('.api-output');

// Event Listeners
btnText.addEventListener('click', getText);
btnJson.addEventListener('click', getJson);
btnApi.addEventListener('click', getApiData);
btnAdd.addEventListener('click', addData);

function getText() {
  fetch('sample.txt')
    .then(res => res.text())
    .then(data => (textOutput.innerHTML = data))
    .catch(err => console.log(err));
}

function getJson() {
  fetch('users.json')
    .then(res => res.json())
    .then(data => {
      let output = '<h2>Users from JSON file</h2>';
      data.forEach(user => {
        output += `
          <ul>
            <li>User Id: ${user.id}</li>
            <li>User Name: ${user.name}</li>
            <li>User e-mail: ${user.email}</li>
          </ul>
        `;
      });
      jsonOutput.innerHTML = output;
    })
    .catch(err => console.log(err));
}

function getApiData() {
  // fetch('http://jsonplaceholder.typicode.com/posts')
  fetch('http://dummy.restapiexample.com/api/v1/employees')
    .then(res => res.json())
    .then(data => {
      let output = '<h2>API Data</h2>';
      data.data.forEach(post => {
        output += `
            <div>
              <h3>${post.id}</h3>
              <p>${post.employee_name}</p>
           </div>
          `;
      });
      apiOutput.innerHTML = output;
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
    .then(data => console.log(data));
}
