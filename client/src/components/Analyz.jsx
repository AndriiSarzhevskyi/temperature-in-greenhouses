import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

export const Analyz = (props) => {
    const [field, setField] = useState();
    useEffect(() => {
        if (props.data != null) {
            if (props.data.last_seven_average > props.data.prev_seven_average) {
                setField(textField1);
            }
            else if (props.data.last_seven_average < props.data.prev_seven_average) {
                setField(textField2);
            }
            else if (props.data.last_seven_average == props.data.prev_seven_average) {
                setField(textField3);
            }
        }
    }, [props]);

    const textField1 = (
        <Typography>Over the past seven days, the average temperature has been {(props.data.last_seven_average).toFixed(3)} degrees, which is {(props.data.last_seven_average - props.data.prev_seven_average).toFixed(3)} degrees more than in the previous seven days.</Typography>
    );
    const textField2 = (
        <Typography>Over the past seven days, the average temperature has been {(props.data.last_seven_average).toFixed(3)} degrees, which is {(props.data.prev_seven_average - props.data.last_seven_average).toFixed(3)} degrees less than in the previous seven days.</Typography>
    );
    const textField3 = (
        <Typography>Over the past seven days, the average temperature has been {(props.data.last_seven_average).toFixed(3)} degrees, which is in line with the previous similar period..</Typography>
    );
    return (
        <Container maxWidth="sm">
            <Typography>The average temperature in the greenhouse "{props.data.name}" for the entire observation period: {(props.data.average).toFixed(3)} degrees.</Typography>
            {field}
        </Container>
    )
}