import React from 'react'
import _ from 'lodash'
import { Field } from 'formik'

export default ({ style, name, render, hint, className }) => (
    <Field
        name={name}
        render={({ field, form }) => {
            const hasError = _.get(form.touched, name) && _.get(form.errors, name)

            return (
                <div style={style} className={className}>
                    {render({
                        field: {
                            ...field,
                            error: hasError,
                        },
                        form,
                    })}
                    {hasError && <div>{_.get(form.errors, name)}</div>}
                </div>
            )
        }}
    />
)
