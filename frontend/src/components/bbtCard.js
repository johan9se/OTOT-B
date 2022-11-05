import {
    Box,
    Grid,
    Rating,
    Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StoreIcon from '@mui/icons-material/Store';

export default function BbtCard({ bbt_obj, handleEdit, handleDelete }) {
    const id = bbt_obj._id;
    const drink = bbt_obj.drink;
    const shop = bbt_obj.shop;
    const rating = bbt_obj.rating;
    const comments = bbt_obj.comments;

    const handleEditButton = () => {
        handleEdit(id);
    }

    const handleDeleteButton = () => {
        handleDelete(id);
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
                    <Box 
                        sx={roundBubbleButtons}
                        onClick={handleEditButton}
                    >
                        <EditIcon></EditIcon>
                    </Box>
                    <Box 
                        sx={roundBubbleButtons}
                        onClick={handleDeleteButton}
                    >
                        <DeleteIcon></DeleteIcon>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
  }