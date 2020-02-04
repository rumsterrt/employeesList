import React from 'react'
import FieldWithError from './FieldWithError'
import MaskedInput from 'react-text-mask'

import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

const TextMaskCustom = ({ inputRef, ...other }) => (
    <MaskedInput
        {...other}
        ref={ref => {
            inputRef(ref ? ref.inputElement : null)
        }}
        mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
    />
)

export default ({ style, name, hint, error, label, ...props }) => (
    <FieldWithError
        style={style}
        hint={hint}
        name={name}
        render={({ field }) => (
            <FormControl {...props}>
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Input {...field} id={name} inputComponent={TextMaskCustom} error={!field || !!field.error} />
            </FormControl>
        )}
    />
)
