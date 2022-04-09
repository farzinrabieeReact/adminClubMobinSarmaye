import React, { useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Button, Checkbox, Input, MenuItem } from '@material-ui/core';
import DataPicker from '../../../../../common/components/datePicker';
import TimePicker from '../../../../../common/components/timePicker';
import { convertDigitToEnglish } from '../../../../../common/method/convertDigitToEnglish';

const useStyles = makeStyles((theme) => ({
	ModalAdd: {
		minWidth: 1100,
		borderRadius: 8,
		padding: 15,
		backgroundColor: 'white',
		paddingTop: '50px'
	},
	root: {
		padding: '20px 0',
		width: '90%',
		margin: 'auto',
		'& .MuiBox-root': {
			margin: theme.spacing(1)
		}
	},
	btns: {
		margin: '0px 0 10px 0',
		textAlign: 'right',
		width: '95%'
	},
	fieldset: {
		border: '0'
	}
}));

export default function Index({ handleChangeText, state, handleSubmit, handleExit }) {
	const classes = useStyles();
	// const [ title, setTitle ] = useState(data ? data.title : '');
	// const [ link, setLink ] = useState(data ? data.link : '');
	const dispatch = useDispatch();

	const [ checked, setChecked ] = useState('FALSE');

	const handleChange = (event) => {
		if (event.target.checked) {
			let trueCaps = 'TRUE';
			setChecked(trueCaps);
		} else {
			let falseCaps = 'FALSE';
			setChecked(falseCaps);
		}
	};

	useEffect(
		() => {
			handleChangeText(checked, 'has_credit');
		},
		[ checked ]
	);

	

	// const [ selectedDate, setSelectedDate ] = useState(new Date('2014-08-18T21:11:54'));

	// const handleDateChange = (date) => {
	// 	setSelectedDate(date);
	// };

	// const handleSubmitUpdate = () => {
	//     if (!title || !link) {
	//         alert("عنوان یا لینک را پر نکرده اید");
	//         return
	//     }

	//     let parsDataPrev = JSON.parse(dataPrev[0].body.content)
	//     let dataNew = { title, link }
	//     let setDataInsert = [...parsDataPrev, dataNew]

	//     let id = dataPrev[0].id

	//     if (data) {
	//         let dataUpdate = parsDataPrev.map(item => {
	//             if (item.title === data.title) {
	//                 return { title, link }
	//             }
	//             return item
	//         })
	//         dispatch(telegram_link_v1_update_actions(JSON.stringify(dataUpdate), id))
	//     } else {
	//         dispatch(telegram_link_v1_update_actions(JSON.stringify(setDataInsert), id))
	//     }

	//     setNewButton(false)
	// }

	// const handleSubmit = ()=>{
	//     setresultSubmit([state])
	// }

	// const [time, settime] = useState(null);

	// useEffect(()=>{
	// 	console.log(convertDigitToEnglish(time?.format("hh:mm:ss.000000")))
	// },[time])

	// const handleChangeTime = (value) => {
	// 	// settime(prev => ({
	// 	// 	...prev, [type]: value
	// 	// }))
	// 	settime(value)
	// }

	return (
		<div className={classes['ModalAdd']}>
			<h3 style={{margin:'25px 20px'}}>تعریف عرضه اولیه جدید</h3>
			<div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '60px', width: '90%' }}>
				<Box width={250}>
					<TextField
						label={'نام عرضه'}
						onChange={(event) => handleChangeText(event.target.value, 'stock_name')}
						helperText=""
						value={state.ipoName}
						size="small"
						fullWidth
						variant="outlined"
						margin="dense"
						type="text"
					/>
				</Box>
				<Box width={250}>
					<TextField
						
						label={'حداکثر تعداد سهم'}
						onChange={(event) => handleChangeText(event.target.value, 'max_quantity')}
						helperText=""
						type="number"
						size="small"
						fullWidth
						variant="outlined"
						margin="dense"
					/>
				</Box>

				<Box width={300}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
							height: 60
						}}
					>
						<span>آستانه قیمت : </span>
						<TextField
							
							helperText=""
							size="small"
							variant="outlined"
							margin="dense"
							type="number"
							style={{ width: 100 }}
							onChange={(event) => handleChangeText(event.target.value, 'min_price')}
						/>
						<span style={{ margin: '0 5px' }}> تا </span>
						<TextField
							
							helperText=""
							size="small"
							variant="outlined"
							margin="dense"
							type="number"
							style={{ width: 100 }}
							onChange={(event) => handleChangeText(event.target.value, 'max_price')}
						/>
					</div>
				</Box>
			</div>








			<div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '60px', width: '90%' }}>
				<Box width={250}>
					<TextField
						
						label={'حداقل مجموع ارزش دارایی'}
						helperText=""
						size="small"
						variant="outlined"
						margin="dense"
						type="number"
						onChange={(event) => handleChangeText(event.target.value, 'total_value')}
					/>
				</Box>
				<Box width={250}>
					<TextField
					
						label={'حداقل مجموع ارزش پرتفوی'}
						helperText=""
						size="small"
						variant="outlined"
						margin="dense"
						type="number"
						onChange={(event) => handleChangeText(event.target.value, 'portfo_value')}
					/>
				</Box>
				<Box width={250}>
					<TextField
						// id="standard-select-currency"
						label={'حداقل مانده حساب'}
						helperText=""
						size="small"
						variant="outlined"
						margin="dense"
						type="number"
						onChange={(event) => handleChangeText(event.target.value, 'account_remain')}
					/>
				</Box>
			</div>














			<div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '60px', width: '90%' }}>
				<Box width={250}>
					<DataPicker label={'تاریخ عرضه'} value={state.dateIpo?state.dateIpo:null} setValue={(data)=>handleChangeText(data, 'dateIpo')}>
		
					</DataPicker>
				</Box>
				<Box width={250}>
					<DataPicker label={'تاریخ شروع ثبت نام'} value={state.dataStart?state.dataStart:null}  setValue={(data)=>handleChangeText(data, 'dataStart')}>
					</DataPicker>
				</Box>
				<DataPicker label={'تاریخ پایان ثبت نام'} value={state.dateEnd?state.dateEnd:null}  setValue={(data)=>handleChangeText(data, 'dateEnd')}>
				</DataPicker>
			</div>










			<div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '60px', width: '90%' }}>
				<Box>
					<TimePicker
						label={'date'}
						// time={time}
						// SetTime={settime}
						handleChangeText={handleChangeText}
					/>
				</Box>
				<Box>
					<TimePicker
						label={'start'}
						// time={time}
						// SetTime={settime}
						handleChangeText={handleChangeText}
					/>
				</Box>
				<Box>
					<TimePicker
						label={'end'}
						// time={time}
						// SetTime={settime}
						handleChangeText={handleChangeText}
					/>
				</Box>
			</div>











			<div style={{ marginBottom: '60px', width: '90%',display:'flex' }}>
				<Box style={{ marginRight: '20px' }} width={300}>
					<TextField
						// id="standard-select-currency"
						label={'آیزین'}
						onChange={(event) => handleChangeText(event.target.value, 'isin')}
						helperText=""
						fullWidth
						size="small"
						variant="outlined"
						margin="dense"
					/>
				</Box>
				<Box style={{ marginRight: '20px' }} width={250}>
					<Checkbox
						color="default"
						inputProps={{ 'aria-label': 'checkbox with default color' }}
						onChange={handleChange}
					/>
					<span>وضعیت قرداد اعتباری </span>
				</Box>
			</div>






			<div style={{ display: 'flex', justifyContent: 'flex-end', margin :'30px 40px 30px 30px'}}>
				<button className="btnsGreen" style={{ marginLeft: '10px' }} onClick={handleSubmit}>
					ذخیره
				</button>
				<button className="btnsRed" onClick={handleExit}>
					انصراف
				</button>
			</div>







		</div>
	);
}

const is_visible = [
	{
		value: 'ومدیر',
		label: 'ومدیر'
	},
	{
		value: 'ولکار',
		label: 'ولکار'
	}
];
