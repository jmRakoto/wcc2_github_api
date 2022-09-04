import React, { FC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Container, Grid, TextField, Box, InputAdornment,  
  Button, InputLabel, MenuItem, Table, TableBody,
  TableCell, TableHead, TableRow, Paper, TableContainer, Avatar, TablePagination
} from '@mui/material';
import {Search as SearchIcon} from '@mui/icons-material/';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { IUser } from '../../interfaces';
import { ICountry } from '../../interfaces/country';
import { IItem } from '../../interfaces/user';
import { selectCountry } from '../../redux/country';
import { RootState } from '../../redux/strore';
import { setAllUser, setError, setLoader, setPerPage, setPage } from '../../redux/user';
import { UserService } from '../../services/user';
import moment from 'moment';
import CustomizedDialogs from '../../components/dialog';
import { LoaderTable } from '../../components/loader';

const UserPage: FC = () => {
  const {value:coutryList, country: country} = useSelector((state: RootState) => state.country);
  const {value: userList, isLoading: loading, page, perPage} = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>('');
  const [openProfilDialog, setOpenProfilDialog] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<IItem>();

  const fetchList = useCallback(async () => {
    dispatch(setLoader(true));
    try {
      const datas: IUser = await UserService.getAllUser(country.name, page, perPage, searchValue);
      dispatch(setAllUser(datas))
    } catch (error) {
      dispatch(setError({type: 'x', value: true}));
    } finally {
      dispatch(setLoader(false));
    }
  }, [country, page, perPage, searchValue]);

  useEffect(() => {
    if(country.name != '') {
      fetchList();  
    } else {
      navigate('/country', {replace: true});
    }
  }, [country, page, perPage]);

  const onChangeField = (e: any) => {
    const { name, value } = e.target;
    setSearchValue(value);
  }

  const onSearch = () => {
    fetchList();
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
    setProfileData(data);
    setOpenProfilDialog(true);
  }

  const handleChangePage = useCallback((e: any, page: number) => {
    dispatch(setPage(page));
  }, [])

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPerPage(parseInt(event.target.value)));
  }, [])

  const formatedDate = useCallback((date: string) => {
    return moment(date).format('LL')
  }, [])

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
                value={searchValue}
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
                  disabled={loading}
                >
                  {coutryList.map((data: ICountry, index: number) => (
                    <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                  ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button disabled={loading} color="primary" variant="contained" fullWidth={true} onClick={onSearch}>
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
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Profil</TableCell>
                </TableRow>
              </TableHead>
              {
                loading?<LoaderTable/>: 
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
                      <TableCell>{row.login}</TableCell>
                      <TableCell align="right">
                        <Button size="small" color="primary" variant="contained" onClick={() => onClickProfil(row)}>
                          Profil
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              }
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={userList.total_count}
              rowsPerPage={perPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
        {profileData && <CustomizedDialogs setOpen={setOpenProfilDialog} open={openProfilDialog} user={profileData} />}
      </Container>
    );
}

export default UserPage;
