import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presentPage: this.props.initialPage || 1,
    }
  }

  changePage = (newPage) => {
    const { onPageChange } = this.props;
    this.setState({ presentPage: newPage });
    onPageChange(newPage);
  }

  render() {
    const { pages, show } = this.props;
    const { presentPage } = this.state;
    const prevButton = <li className="pagination__list__item" onClick={() => this.changePage(presentPage - 1)}>&lt;</li>
    const nextButton = <li className="pagination__list__item" onClick={() => this.changePage(presentPage + 1)}>&gt;</li>
    if (!show) { return null }
      return (
        <div className="pagination">
          <ul className="pagination__list"> 
            {(presentPage > 1) ? prevButton : ''}
            {[...Array(pages)].map((el, page) =>
              <li
                key={++page}
                onClick={() => { this.changePage(page) }}
                className={`pagination__list__item${((page) === presentPage) ? ' pagination__list__item--active' : ''}`}>
                {page}
              </li>
            )}
            {(presentPage === pages && pages !== 0) ? '' : nextButton}
          </ul  >
        </div>
      );
    
  }
}

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  initialPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;