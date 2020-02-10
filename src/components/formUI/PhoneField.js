import React from 'react'
import FieldWithError from './FieldWithError'
import InputMask from 'react-input-mask'

import TextField from '@material-ui/core/TextField'

export default ({ style, name, error, ...props }) => (
    <FieldWithError
        style={style}
        name={name}
        render={({ field }) => (
            <InputMask {...field} mask="+7 (999) 999 99 99" maskChar=" ">
                {() => <TextField {...props} type="text" error={!field || !!field.error}></TextField>}
            </InputMask>
        )}
    />
)
