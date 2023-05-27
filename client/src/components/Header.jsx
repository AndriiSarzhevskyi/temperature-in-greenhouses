import { Container, Button, AppBar, Typography, Toolbar } from '@material-ui/core';
import { useStyles } from '../styles/styles';

export const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position='static' >
            <Container fixed>
                <Toolbar variant="dense">
                    <Container >
                        <Typography variant='h6' className={classes.title}>Greenhouse Weather</Typography>
                    </Container>
                </Toolbar>
            </Container>
        </AppBar>
    )
}