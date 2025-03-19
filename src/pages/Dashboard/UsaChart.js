import React, { useEffect, useRef } from 'react';
import { Col, Card, CardBody } from 'reactstrap'; // Assuming you're using reactstrap
import { Chart as ChartJS, registerables } from 'chart.js';
import { ChoroplethController, GeoFeature, ProjectionScale, ColorScale } from 'chartjs-chart-geo';
import { feature } from 'topojson-client';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

// Register Chart.js components
ChartJS.register(ChoroplethController, GeoFeature, ProjectionScale, ColorScale, ...registerables);

const ChoroplethMap = () => {
    const chartRef = useRef(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetch('https://unpkg.com/us-atlas/states-10m.json')
            .then((response) => response.json())
            .then((us) => {
                const nation = feature(us, us.objects.nation).features[0]; // Use the imported `feature` function
                const states = feature(us, us.objects.states).features; // Use the imported `feature` function
                const colors = ['#d1bb54', '#c9b037', '#dfca63', '#d5af03'];

                const chart = new ChartJS(chartRef?.current?.getContext('2d'), {
                    type: 'choropleth',
                    data: {
                        labels: states.map((d) => d.properties.name),
                        datasets: [
                            {
                                label: 'States',
                                outline: nation,
                                backgroundColor: colors,
                                data: states.map((d) => ({ feature: d, value: Math.random() * 10 })),
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            projection: {
                                axis: 'x',
                                projection: 'albersUsa',
                            },
                            color: {
                                axis: 'x',
                                quantize: 5,
                                interpolate: (v) => (v < 0.5 ? '#dfca63' : '#c9b037'),
                                legend: {
                                    position: 'bottom-right',
                                    align: 'bottom',
                                },
                            },
                        },
                        onClick: (event) => {
                            const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);

                            if (elements.length) {
                                const element = elements[0];
                                console.log(element);
                            }

                            // Navigate to another route using useNavigate
                            navigate('/list');
                        },
                    },
                });
            });
    }, [navigate]); // Add navigate to the dependency array

    return (
        <Col xl="12">
            <Card no-body="true">
                <CardBody>
                    <canvas id="canvas" ref={chartRef}></canvas>
                </CardBody>
            </Card>
        </Col>
    );
};

export default ChoroplethMap;