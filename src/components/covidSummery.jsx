import React from 'react';
import Card from './card';
import NimberFormat from 'react-number-format';
import NumberFormat from 'react-number-format';

function covidSummery(props) {
    const { totalConfirmed, totalRecovered, totalDeaths, country } = props
    return (
        <div>
            <h1 style={{ textTransform: 'capitalize' }}>{country == "" ? "World wide corona report" : country}</h1>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Card>
                    <span>Total Confirmed</span><br />
                    <span><NumberFormat value={totalConfirmed}
                        displayType={'text'}
                        thousandSeparator={true}
                    /></span>
                </Card>
                <Card>
                    <span>Total Recovered</span><br />
                    <span><NumberFormat value={totalRecovered}
                        displayType={'text'}
                        thousandSeparator={true}
                    /></span>
                </Card>
                <Card>
                    <span>Total Deaths</span><br />
                    <span><NumberFormat value={totalDeaths}
                        displayType={'text'}
                        thousandSeparator={true}
                    /></span>
                </Card>
            </div>
        </div>
    )
}

export default covidSummery;