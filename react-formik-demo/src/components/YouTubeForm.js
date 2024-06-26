import React from 'react'
import {Formik, Form, Field, ErrorMessage, FieldArray, FastField} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comments: '',
  address: '',
  // group together some data
  social: {
    facebook: '',
    twitter: ''
  },
  // when dealing with a list of values
  phoneNumbers: ['', ''],
  // dynamic form control
  phNumbers: ['']
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

//custom validation
const validateComments = value => {
  let error
  if(!value){
    error = 'Required'
  }
  return error
}

function YouTubeForm() {  

  // console.log('Form values', formik.values)
  // console.log('Form errors', formik.errors)
  // //visited fields
  // console.log('Form visited fields', formik.touched)

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        // formik runs validation onChange, onBlur of any field and onSubmit 
        validateOnChange={false}
        //validateOnBlur={false}
        >               
        <Form>
            <div className='form-control'>
              <label htmlFor='name'>Name</label>
              <Field 
                type='text' 
                id='name' 
                name='name' 
              />
              <ErrorMessage name='name' component={TextError}/>
            </div>

            <div className='form-control'>
              <label htmlFor='email'>Email</label>
              <Field 
                type='email' 
                id='email' 
                name='email' 
              />
              <ErrorMessage name='email'>
                {
                  (errorMsg) => <div className='error'>
                    {errorMsg}
                  </div>
                }
              </ErrorMessage>
            </div>

            <div className='form-control'>
              <label htmlFor='channel'>Channel</label>
              <Field 
                type='text' 
                id='channel' 
                name='channel' 
              />
              <ErrorMessage name='channel' component={TextError}/>
            </div>

            <div className='form-control'>
              <label htmlFor='comments'>Comments</label>
              <Field 
                as='textarea' 
                id='comments' 
                name='comments' 
                validate={validateComments}
              />
              <ErrorMessage name='comments' component={TextError}/>
            </div>

            <div className='form-control'>
              <label htmlFor='address'>Address</label>
              {/* If a field component is independent from all other fields then we can use FastField.
              FastField prevents rerendering the fields even when another field is changed. 
              (Field component rerenders the components at each time a field is changed) */}
              <FastField name='address'>
                {
                  (props) => {
                    console.log('Field render')
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
              </FastField>
            </div>

            <div className='form-control'>
              <label htmlFor='facebook'>Facebook profile</label>
              <Field type='text' id='facebook' name='social.facebook'/>
            </div>

            <div className='form-control'>
              <label htmlFor='twitter'>Twitter profile</label>
              <Field type='text' id='twitter' name='social.twitter'/>
            </div>

            <div className='form-control'>
              <label htmlFor='primaryPh'>Primary phone number</label>
              <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
            </div>

            <div>
              <label htmlFor='secondaryPh'>Secondary phone number</label>
              <Field type='text' id='secondaryPh' name='phoneNumbers[1]'/>
            </div>

            {/*Dynamic form control (if the user wish to add mutiple numbers, allow him to add*/}
            <div className='form-control'>
              <label>List of phone numbers</label>
              <FieldArray name='phNumbers'>
                {
                  (fieldArrayProps) => {
                    // console.log('field array props', fieldArrayProps)
                    // extract following properties
                    const {push, remove, form} = fieldArrayProps
                    const {values} = form
                    const {phNumbers} = values
                    // formik runs validation onChange, onBlur of any field and onSubmit 
                    console.log('form errors', form.errors)
                    return <div>
                      {
                        phNumbers.map((phNumbers, index) => (
                          <div key={index}>
                            <Field name={`phNumbers[${index}]`}/>
                            {
                              index > 0 && 
                              <button type='button' onClick={() => remove(index)}>-</button>
                            }
                            <button type='button' onClick={() => push('')}>+</button>
                          </div>
                        ))
                      }
                    </div>
                  }
                }
              </FieldArray>
            </div>

            <button type='submit'>Submit</button>

        </Form>
    </Formik>
  )
}

export default YouTubeForm