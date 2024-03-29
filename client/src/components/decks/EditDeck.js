import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useFieldArray, useForm} from 'react-hook-form'
import { getDeck, updateDeck } from '../../actions/deckActions';

export default function EditDeck () {
  const {id} = useParams();
  const [deck, setDeck] = useState({})

  const schema = yup.object().shape({
    name: yup.string().min(3, 'must be at least 3 characters').required(),
    tags: yup.array().of(
      yup.object().shape({
        value: yup.string().min(1, 'must be at least 3 characters')
        .max(100, 'max 100 characters')
        .required()
      })
    )
  })
  
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    getDeck(id).then((res) => {
      let data = (res.data.deck)
      setDeck(data)
      const tags = data.tags.map(tag => ({value: tag}))
      const values = {
        name: data.name,
        tags: tags
      }
      reset(values)
    }).catch((error) => {
      console.error(error.message)
    }
    )
  }, [id, reset])

  const {fields, append, remove} = useFieldArray({name: 'tags', control})

  const history = useHistory()
  const [error, setError] = useState('')

  const onSubmit = (data) => {
    data.tags = data.tags.map(tag => tag.value)
    data.deck_id = deck._id
    updateDeck(data).then((res) => {
      console.log(res.data.status)
      history.push('/decks')
    }).catch((error) => {
      console.log(error.message)
      setError(error.message)
    }) 
  }

  return (
    <div className="container">
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input name="name" className="form-control" type="text" {...register("name")} />
          <p>{errors.name?.message}</p>
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