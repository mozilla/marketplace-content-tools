import React from 'react';


export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p>
          Except where otherwise <a href="http://www.mozilla.org/about/legal.html#site">
          noted</a>, content on this site is licensed under
          the <a href="http://creativecommons.org/licenses/by-sa/3.0/">Creative
          Commons Attribution Share-Alike License v3.0</a> or any
          later version.
        </p>
        <nav>
          <ul>
            <li>
              <a href={`${process.env.MKT_ROOT}privacy-policy`}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href={`${process.env.MKT_ROOT}terms-of-use`}>
                Terms of Use
              </a>
            </li>
            <li>
              <a href="https://www.mozilla.org/legal/fraud-report/index.html">
                Report Trademark Abuse
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    );
  }
}
