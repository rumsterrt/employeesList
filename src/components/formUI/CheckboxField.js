import React from 'react'
import FieldWithError from './FieldWithError'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default ({ style, name, hint, label, ...props }) => (
    <FieldWithError
        style={style}
        name={name}
        hint={hint}
        render={({ field, form }) => (
            <FormControlLabel
                control={
                    <Checkbox
                        {...props}
                        checked={Boolean(field.value)}
                        value={Boolean(field.value)}
                        onChange={e => {
                            form.setFieldValue(name, e.target.checked, false)
                        }}
                    />
                }
                label={label}
            />
        )}
    />
)
