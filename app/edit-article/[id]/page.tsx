// import Modal from '@/components/Modal'
import ArticleForm from '@/components/ArticleForm'
import React from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'
import { getArticleDetails } from '@/lib/actions'
import { ArticleInterface } from '@/common.types'

const EditArticle = async ({params: {id}} : {params: {id: string}}) => {
  const session = await getCurrentUser()
  if(!session?.user) redirect('/')
  const result = await getArticleDetails(id) as { article?: ArticleInterface}
  return (
    <div>
        <h3 className='modal-head-text'>
        Edit Article
        </h3>
        <ArticleForm type='edit' session={session} article={result?.article}/>
    </div>
  )
}

export default EditArticle