import React, { FC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Container, Grid, TextField, Box, InputAdornment,  
  Button, InputLabel, MenuItem, Table, TableBody,
  TableCell, TableHead, TableRow, Paper, TableContainer, Avatar
} from '@mui/material';
import {Search as SearchIcon} from '@mui/icons-material/';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    // setSearchValue(value);
    console.log(value);
    
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

  const onClickProfil= (data: IItem) =>  {
    console.log(data);
  }

  if (loading) {
    return <div>Loading data..</div>
  }

  return (
      <Container>
        <Box sx={{ marginY:2, padding:2 }} bgcolor="#F6F5F8">
          <Grid container justifyContent='space-evenly' alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField 
                id="outlined-basic" 
                label="Rechercher" 
                variant="outlined"
                fullWidth={true}
                style={{
                  backgroundColor: "white"
                }}
                onChange={onChangeField}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pays</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country.name}
                  label="Pays"
                  onChange={onSelectCountry}
                  style={{
                    backgroundColor: "white"
                  }}
                >
                  {coutryList.map((data: ICountry, index: number) => (
                    <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                  ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button size="small" color="primary" variant="contained" fullWidth={true}>
                Rechercher
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ height: 250, width: '100%' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="right">Profil</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.items.map((row: IItem, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Avatar
                        alt={row.avatar_url}
                        src={row.avatar_url}
                        sx={{ width: 56, height: 56 }}
                      />
                    </TableCell>
                    <TableCell align="center">{row.login}</TableCell>
                    <TableCell align="right">
                      <Button size="small" color="primary" variant="contained" onClick={() => onClickProfil(row)}>
                        Profil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    );
}

export default UserPage;
