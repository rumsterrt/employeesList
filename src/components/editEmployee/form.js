import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextField, CheckboxField, SelectField, DatePickerField, PhoneField } from 'components/formUI'
import moment from 'moment'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const EmployeeSchema = () =>
    Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too short!')
            .required('Required'),

        role: Yup.string()
            .oneOf(['driver', 'waiter', 'cook'])
            .required('Required'),

        phone: Yup.string().required('Required'),

        birthday: Yup.string().required('Required'),

        isArchive: Yup.bool(),
    })

const EditForm = ({ employee = {}, onSubmit }) => {
    const formik = {
        initialValues: {
            name: employee.name || '',
            role: employee.role || '',
            phone: employee.phone || '',
            birthday: employee.birthday || '',
            isArchive: employee.isArchive || false,
        },
        onSubmit,
        validationSchema: EmployeeSchema,
        enableReinitialize: true,
    }

    return (
        <Formik {...formik}>
            <Form>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField id="name" name="name" label="Name" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectField
                            fullWidth
                            name="role"
                            label="Role"
                            options={[
                                { value: 'driver', label: 'Driver' },
                                { value: 'waiter', label: 'Waiter' },
                                { value: 'cook', label: 'Cook' },
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PhoneField id="phone" name="phone" label="Phone" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <DatePickerField id="birthday" name="birthday" label="Birthday" fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <CheckboxField color="secondary" name="isArchive" label="Is archive" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Sumbit
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}

export default EditForm
