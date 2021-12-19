import { Typography, Container } from '@material-ui/core';
import { sortBy } from 'lodash';
import { useEffect, useState } from 'react';
import { getCountries, getReportByCountry} from './apis';
import CountrySelector from './Components/CountrySelector';
import Highlight from './Components/Highlight';
import Summary from './Components/Summary';
import moment from 'moment';
import 'moment/locale/vi';
import '@fontsource/roboto';

moment.locale('vi');

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState('');
  const [report, setReport] = useState([]);


  useEffect(()=>{
    getCountries().then( (res) => { 
      // console.log({res});

      // Sắp xếp tên 
      const countries = sortBy(res.data, 'Country')
      setCountries(countries);

      setSelectedCountryID('vn');
    });
  },[]);

  const handleOnChange = (e) => {
    setSelectedCountryID(e.target.value);
  };

  
  useEffect(() => {
    if(selectedCountryID){
      const {Slug} = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryID
      );
  
      // Call API
      getReportByCountry(Slug).then((res) => {
        // console.log('getReportByCountry',{res})
        res.data.pop(); // xóa đi item cuối cùng trong ngày vì chưa hết ngày
        setReport(res.data);
      });
    }
  
  },[countries, selectedCountryID])

  return (
    <Container style={{marginTop: 20,  backgroundColor : '#191627'} }>
      <h1 style={{color: 'White'}} varian='h1' component='h1'>Theo dõi số liệu COVID-19</h1>
      <Typography style={{color: 'White'}}>{moment().format('LLL')}</Typography>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryID}/>  
      <Highlight report={report}/>  
      <Summary report={report} />
    </Container>
  );
}

export default App;
