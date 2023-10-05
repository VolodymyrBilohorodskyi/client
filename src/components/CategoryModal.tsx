import { FC } from 'react'
import { Form } from 'react-router-dom'

interface Props {
  type: 'post' | 'patch'
  id?: number
  setVisibleModal: (visible: boolean) => void
}

export const CategoryModal: FC<Props> = ({ type, id, setVisibleModal }) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-black/50'>
      <Form
        action='/categories'
        method={type}
        onSubmit={() => setVisibleModal(false)}
        className='grid w-[300px] gap-2 rounded-md bg-slate-900 p-5'
      >
        <label htmlFor='title'>
          <small>Cayegory title</small>
          <input className='input w-full' type='text' name='title' placeholder='Title...' />
          <input
            className='input w-full'
            type='hidden'
            name='id'
            value={id}
            placeholder='Title...'
          />
        </label>
        <div className='flex items-center gap-2'>
          <button className='btn btn-green' type='submit'>
            {type === 'patch' ? 'Save' : 'Create'}
          </button>
          <button className='btn btn-red' onClick={() => setVisibleModal(false)}>
            Close
          </button>
        </div>
      </Form>
    </div>
  )
}
