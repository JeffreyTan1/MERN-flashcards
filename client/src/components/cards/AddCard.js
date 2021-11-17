import React, {useState} from 'react'
import { useHistory } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useFieldArray, useForm} from 'react-hook-form'
import { createCard } from '../../actions/cardActions';
import { editDeck } from '../../actions/deckActions';

export default function AddCard ({deck_id}) {

  const schema = yup.object().shape({
    front: yup.string().min(3, 'must be at least 3 characters').required(),
    tags: yup.array().of(
      yup.object().shape({
        value: yup.string().min(1, 'must be at least 3 characters')
        .max(100, 'max 100 characters')
        .required()
      })
    )
  })
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const {fields, append, remove} = useFieldArray({name: 'tags', control})

  const [error, setError] = useState('')
  const history = useHistory();

  const onSubmit = (data) => {
    data.tags = data.tags.map(tag => tag.value)
    data.addingTo = true
    console.log(data)
    let documentID = null
    createCard(data).then((res) => {
      console.log(res.data.status)
      documentID = res.data.document.insertedId
      if (deck_id) {
        const addCardData = {deck_id: deck_id, card_id: documentID, addingTo: true}
        editDeck(addCardData).then((res) => {
          console.log(res.data.status)
        }).catch((error) => {
          console.error(error.message)
          setError(error.message)
        })
        window.location.reload(false);
      }
      history.push('/cards')
      
    }).catch((error) => {
      console.log(error.message)
      setError(error.message)
    }) 
  }

  return (
    <div className="container">
      <h1>Add Card</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea name="front" className="form-control"  {...register("front")} />
          <p>{errors.front?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea name="back" className="form-control" type="text" {...register("back")} />
          <p>{errors.back?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                name={`tags[${index}]`}
                className="form-control"
                {...register(`tags.${index}.value`)} 
              />
              {errors.tags?.[index]?.value?.message}
              <button className="btn btn-dark" onClick={() => remove(index)}>Remove tag</button>
            </div>
          ))}
        </div>

        <button className="btn btn-dark" onClick={() => append({})}>Add tag</button>
        
        <div className="form-group">
            <p>{error}</p>
        </div>

        <div className="form-group">
          <input className="btn btn-primary mr-2" type="submit" />
        </div>
      </form>
    </div>
    )
}