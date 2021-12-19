import { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highchart from 'highcharts';
import React from "react";
import moment from 'moment';
import { ButtonGroup, Button } from '@material-ui/core';


const generateOptions = (data) => {
    const categories = data.map((item) =>moment(item.Date).format('DD/MM/YYYY'));
    console.log({categories});
    return {
        chart: {
            height: '500',
        },
        title: {
            text: 'Tổng Ca Khỏi Bệnh',
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ['#28a745'],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
        },
        tooltip: {
            // headerFormat: '<span style="font-size: 10px">{point.key}</span><table>',
            // pointFormat: 
            //     '<tr><td style="color: {series.color}; padding:0"> {series.name}: </td>' +
            //     '<td style="padding: 0"><b>{poin.y} ca</b></td>></tr>',
            // footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            columns: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Tổng ca khỏi bệnh',
                data: data.map((item)=> Math.round(item.Confirmed/4*3)),
            },
        ],
    }

}

export default function LineChart({data}){
    console.log("LineChart:", {data});
    const [options, setOptions] = useState({});
    const [reportType, setreportType] = useState('all');

    useEffect(()=>{
        // xử lý thay đổi reportype ( ngày xem )
        let customData = [];
        
        switch(reportType){
            case 'all':
                customData = data;
                break;
            case '30':
                customData = data.slice(data.length - 30); // cắt 30 item đâu để lấy dữ liệu 
                break;
            case '7':
                customData = data.slice(data.length - 7);
                break;
            default:
                customData = data;
                break;
        }

        setOptions(generateOptions(customData));
    },[data, reportType])
    
    return (
        <div>
        <ButtonGroup size="small" style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button style={reportType === 'all' ? {color: '#28a745'} : {color: 'gray'}} onClick={() => setreportType('all')}>Tất cả</Button>
            <Button style={reportType === '30' ? {color: '#28a745'} : {color: 'gray'}} onClick={() => setreportType('30')}>30 ngày</Button>
            <Button style={reportType === '7' ? {color: '#28a745'} : {color: 'gray'}}  onClick={() => setreportType('7')}>7 ngày</Button>
        </ButtonGroup>
         <HighchartsReact
            highcharts = {Highchart}
            options = {options}/>
        </div>   
    )
}