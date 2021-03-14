import React from 'react';
import { Link } from 'gatsby';

export default function Nav(): JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/page1">Page1</Link>
        </li>
        <li>
          <Link to="/page1">Page2</Link>
        </li>
        <li>
          <Link to="/page1">Page3</Link>
        </li>
      </ul>
    </nav>
  );
}
