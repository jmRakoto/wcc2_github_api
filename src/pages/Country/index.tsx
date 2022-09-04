import React, { FC, useEffect, useState, useCallback  } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, TextField, Box, InputAdornment, CircularProgress } from '@mui/material';
import {Search as SearchIcon} from '@mui/icons-material/';
import { ICountry } from '../../interfaces/country';
import { CountryService } from '../../services/country';
import { RootState } from '../../redux/strore';
import { setAllCountry, setError, setLoader, selectCountry, searchCountry } from '../../redux/country';
import CountryCardItem from '../../components/countryCardItem';
import { Loader } from '../../components/loader';

const CountryPage: FC = () => {
    const navigate = useNavigate();
    const {value: countryList, isLoading: loading, searchList: values} = useSelector((state: RootState) => state.country);
    const dispatch = useDispatch();

    const fetchList = useCallback(async () => {
        dispatch(setLoader(true));

        try {
          const datas: ICountry[] = await CountryService.getCountryList();
          dispatch(setAllCountry(datas))
        } catch (error) {
          dispatch(setError({type: 'x', value: true}));
        } finally {
          dispatch(setLoader(false));
        }
      }, []);
    
      useEffect(() =>{
        fetchList();
      }, [fetchList])

      const onClick = (data: ICountry) => {
        dispatch(selectCountry(data));
        navigate('/user');
      }

      const onChange = (e: any) => {
        const {name, value} = e.target;
        dispatch(searchCountry(value));
      }

      if (loading) {
        return <Loader />
      }

      return (
          <Container>
            <Box sx={{ marginY:2 }} >
              <TextField 
                id="outlined-basic" 
                label="Rechercher un pays" 
                variant="outlined" 
                onChange={onChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                }}
                />
            </Box>
            <Grid container rowSpacing={2}>
              {
                values.map((data: ICountry, index: number) => {
                  return (
                    <Grid key={index} item xs={12} sm={3}>
                      <CountryCardItem data={data} onClick={() => onClick(data)}/>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Container>
      );
}

export default CountryPage;
