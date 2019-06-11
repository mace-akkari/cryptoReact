import React from 'react';
import './RateList.css';

const getRate = (rate) => (
    <li key={rate.currency}>
        <p>{rate.currency}</p>
        <p>{rate.value}</p>
    </li>
);

const RateList = (props) => {
    const { rates } = props;
    return (
        <ul className="rate-list">
            {rates.map(getRate)}
        </ul>
    );
}

export default RateList;