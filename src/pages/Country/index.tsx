import React, { FC, useEffect, useState, useCallback  } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ICountry } from '../../interfaces/country';
import { CountryService } from '../../services/country';
import { RootState } from '../../redux/strore';
import { setAllCountry, setError, setLoader, selectCountry } from '../../redux/country';

const CountryPage: FC = () => {
    const navigate = useNavigate();
    const {value: countryList, isLoading: loading} = useSelector((state: RootState) => state.country);
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

      if (loading) {
        return <div>Loading data..</div>
      }

      return (
          <div>
              Country page
              {
                countryList.map((data: ICountry, index: number) => {
                  return (
                    <div key={index}>
                      <p>id: {index}</p>
                      <p>name: {data.name}</p>
                      <p>flag: {data.flags.png}</p>
                      <button onClick={() =>onClick(data)}>Get user</button>
                      <hr/>
                    </div>
                  )
                })
              }
          </div>
      );
}

export default CountryPage;
