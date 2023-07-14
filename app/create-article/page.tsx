import ArticleForm from '@/components/ArticleForm'
import React from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'

const CreateArticle = async () => {
  const session = await getCurrentUser()
  if(!session?.user) redirect('/')
  return (
    <div>
        <h3 className='modal-head-text'>
        Create a New Article
        </h3>
        <ArticleForm type='create' session={session}/>
    </div>
  )
}

export default CreateArticle