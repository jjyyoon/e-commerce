import React from "react";
import { withRouter } from "react-router-dom";
import { debounce } from "lodash";
import { handleFetch } from "../../handle-fetch";

import { MenuItem, Search } from "semantic-ui-react";
import "./search-box.styles.scss";

const initialState = { isLoading: false, results: [], value: "", minCharacters: false };

class SearchBox extends React.Component {
  state = initialState;

  handleResultSelect = (e, { result }) => {
    this.setState(initialState);

    const { history } = this.props;
    history.push(`/shop/${result.category}`);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (value.length < 2) {
        return this.setState({ isLoading: false, results: [], minCharacters: false });
      }

      handleFetch("/shop/search", { value }).then(results => {
        this.setState({ isLoading: false, results, minCharacters: true });
      });
    }, 300);
  };

  render() {
    const { isLoading, results, value, minCharacters } = this.state;

    return (
      <MenuItem>
        <Search
          category
          input={{ placeholder: "Search" }}
          loading={isLoading}
          noResultsMessage={
            minCharacters ? "No results found." : "Please enter two or more characters."
          }
          onResultSelect={this.handleResultSelect}
          onSearchChange={debounce(this.handleSearchChange, 500, { leading: true })}
          results={results}
          value={value}
        />
      </MenuItem>
    );
  }
}

export default withRouter(SearchBox);
