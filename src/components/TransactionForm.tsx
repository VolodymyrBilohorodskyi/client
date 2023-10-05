import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import { CategoryModal } from './CategoryModal'

export const TransactionForm: FC = () => {
  const { categories } = useLoaderData() as IResponseTransactionLoader
  const [visibleModal, setVisibleModal] = useState(false)
  return (
    <div className='rounded-md bg-slate-800 p-4'>
      <Form className='grid gap-2' method='post' action='/transactions'>
        <label className='grid' htmlFor='title'>
          <span>Title</span>
          <input
            type='text'
            name='title'
            className='input border-slate-700'
            placeholder='Title...'
            required
          />
        </label>
        <label className='grid' htmlFor='amount'>
          <span>Amount</span>
          <input
            type='number'
            name='amount'
            className='input border-slate-700'
            placeholder='Amount...'
            required
          />
        </label>
        {categories.length ? (
          <label htmlFor='category' className='grid'>
            <span>Category</span>
            <select className='input border-slate-700 bg-slate-800' name='category' required>
              {categories.map((category, idx) => (
                <option key={idx} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <h1 className='mt-1 text-red-300'>To continue create a category first</h1>
        )}

        <button
          type='button'
          onClick={() => setVisibleModal(true)}
          className='flex max-w-fit items-center gap-2 text-white/50 hover:text-white'
        >
          <FaPlus />
          <span>Manage Categories:</span>
        </button>

        <div className='flex items-center gap-4'>
          <label className='flex cursor-pointer items-center gap-2'>
            <input type='radio' name='type' value={'income'} className='form-radio text-blue-600' />
            <span>Income</span>
          </label>
          <label className='flex cursor-pointer items-center gap-2'>
            <input
              type='radio'
              name='type'
              value={'expense'}
              className='form-radio text-blue-600'
            />
            <span>Expense</span>
          </label>
        </div>

        <button className='btn btn-green mt-2 max-w-fit'>Submit</button>
      </Form>

      {visibleModal && <CategoryModal type='post' setVisibleModal={setVisibleModal} />}
    </div>
  )
}
