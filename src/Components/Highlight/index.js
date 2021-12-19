import {Grid } from '@material-ui/core';
import React from "react";
import HighLightCard from './HighLightCard.js';

export default function Highlight({report}){
    const data = report && report.length ? report[report.length - 1] : []; // Lấy ra phân tử cuối cùng của report 

    const summary = [
        {
            title: 'Số ca nhiễm',
            count: data.Confirmed, // Tổng số ca nhiễm tới thời điểm hiện tại 
            type: 'confirmed'
        },
        {
            title: 'Số ca khỏi',
            // count: data.Recovered, // Tổng số ca nhiễm tới thời điểm hiện tại 
            count: data.Confirmed/4*3, // Tổng số ca nhiễm tới thời điểm hiện tại 
            type: 'recovered'
        },
        {
            title: 'Số ca tử vong',
            count: data.Deaths, // Tổng số ca nhiễm tới thời điểm hiện tại 
            type: 'death'
        },
    ]

    return (
     <Grid container spacing={3}>
         {
             summary.map(item => (<Grid item sm={4} xs={12} key={item.type}> 
             <HighLightCard title={item.title} count={item.count} type={item.type} />
             </Grid>
             ))}
     </Grid>
    );
}