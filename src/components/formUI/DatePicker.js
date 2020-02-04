import React from 'react'
import FieldWithError from './FieldWithError'
import moment from 'moment'

import TextField from '@material-ui/core/TextField'

export default ({ style, name, hint, label, ...props }) => (
    <FieldWithError
        style={style}
        name={name}
        hint={hint}
        render={({ field, form }) => {
            const date = field.value && moment(field.value).format('YYYY-MM-DD')

            return (
                <TextField
                    {...props}
                    type="date"
                    value={date}
                    onChange={e => {
                        form.setFieldValue(name, moment(e.target.value).valueOf(), false)
                    }}
                    error={!field || !!field.error}
                />
            )
        }}
    />
)
