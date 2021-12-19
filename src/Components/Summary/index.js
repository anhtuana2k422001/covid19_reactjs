import {Grid } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import LineChartConfirmed from "../Charts/LineChartConfirmed";
import LineChartRecovered from "../Charts/LineChartRecovered";
import LineChartDeaths from "../Charts/LineChartDeaths";

export default function Summary({report, selectedCountryID}){
    const [,setMapData] = useState({});
    useEffect(()=>{ // 'vn' , 'us'
        if(selectedCountryID){
             import(
              `@highcharts/map-collection/countries/${selectedCountryID}/${selectedCountryID}-all.geo.json`     // thư viện map khi thêm vào cài đặt lúc đầu
              ).then((res)=> setMapData(res)); 
        }
    },[selectedCountryID]);

    return <div style={{marginTop: 10}}>
         <Grid container spacing={3}>
            <Grid item sm={12} xs={12}> 
                <LineChartConfirmed data={report}/>
            </Grid>
            <Grid item sm={12} xs={12}> 
                <LineChartRecovered data={report}/>
            </Grid>
            <Grid item sm={12} xs={12}> 
                <LineChartDeaths data={report}/>
            </Grid>
        </Grid>
    </div>   
}

