import React from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router';
import { Plus, Dash } from 'react-bootstrap-icons'

export function AddDeck ({props}) {

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Deck name is required')
        .min(4, 'Name must be at least 4 characters')
        .max(25, 'Name must be at most 25 characters'),
  })

  const history = useHistory()

  return (
    <div className="container">
      <h1>Add Deck </h1>
      
      <Formik
        initialValues={{
          name: '',
          user_id: '',
          cards: [''],
          tags: ['']
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
          history.push('/')
        }}
        render={({ errors, status, touched }) => (
          <Form>
              <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                  <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <FieldArray name="tags" type="text" className={'form-control' + (errors.tags && touched.tags ? ' is-invalid' : '')} >
                    {
                      fieldArrayProps => {
                        const {push, remove, form} = fieldArrayProps
                        const {values} = form
                        const {tags} = values
                        return (
                          <div>
                            {tags.map((tag, index) => (
                              <div key={index}>
                                <Field name={`tags[${index}]`} type="text"/>
                                {
                                  index > 0 && (
                                   <button type="button" onClick={()=>remove(index)} className="btn btn-secondary btn-sm"> <Dash/> </button> 
                                  )
                                }
                                
                                <button type="button" onClick={()=>push(null)} className="btn btn-secondary btn-sm"> <Plus/> </button>
                              </div>
                            ))}
                          </div>
                        )
                      }
                    }
                  </FieldArray>
                  <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-primary mr-2">Add</button>
              </div>
          </Form>
      )}
      />

    </div>
    )
}