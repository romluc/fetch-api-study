const outputContainer = document.querySelector('.container');

const btnText = document.querySelector('#get-text');
const btnJson = document.querySelector('#get-json');
const btnApi = document.querySelector('#get-api-data');

const textOutput = document.querySelector('.text-output');
const jsonOutput = document.querySelector('.json-output');
const apiOutput = document.querySelector('.api-output');

btnText.addEventListener('click', getText);
btnJson.addEventListener('click', getJson);
btnApi.addEventListener('click', getApiData);

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
  fetch('http://jsonplaceholder.typicode.com/posts/1')
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      res.json();
    })
    .then(data => {
      //   let output = '<h2>API Data</h2>';
      //   data.forEach(post => {
      //     output += `
      //       <div>
      //         <h3>${post.cod}</h3>
      //         <p>${post.cnt}</p>
      //       </div>
      //     `;
      //   });
      console.log(data);
      // apiOutput.innerHTML = output;
    });
}
