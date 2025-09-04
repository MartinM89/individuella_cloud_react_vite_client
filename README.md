<a id="readme-top"></a>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

### Built With

- [![React.js][react.js-image]][react-url]
- [![TypeScript][ts-image]][ts-url]
- [![Node.js][node.js-image]][node.js-url]

## Getting Started

Here are some steps on how to make the client work locally, all steps are required to start the client.

### Prerequisites

- Install Node.js locally using this [link][node.js-url-dwn]

### Installation

1. Clone the repo.

```sh
git clone https://github.com/MartinM89/individuella_cloud_react_vite_client
```

2. Install NPM packages

```sh
npm install
```

3. If you will connect an api add the url to .env file.

```js
VITE_API_BASE_URL = {ENTER YOUR API KEY};
```

4. Change git remote url to avoid accidental pushes to base project.

```sh
git remote set-url origin github_username/repo_name
git remote -v # confirm the changes
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

1. Open up your terminal and run `npm run dev`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Documentation

Components

`App.tsx`
Purpose: Renders a form with input fields based on `inputs` array.

States:

- formInfo, keep track of all information in the form
- errorMessage, keeps track of the earliest invalid input by the user
- isErrorVisibile, checks if an error needs to be shown. Is set to either 'hidden' or 'visible'
- isLoading, disables 'submit' button function while fetching to avoid multiple requests to the api

Constants:

- inputs, keeps track of all input fields to render. Example below

```js
const inputs = [
  { type: 'text', name: 'userName', placeholder: 'Username' },
  { type: 'password', name: 'password', placeholder: 'Password' },
];
```

```js
inputs.map(input => {
  return (
    <>
      <input
        name={input.name}
        type={input.type}
        placeholder={input.placeholder}
      />
    </>
  );
});
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Martin - [Linkdin](https://www.linkedin.com/in/martin-michail/) - saadv89@gmail.com

Project Link: [https://github.com/MartinM89/individuella_cloud_react_vite_client](https://github.com/MartinM89/individuella_cloud_react_vite_client)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[react.js-image]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[node.js-image]: https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white
[node.js-url]: https://nodejs.org/en
[ts-image]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[ts-url]: https://www.typescriptlang.org/
[node.js-url-dwn]: https://nodejs.org/en/download
