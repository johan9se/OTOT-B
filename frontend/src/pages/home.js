import {
	Grid
} from '@mui/material';

import ViewBbt from './viewBBT' 
import UpdateBbt from './updateBBT' 
import { useEffect, useState } from 'react';

export default function Home() {
	const [bbt_id, setBbtId] = useState('');
	const [refresh, setRefreshList] = useState(false);

    useEffect(() => {
		setBbtId('');
		if (refresh)
			setRefreshList(false);
	}, [refresh]);
	
    const handleEdit = async (bbt_id) => {
		setBbtId(bbt_id);
    }

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={12} md={4}>
				<UpdateBbt bbt_id={bbt_id} setRefreshList={setRefreshList}></UpdateBbt>
			</Grid>
			<Grid item xs={12} sm={12} md={8}>
				<ViewBbt handleEdit={handleEdit} refresh={refresh}></ViewBbt>
			</Grid>
		</Grid>
	);
}
