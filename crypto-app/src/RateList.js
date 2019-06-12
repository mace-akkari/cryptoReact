import React from 'react';
import './RateList.css';

const getRate = (rate) => (
    <li className="ratesBorder" key={rate.currency}>
        <p>{rate.currency}</p>
        <p>{rate.value}</p>
    </li>
);

const getList = (rates) => {
    if (rates == null) {
        return "No rates available";
    } else if (rates.length === 0) {
        return "Empty rates list"
    } else {
        return rates.map(getRate)
    }
}
const RateList = (props) => {
    const { rates } = props;
    return (
        <ul className="rate-list">
            {getList(rates)}
        </ul>
    );
}

export default RateList;