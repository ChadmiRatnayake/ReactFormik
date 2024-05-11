import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comments: '',
  address: ''
}

const onSubmit = values => {
  console.log('Form data', values)
}


const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string()
    .matches('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', 'Invalid email format')
    .required('Required'),
  channel: Yup.string().required('Required')
})

function YouTubeForm() {  

  // console.log('Form values', formik.values)
  // console.log('Form errors', formik.errors)
  // //visited fields
  // console.log('Form visited fields', formik.touched)

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        <Form>
            <div className='form-control'>
              <label htmlFor='name'>Name</label>
              <Field 
                type='text' 
                id='name' 
                name='name' 
              />
              <ErrorMessage name='name'/>
            </div>

            <div className='form-control'>
              <label htmlFor='email'>Email</label>
              <Field 
                type='email' 
                id='email' 
                name='email' 
              />
              <ErrorMessage name='email'/>
            </div>

            <div className='form-control'>
              <label htmlFor='channel'>Channel</label>
              <Field 
                type='text' 
                id='channel' 
                name='channel' 
              />
              <ErrorMessage name='channel'/>
            </div>

            <div className='form-control'>
              <label htmlFor='comments'>Comments</label>
              <Field as='textarea' id='comments' name='comments' />
            </div>

            <div className='form-control'>
              <label htmlFor='address'>Address</label>
              <Field name='address'>
                {
                  (props) => {
                    const {field, form, meta} = props
                    console.log('Render props',props)
                    return (
                      <div>
                        <input type='text' id='address' {...field}/>
                        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                      </div>                    
                    )
                  }
                }
              </Field>
            </div>

            <button type='submit'>Submit</button>

        </Form>
    </Formik>
  )
}

export default YouTubeForm