import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL_BBT_API } from '../configs';
import { STATUS_CODE_BADREQ, STATUS_CODE_OK } from '../constants';

import BbtCard from '../components/bbtCard';

export default function ViewBbt({ handleEdit, refresh }) {
    const { currency } = useParams();
    const [bbts, setBbts] = useState([]);

    const fetchData = async () => {
        setBbts([]);
        const res = await axios.get(URL_BBT_API).catch((err) => {
            if (err.response.status === STATUS_CODE_BADREQ) {
                console.log('Please try again later');
            }
        });
        if (res && res.status === STATUS_CODE_OK) {
            setBbts(res.data.data);
        }
    }

    const handleDelete = async (bbt_id) => {
        const res = await axios.delete(URL_BBT_API + bbt_id).catch((err) => {
            if (err.response.status === STATUS_CODE_BADREQ) {
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
            height: '100%',
            overflow: 'auto',
            paddingX: '16px'
            }}
        >
            <Grid container spacing={3}>
                {bbts.length > 0 ? (
                    <Grid item xs={12} sm={12} md={12}>
                    {bbts.map(bbt => (
                        <BbtCard key={bbt._id} bbt_obj={bbt} handleEdit={handleEdit} handleDelete={handleDelete} ToCurrency={currency}></BbtCard>
                    ))}
                    </Grid>
                ) : (
                    <Typography
                        variant="h3"
                        sx={{
                        margin: 'auto',
                        fontSize: '2rem',
                        fontFamily: 'Public Sans,sans-serif',
                        fontWeight: '700',
                        lineHeight: '1.5',
                        '@media only screen and (min-width: 600px)': {
                            fontSize: '1.5rem'
                        }
                        }}
                    >
                        No Records Found
                    </Typography>
                )}
            </Grid>
        </Box>
    );
  }