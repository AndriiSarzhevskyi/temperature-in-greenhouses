
import { makeStyles } from '@material-ui/core/styles'


export const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },

    dark: {
        background: '#282c34',
    },

    main: {
        height: '100vh',
        width: '100vw',
    },

    mainBlock: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(8),
    },

    topspacing: {
        marginTop: theme.spacing(4),
    },

    analyzTxt: {
        marginTop: theme.spacing(4),
        textAlign: 'justify',
        fontSize: '16px'
    },

    spaceRight: {
        marginRight: "4px",
    },

    acceptBtn: {
        backgroundColor: "#2e7d32",
    }
}));

