import {
    Box,
    Grid
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import { URL_BBT_API } from '../configs';
  import { STATUS_CODE_CONFLICT, STATUS_CODE_OK } from '../constants';
  
  import BbtCard from '../components/bbtCard';

  export default function ViewBbt({ handleEdit, refresh }) {
    const [bbts, setBbts] = useState([]);
  
    const fetchData = async () => {
        const res = await axios.get(URL_BBT_API).catch((err) => {
            if (err.response.status === STATUS_CODE_CONFLICT) {
            console.log('This username already exists');
            } else {
            console.log('Please try again later');
            }
        });
        if (res && res.status === STATUS_CODE_OK) {
            setBbts(res.data.data);
        }
    }

    const handleDelete = async (bbt_id) => {
        const res = await axios.delete(URL_BBT_API + bbt_id).catch((err) => {
            if (err.response.status === STATUS_CODE_CONFLICT) {
            console.log('Please try again later');
            }
        });
        if (res && res.status === STATUS_CODE_OK) {
            fetchData();
        }    
    }

    useEffect(() => {
        fetchData();
    }, [refresh]);
  
    return (
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
            height: '100vh',
            overflow: 'auto',
            paddingX: '16px'
            }}
        >
            <Grid container spacing={3}>
                {bbts.length > 0 && (
                    <Grid item xs={12} sm={12} md={12}>
                    {bbts.map(bbt => (
                        <BbtCard key={bbt._id} bbt_obj={bbt} handleEdit={handleEdit} handleDelete={handleDelete}></BbtCard>
                    ))}
                    </Grid>
                )}
            </Grid>
        </Box>
    );
  }