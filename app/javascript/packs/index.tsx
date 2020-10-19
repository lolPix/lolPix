import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from "../components/nav/NavBar";

const App = () => (
    <div>
      <NavBar showLogo={true} account={undefined} />
    </div>
);

/* React entrypoint */
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
});
