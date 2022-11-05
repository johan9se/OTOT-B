import {
    Box,
    Grid,
    Rating,
    Typography
} from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StoreIcon from '@mui/icons-material/Store';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import axios from 'axios';
import { SERVERLESS_CONVERTER } from '../configs';
import { STATUS_CODE_OK } from '../constants';

export default function BbtCard({ bbt_obj, handleEdit, handleDelete, ToCurrency = 'SGD' }) {
    const id = bbt_obj._id;
    const drink = bbt_obj.drink;
    const shop = bbt_obj.shop;
    const rating = bbt_obj.rating;
    const comments = bbt_obj.comments;
    const defaultCurrency = ToCurrency;
    const [price, setPrice] = useState(bbt_obj.price);
    const [fromCurrency, setFromCurrency] = useState('SGD');
    const [toCurrency, setToCurrency] = useState(ToCurrency.toUpperCase());

    const handleEditButton = () => {
        handleEdit(id);
    }

    const handleDeleteButton = () => {
        handleDelete(id);
    }

    const handleConvert = async () => {
        if (price) {
            let url = SERVERLESS_CONVERTER + '?from=' + fromCurrency + '&to=' + toCurrency + '&amount=' + price;
            const res = await axios.get(url).catch((err) => {
                if (err) {
                    console.log("cannot convert");
                    setPrice(price);
                }
            });
            if (res && res.status === STATUS_CODE_OK) {
                setPrice(res.data.toFixed(2));
                let temp = toCurrency;
                setFromCurrency(temp);
                setToCurrency(fromCurrency);
            }
        }
    }

    const roundBubbleButtons = {
        backgroundColor: '#59302C',
        borderRadius: '50%',
        color: '#FCE9D9',
        ml: 2,
        padding: '10px',
        "&:hover": {
            backgroundColor: '#FCE9D9',
            color: '#59302C',
        }
    };

    return (
        <Box
            id="bbt_card"
            sx={{
                background: '-webkit-linear-gradient(#F5BB88, #cd894e)',
                borderRadius: '16px',
                my: 2.5,
                padding: '20px'
            }}
        >   
            <Grid container spacing={1}>
			    <Grid item xs={9}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: '700'}}
                    >
                        {drink}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex'
                        }}    
                    >
                    <StoreIcon sx={{ mr: 1}}/><Typography variant="body1">{shop}</Typography>
                    </Box>
                    { price && (
                        <Box
                            sx={{
                                display: 'flex'
                            }}    
                        >
                        <MonetizationOnIcon sx={{ mr: 1}}/><Typography variant="body1">{price} {fromCurrency}</Typography>
                        </Box>
                    )}
                </Grid>
			    <Grid item 
                    xs={3} 
                    sx = {{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Rating sx={{ color: '#59302C' }} name="read-only" precision={0.5} value={rating} readOnly />
                </Grid>


			    <Grid item xs={9}>
                    <Typography variant="body2">{comments}</Typography>
                </Grid>
			    <Grid item 
                    xs={3} 
                    sx = {{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    { (price && defaultCurrency !== 'SGD') && (
                        <Box 
                            sx={roundBubbleButtons}
                            onClick={handleConvert}
                        >
                            <SwapHorizIcon />
                        </Box>
                    )}
                    
                    <Box 
                        sx={roundBubbleButtons}
                        onClick={handleEditButton}
                    >
                        <EditIcon />
                    </Box>
                    <Box 
                        sx={roundBubbleButtons}
                        onClick={handleDeleteButton}
                    >
                        <DeleteIcon />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
  }