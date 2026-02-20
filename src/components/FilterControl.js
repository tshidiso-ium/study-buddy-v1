import React, {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import HashLoader from "react-spinners/HashLoader";


export default function FilterControl({yearSelected, subjectSelected, term}) {
  const [filter, setFilter] = useState('');
  const [yearList,setYearList] = useState();
  const [subjectList,setSubjectList] = useState();
  const [termList, setTermList] = useState();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  var subject = [
    {id:"math",name:"Mathematics "},
    {id:"mathLit",name:"Mathematical Literacy"},
    {id:"lifeScience",name:"Life Science"},
    {id:"economics",name:"Economics"},
    {id:"geography",name:"Geography"},
    {id:"business",name:"Business Studies"},
    {id:"accounting",name:"Accounting"},
    {id:"englishHl",name:"English HL"},
    {id:"physicalScience",name:"Physical Science"},
    {id:"lifeOrientation",name:"Life Orientation"},
    {id:"lifeScience",name:"Life Science"}
  ]
  var year = [
    {id:"year16",name:"2016"},
    {id:"year17",name:"2017"},
    {id:"year18",name:"2018"},
    {id:"year19",name:"2019"},
    {id:"year20",name:"2020"},
    {id:"year21",name:"2021"},
    {id:"year22",name:"2022"},
    {id:"year23",name:"2023"}
  ]

  var term = [
    {id:"term1",name:"Term 1"},
    {id:"term2",name:"Term 2"},
    {id:"term3",name:"Term 3"},
    {id:"term4",name:"Term 4"}
  ]

  const handleSubjectChange = async (event) => {
    console.log(event.target.value)
    setSubjectList(event.target.value)
    subjectSelected(event.target.value)
  };

  const handleYearChange = async (event) => {
    console.log(event.target.value)
    setYearList(event.target.value)
    yearSelected(event.target.value)
  };

/*
term selecter component          
  <Box sx={{  minWidth: 50 }}>
    <FormControl fullWidth>
      <InputLabel id="select-term">Term</InputLabel>
      <MapTermList list={term} />
      <br/>
    </FormControl>
  </Box>
*/

  const handleTermChange = async (event) => {
    console.log(event.target.value)
    setTermList(event.target.value)

  };


  const MapSubjectList = ({list}) => {
    return(
        <Select
          labelId="select-year"
          id="select-year-select"
          value={subjectList}
          label="Subject"
          onChange={handleSubjectChange}
          MenuProps={MenuProps}
        >
          {

            list.map(item => (
              <MenuItem sx={{width: 1/1}} key={item.id} value={item.name}>{item.name}</MenuItem>
              ))
          }

        </Select>
               
    )
  }

  const MapYearList = ({list}) => {
    return(
        <Select
          labelId="select-year"
          id="select-year-select"
          value={yearList}
          label="Year"
          onChange={handleYearChange}
          MenuProps={MenuProps}
        >
          {
            list.map(item => (
              <MenuItem sx={{width: 1/1}} key={item.id}  value={item.name} >{item.name}</MenuItem>
              ))
          }

        </Select>
               
    )
  }

  const MapTermList = ({list}) => {
    return(
        <Select
          labelId="select-term"
          id="select-term-select"
          value={termList}
          label="Term"
          onChange={handleTermChange}
          MenuProps={MenuProps}
        >
          {

            list.map(item => (
              <MenuItem sx={{width: 1/1}} key={item.id}  value={item.id}>{item.name}</MenuItem>
              ))
          }

        </Select>
               
    )
  }

  return (
    <div>
        {
        subject ?
            <div>
              <Box sx={{ minWidth: 50 }}>
                <FormControl fullWidth>
                  <InputLabel id="select-subject">Subject</InputLabel>
                  <MapSubjectList list={subject} />
                  <br/>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 50 }}>
                <FormControl fullWidth>
                  <InputLabel id="select-year">Year</InputLabel>
                  <MapYearList list={year} />
                  <br/>
                </FormControl>
              </Box>
            </div>

          :
            <HashLoader  size={50} color={"#4267B2"} loading={true} speedMultiplier={1.0} />
        }
    </div>
    
  );
}