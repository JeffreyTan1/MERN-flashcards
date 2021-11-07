import React from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router';
import { Plus, Dash } from 'react-bootstrap-icons'
import { useMutation } from 'react-query'
import {create} from '../../actions/cardActions';

export function AddCard ({props}) {
  const validationSchema = Yup.object().shape({
    front: Yup.string()
        .required('Front is required'),
    back: Yup.string()
        .required('Back is required')
  })
  const history = useHistory()
  const mutation = useMutation(data => {create(data)})

  return (
    <div className="container">
      <h1>Add Card</h1>
      
      <Formik
        initialValues={{
          user_id: '',
          front: '',
          back: '',
          tags: ['']
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const data = {
            user_id: values.user_id,
            front: values.front,
            back: values.back,
            tags: values.tags
          }
          mutation.mutate(data)
          alert(JSON.stringify(values, null, 2))
          history.push('/cards')
        }}
        render={({ errors, status, touched }) => (
          <Form>
              <div className="form-group">
                  <label htmlFor="front">Front</label>
                  <Field name="front" type="text" className={'form-control' + (errors.front && touched.front ? ' is-invalid' : '')} />
                  <ErrorMessage name="front" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                  <label htmlFor="back">Back</label>
                  <Field name="back" type="text" className={'form-control' + (errors.back && touched.back ? ' is-invalid' : '')} />
                  <ErrorMessage name="back" component="div" className="invalid-feedback" />
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