import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Rating,
    TextField,
    Typography
  } from '@mui/material';
  import { useEffect, useState, useCallback } from 'react';
  import axios from 'axios';
  import { URL_BBT_API } from '../configs';
  import { STATUS_CODE_OK, STATUS_CODE_CREATED, STATUS_CODE_BADREQ } from '../constants';
  
  export default function UpdateBbt({ bbt_id, setRefreshList }) {
    const mode = bbt_id ? 'edit' : 'add';
    const [drink, setDrink] = useState('');
    const [shop, setShop] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState(0);
    const [comments, setComment] = useState('');
    
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
  
    const fetchEntry = useCallback(async () => {
        const res = await axios.get(URL_BBT_API + bbt_id).catch((err) => {
            if (err.response.status === STATUS_CODE_BADREQ) {
                setAlertMsg('Something went wrong.');
            }
        });
        if (res && res.status === STATUS_CODE_OK) {
            const bbt_obj = res.data.data;
            setDrink(bbt_obj.drink);
            setShop(bbt_obj.shop);
            setPrice(bbt_obj.price || '');
            setRating(bbt_obj.rating);
            setComment(bbt_obj.comments);
        }
    }, [bbt_id]);

    useEffect(() => {
        if (mode === 'edit') {
            fetchEntry();
        }    
    }, [bbt_id, mode, fetchEntry]);

    const resetForm = () => {
        setDrink('');
        setShop('');
        setPrice('');
        setRating(0);
        setComment('');
        setRefreshList(true);
    };

    const handleSubmit = async () => {
        if (mode === 'add') {
            const res = await axios.post(URL_BBT_API, { drink, shop, price, rating, comments }).catch((err) => {
                if (err.response.status === STATUS_CODE_BADREQ) {
                    setErrorAlert('Invalid entry. Must include valid drink and shop.');
                } else {
                    setErrorAlert('Please try again later');
                }
            });
            if (res && res.status === STATUS_CODE_CREATED) {
                setSuccessAlert(res.data.message);
                resetForm();
            }
        } else if (mode === 'edit') {
            const res = await axios.put(URL_BBT_API + bbt_id, { drink, shop, price, rating, comments }).catch((err) => {
                if (err.response.status === STATUS_CODE_BADREQ) {
                    setErrorAlert('Invalid entry. Must include valid drink and shop.');
                } else {
                    setErrorAlert('Please try again later');
                }
            });
            if (res && res.status === STATUS_CODE_OK) {
                setSuccessAlert(res.data.message);
                resetForm();
            }
        }
        
    };
  
    const closeAlert = () => setAlertOpen(false);
  
    const setSuccessAlert = (msg) => {
        setAlertOpen(true);
        setAlertSeverity('success');
        setAlertTitle('YAY!');
        setAlertMsg(msg);
    };
  
    const setErrorAlert = (msg) => {
        setAlertOpen(true);
        setAlertSeverity('error');
        setAlertTitle('Error');
        setAlertMsg(msg);
    };
  
    return (
      <Box
        sx={{
          backgroundColor: '#cdd3a6',
          background: '-webkit-linear-gradient(#cdd3a6, #a0a671)',
          display: 'flex',
          justifyContent: 'center',
          alignSelf: 'center',
          minHeight: '100vh',
          height: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            mx: 'auto',
            pt: '30px',
            width: '80%'
          }}
        >
            <Typography
                variant="h3"
                sx={{
                mb: 5,
                fontSize: '2rem',
                fontFamily: 'Public Sans,sans-serif',
                fontWeight: '700',
                lineHeight: '1.5',
                '@media only screen and (min-width: 600px)': {
                    fontSize: '1.5rem'
                }
                }}
            >
                Bubble Tea Diary
            </Typography>
            <TextField
                label="Drink"
                variant="outlined"
                value={drink}
                onChange={(e) => setDrink(e.target.value)}
                sx={{ marginBottom: '1rem' }}
                autoFocus
            />
            <TextField
                label="Shop"
                variant="outlined"
                value={shop}
                onChange={(e) => setShop(e.target.value)}
                sx={{ marginBottom: '1rem' }}
            />
            <TextField
                label="Price (SGD)"
                variant="outlined"
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                sx={{ marginBottom: '2rem' }}
            />
            <Typography>Rating</Typography>
            <Rating
                label="Rating"
                defaultValue={2.5}
                precision={0.5}
                size="large"
                value={rating}
                onChange={(e, newVal) => setRating(newVal)}
                sx={{ color: '#808553', marginBottom: '2rem' }}
            />
            <TextField
                label="Comments"
                variant="outlined"
                multiline
                rows={3}
                value={comments}
                onChange={(e) => setComment(e.target.value)}
                sx={{ marginBottom: '2rem' }}
            />
            <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
                <Button variant={'contained'} onClick={handleSubmit}
                    sx={{
                        backgroundColor: '#59302C',
                        borderRadius: '20px',
                        color: '#FCE9D9',
                        "&:hover": {
                            backgroundColor: '#FCE9D9',
                            color: '#59302C',
                        }
                    }}
                >
                    {mode === 'add' ? 'Add new entry' : 'update'}
                </Button>
            </Box>

            {isAlertOpen && 
                <Alert severity={alertSeverity} onClose={closeAlert}
                    sx ={{
                        background: 'rgba(255,255,255, 0.5)',
                        bottom: '80px',
                        my: 2,
                    }}    
                >
                    <AlertTitle>{alertTitle}</AlertTitle>
                    {alertMsg}
                </Alert>
            }
        </Box>
      </Box>
    );
  }