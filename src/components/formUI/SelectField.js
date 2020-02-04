import React from 'react'
import FieldWithError from './FieldWithError'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

export default ({ style, name, options, hint, label, ...props }) => (
    <FieldWithError
        style={style}
        name={name}
        hint={hint}
        render={({ field, form }) => (
            <FormControl {...props} error={!field || !!field.error}>
                {label && <InputLabel id={name}>{label}</InputLabel>}
                <Select
                    value={field.value}
                    onBlur={() => form.setFieldTouched(name, true)}
                    onChange={option => {
                        form.setFieldValue(name, option.target.value)
                    }}
                    labelId={name}
                    id={name}
                >
                    {options &&
                        options.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        )}
    />
)
