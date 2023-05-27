import { useState, useEffect, Fragment } from 'react';
import { useHttp } from "../hooks/http.hook";

import { LineChart } from './LineChart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, Grid, TextField, Paper, Backdrop, CircularProgress } from '@material-ui/core';
import { useStyles } from '../styles/styles';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';

import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Analyz } from './Analyz';


export const MainComponent = (props) => {
    const classes = useStyles();
    const { request, loading, error } = useHttp();

    const [form, setForm] = useState({ name: '', id: '' });
    const [id, setId] = useState("");
    const [display, setDisplay] = useState(false);
    const [greenhouses, setGreenhouses] = useState([]);
    const [chartdata, setChartdata] = useState();
    const [show_chart, setShow_chart] = useState(false);
    const [loader, setLoader] = useState(false);
    const [analyzdata, setAnalyzdata] = useState();

    useEffect(() => {
        getgreenhousesHandler();
    }, [request]);

    useEffect(() => {
        if (error != null) {
            showError(error);
        }
    }, [error]);

    useEffect(() => {
        setLoader(loading);
    }, [loading]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const getgreenhousesHandler = async () => {
        try {
            await request('/api/greenhouse/getgreenhouses', 'GET').then(res => {
                const arr = [];
                for (let i in res.data) {
                    arr.push(res.data[i]);
                }
                setGreenhouses(arr);
            });
        }
        catch (e) { }
    }

    const createHandler = async event => {
        event.preventDefault();
        try {
            await request('/api/greenhouse/create', 'POST', form).then(res => {
                showSuccessHandler(res.message);
                getgreenhousesHandler();

            }).then(newGreenhouseHandler());
        }
        catch (e) { }
    }

    const showHandler = async event => {
        event.preventDefault();
        try {
            await request(`/api/temperatures/${id}`, 'GET').then(res => {
                let mas = [];
                const created = new Date(res.created);
                let sum = 0;
                let sum_prev_last_seven = 0;
                let sum_last_seven = 0;
                for (let i = 0; i < res.value.length; i++) {
                    let date = new Date();
                    date.setDate(created.getDate() + i);
                    let d = date.toLocaleDateString('eu');
                    mas.push({ date: d, temperature: res.value[i] });
                    sum += parseFloat(res.value[i]);
                    if (i >= res.value.length - 7 && i < res.value.length) {
                        sum_last_seven += parseFloat(res.value[i]);
                    }
                    if (i >= res.value.length - 14 && i < res.value.length - 7) {
                        sum_prev_last_seven += parseFloat(res.value[i]);
                    }
                    setAnalyzdata({ name: res.name, average: sum / res.value.length, prev_seven_average: sum_prev_last_seven / 7, last_seven_average: sum_last_seven / 7 });

                }

                setChartdata({
                    labels: mas.map((m) => m.date),
                    datasets: [
                        {
                            label: res.name,
                            data: mas.map((m) => m.temperature),
                            fill: false,
                            borderColor: "#742774"
                        },
                    ],
                });
                if (res.value != null) {
                    setShow_chart(true);
                }
            });
        }
        catch (e) { }
    }

    const newGreenhouseHandler = event => {
        if (display === false) {
            setDisplay(true);
        }
        else if (display === true) {
            setDisplay(false);
        }
    }

    const changeGreenhouseHandler = (event, val) => {
        if (val != null) {
            setId(val.id);
        }
    }

    const showSuccessHandler = (text) => {
        toast.success(`${text}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const showError = (text) => {
        toast.error(`${text}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <main className={classes.mainBlock}>

            <Container maxWidth="md">
                <FormControl fullWidth>
                    <form onSubmit={showHandler}>
                        <Grid container spacing={2} justifyContent="center" alignContent='center'>
                            <Grid >
                                <Autocomplete
                                    className={classes.autoComplete}
                                    variant="outlined"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={greenhouses}
                                    getOptionLabel={option => option.name}
                                    sx={{ width: 250 }}
                                    renderInput={(params) => <TextField required {...params} label="Greenhouse" />}
                                    onChange={changeGreenhouseHandler}
                                />
                            </Grid>
                            <Grid item >
                                <Button type="submit" variant="contained" color='primary'>Show</Button>
                            </Grid>

                            {display === false && <Grid item>
                                <Button variant="contained" color="secondary" onClick={newGreenhouseHandler}><AddIcon></AddIcon></Button>
                            </Grid>}
                        </Grid>
                    </form>
                </FormControl>
                {display === true &&
                    <FormControl fullWidth>
                        <form className={classes.topspacing} onSubmit={createHandler}>
                            <Grid container spacing={2} justifyContent="center" alignContent='center'>
                                <Grid item>
                                    <TextField id="outlined-basic" label="New greenhouse" variant="outlined" size='small' name='name' onChange={changeHandler} required />
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={1} justifyContent="center" alignContent='center'>
                                        <Grid item>
                                            <Button type="submit" variant="contained" color="success"><DoneIcon></DoneIcon></Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color='error' onClick={newGreenhouseHandler}><CloseIcon></CloseIcon></Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </FormControl>
                }
                {show_chart === true && chartdata != null && <Container maxWidth='md' className={classes.topspacing}>
                    <Paper>
                        <LineChart data={chartdata}></LineChart>
                    </Paper>
                    <Paper className={classes.analyzTxt}>
                        <Analyz data={analyzdata}></Analyz>
                    </Paper>
                </Container>}
            </Container>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ToastContainer />
        </main>
    );
}