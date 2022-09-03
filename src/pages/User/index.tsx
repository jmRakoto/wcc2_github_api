import React, { FC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUser } from '../../interfaces';
import { ICountry } from '../../interfaces/country';
import { IItem } from '../../interfaces/user';
import { selectCountry } from '../../redux/country';
import { RootState } from '../../redux/strore';
import { setAllUser, setError, setLoader } from '../../redux/user';
import { UserService } from '../../services/user';

const UserPage: FC = () => {
  const {value:coutryList, country: country} = useSelector((state: RootState) => state.country);
  const {value: userList, isLoading: loading} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<String>('');

  const fetchList = useCallback(async () => {
    dispatch(setLoader(true));
    try {
      const datas: IUser = await UserService.getAllUser(country.name, 1);
      dispatch(setAllUser(datas))
    } catch (error) {
      dispatch(setError({type: 'x', value: true}));
    } finally {
      dispatch(setLoader(false));
    }
  }, [country]);

  useEffect(() => {
    if(country.name != '') {
      fetchList();
    } else {
      navigate('/country', {replace: true});
    }
  }, [fetchList]);

  const onChangeField = (e: any) => {
    const { name, value } = e.target;
    setSearchValue(value);
  }

  const onSelectCountry = (e: any) => {
    dispatch(selectCountry({
      name: e.target.value,
      flags: {
        svg: "",
        png: ""
      }
    }));
  }

  if (loading) {
    return <div>Loading data..</div>
  }

  return (
      <div>
        <p>User number: {userList.total_count}</p>
        <label>Search user by userName:</label>
        <input name="search" onChange={onChangeField}/>
        <br/>
        <label>Selectionner un pays:</label>
        <select onChange={onSelectCountry} value={country.name}>
          {coutryList.map((data: ICountry, index: number) => (
            <option key={index} value={data.name}>{data.name}</option>
          ))}
        </select>
        {
          userList.items.map((data: IItem) => {
            return (
              <div key={data.id}>
                <p>id: {data.id}</p>
                <p>name: {data.login}</p>
                <p>avatar: {data.avatar_url}</p>
                <hr/>
              </div>
            )
          })
          }
      </div>
    );
}

export default UserPage;
