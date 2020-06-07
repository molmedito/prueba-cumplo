import React from 'react';

// Material UI
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// Moment
import MomentUtils from '@date-io/moment';
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

function disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
}

const DatePicker = ({
    handleDateChange,
    date,
    type,
    format = 'DD/MM/YYYY',
    minDate = new Date(`${new Date().getFullYear() - 2}/${new Date().getMonth() + 1}/${new Date().getDate()}`),
    maxDate = new Date(),
}) => {
    const _id = `date-picker-${type}`;
    const invalidDateMessage = 'Formato de fecha inválido';

    const handleExternalDateChange = (date, type) => {
        handleDateChange(date, type)
    }

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
                className="styled-datepicker"
                variant="inline"
                margin="normal"
                format={format}
                id={_id}
                invalidDateMessage={invalidDateMessage}
                disableToolbar
                value={date}
                shouldDisableDate={date => disableWeekends(date._d)}

                minDate={minDate}
                minDateMessage={'No puedes poner una fecha menor a la mínima.'}
                
                maxDate={maxDate}
                maxDateMessage={'No puedes poner una fecha mayor a la máxima.'}
                
                onChange={date => handleExternalDateChange(date, type)}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    )
}

export default DatePicker;