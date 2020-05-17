import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

function Square(props) {
    const {val, onClick} = props;

    return (
        <div className="square" onClick={() => onClick()}>
            {val}
        </div>
    );
}

Square.propTypes = {
    val: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Square;
