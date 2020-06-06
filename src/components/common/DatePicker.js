import React from 'react';

// Material UI
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// Moment
import MomentUtils from '@date-io/moment';
import moment from "moment";
import "moment/locale/es";
moment.locale("es");


const DatePicker = ({
    handleDateChange,
    date,
    type,
    format = 'DD/MM/YYYY',
    minDate = null,
    maxDate = minDate ? (new Date(`${new Date(minDate).getFullYear() + 2}/${new Date(minDate).getMonth() + 1}/${new Date(minDate).getDate()}`)) : (new Date(`${new Date().getFullYear() + 4}/${new Date().getMonth() + 1}/${new Date().getDate()}`)),
}) => {
    const aidi = `date-picker-${type}`;
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
                id={aidi}
                invalidDateMessage={invalidDateMessage}
                disableToolbar
                value={date}

                minDate={minDate ? minDate : new Date(`${new Date().getFullYear() - 2}/${new Date().getMonth() + 1}/${new Date().getDate()}`)}
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