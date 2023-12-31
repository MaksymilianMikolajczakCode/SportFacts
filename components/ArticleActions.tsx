'use client'

import { deleteArticle, fetchToken } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ArticleActions = ({articleId} : {articleId : string}) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()
    const handleDeleteArticle = async () => {
        setIsDeleting(true);
        const { token } = await fetchToken();
        try {
            await deleteArticle(articleId, token)
            router.push('/')
        } catch (error) {
            console.log(error)
        } finally {  
            setIsDeleting(false)
        }
    } 
  return (
    <>
        <Link href={`/edit-article/${articleId}`} className='flexCenter edit-action_btn'>
            <Image 
                src="/pencile.svg"
                width={15}
                height={15}
                alt='edit'
            />
        </Link>
        <button type='button' className={`flexCenter delete-action_btn ${isDeleting ? 'bg-gray' : 'bg-primary-purple'}`} onClick={handleDeleteArticle}>
            <Image 
                src="/trash.svg"
                width={15}
                height={15}
                alt='delete'
            />
            </button>
    </>
  )
}

export default ArticleActions