import React from 'react';
import {ReverseLink} from 'react-router-reverse';


export default class Search extends React.Component {
  static propTypes = {
    q: React.PropTypes.string,
    results: React.PropTypes.array,
    search: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      q: null
    };
  }

  handleChange = e => {
    var q = e.target.value;
    this.setState({q});
    this.props.search(q);
  }

  render() {
    return (
      <div className="search">
        <input className="search-input" name="q" placeholder="Search..."
               type="search" onChange={this.handleChange}
               value={this.state.q}/>
        {this.state.q && this.props.q === this.state.q &&
         !this.props.results.length &&
          <div>
            <p>No results found for <b>"{this.state.q}"</b></p>
          </div>
        }

        {this.props.results.length && this.state.q &&
          <ul className="search-results">
            {this.props.results.map(result =>
              <li className="search-result">
                <ReverseLink to="addon-review-detail"
                             params={{slug: result.slug}}>
                  {result.name} ({result.slug})
                </ReverseLink>
              </li>
            )}
          </ul>
        || ''}
      </div>
    );
  }
}
