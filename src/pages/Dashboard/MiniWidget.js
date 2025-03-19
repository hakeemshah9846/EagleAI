import PropTypes from 'prop-types';
import React from "react";
import { Col, Card, CardBody } from "reactstrap";
import CountUp from 'react-countup';
import ReactApexChart from "react-apexcharts";

const MiniWidget = () => {
    const series1 = [{
        data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54]
    }];

    const options1 = {
        fill: {
            colors: ['#5b73e8']
        },
        chart: {
            width: 70,
            sparkline: {
                enabled: !0
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
            crosshairs: {
                width: 1
            },
        },
        tooltip: {
            fixed: {
                enabled: !1
            },
            x: {
                show: !1
            },
            y: {
                title: {
                    formatter: function (seriesName) {
                        return '';
                    }
                }
            },
            marker: {
                show: !1
            }
        }
    };

    const series2 = [70];

    const options2 = {
        fill: {
            colors: ['#34c38f']
        },
        chart: {
            sparkline: {
                enabled: !0
            }
        },
        dataLabels: {
            enabled: !1
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '60%'
                },
                track: {
                    margin: 0
                },
                dataLabels: {
                    show: !1
                }
            }
        }
    };

    const reports = [
        {
            id: 1,
            title: "Deceased",
            value: 3415,
            prefix: "",
            suffix: "",
            decimal: 0,
            charttype: "bar",
            chartheight: 40,
            chartwidth: 70,
            color: "success",
            series: series1,
            options: options1,

        },
        {
            id: 2,
            title: "Non-Residential",
            value: 5643,
            decimal: 0,
            charttype: "radialBar",
            chartheight: 45,
            chartwidth: 45,
            prefix: "",
            suffix: "",
            color: "danger",
            series: series2,
            options: options2,
        },
    ];

    return (
        <React.Fragment>
            { reports.map((report, key) => (
                <Col md={5} xl={6} key={key}>
                    <Card style={{ height: '90px' }}>
                        <CardBody>
                            <div className="float-end mt-2">
                                <ReactApexChart
                                    options={report.options}
                                    series={report.series}
                                    type={report.charttype}
                                    height={report.chartheight}
                                    width={report.chartwidth}
                                />
                            </div>
                            <div>
                                <h4 className="mb-1 mt-1"><span><CountUp end={report.value} separator="," prefix={report.prefix} suffix={report.suffix} decimals={report.decimal} /></span></h4>
                                <p className="text-muted mb-0">{report.title}</p>
                            </div>
                            <p className="text-muted mt-3 mb-0"><span className={"text-" + report.color + " me-1"}><i className={report.icon + " me-1"}></i>{report.badgeValue}</span>{" "}{report.desc}
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </React.Fragment>
    );
};

export default MiniWidget;

MiniWidget.propTypes = {
    reports: PropTypes.array
};