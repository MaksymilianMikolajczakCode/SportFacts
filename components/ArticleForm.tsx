'use client'

import { ArticleInterface, SessionInterface } from '@/common.types'
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import FormField from './FormField'
import { categoryFilters } from '@/constant'
import CustomMenu from './CustomMenu'
import Button from './Button'
import { createNewArticle, fetchToken, updateArticle } from '@/lib/actions'
import { useRouter } from 'next/navigation'
type Props = {
    type:string,
    session: SessionInterface,
    article?: ArticleInterface
}

const ArticleForm = ({type, session, article}: Props) => {
    const router = useRouter()
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true)

        const { token } = await fetchToken()
        try {
            if(type === 'create') {
                await createNewArticle(form, session?.user.id, token)
                router.refresh()
                router.push('/')
            }
            if(type === 'edit') {
                await updateArticle(form, article?.id as string, token)
                router.refresh()
            }
        } catch (error) {
            console.log(error)
        } finally { setSubmitting(false) }
    }
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if(!file) return;
        if(!file.type.includes('image')) { return alert('Please upload an image file')}
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange('image', result);
        }
    }
    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState) => ({...prevState, [fieldName]: value}))
    }
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
        image: article?.image ||'',
        title: article?.title ||'',
        category: article?.category ||'',
        body: article?.body ||'',
    })

  return (
    <form onSubmit={handleFormSubmit} className='flexStart form '>
        <div className='flexStart form_image-container'>
            <label htmlFor='poster' className='flexCenter form_image-label'>
                {!form.image && 'Choose a poster for your article'}
            </label>
            <input
                id="image"
                type="file"
                accept="image/*"
                required={type === 'create'}
                className='form_image-input'
                onChange={handleChangeImage}
            />
            {form.image && (
                <Image
                    src={form?.image}
                    className='sm:p-10 object-contain z-20'
                    alt='Article poster'
                    fill
                />
            )}

        </div>
        <FormField 
            title='title' 
            state={form.title} 
            placeholder='Flexibble' 
            setState={(value) => handleStateChange('title', value)} 
        />
        <FormField 
            title='body' 
            state={form.body} 
            placeholder='Showcase and discover remarkable developer Articles.' 
            setState={(value) => handleStateChange('body', value)} 
        />


        <CustomMenu 
            title='category'
            state={form.category}
            filters={categoryFilters}
            setState={(value) => handleStateChange('category', value)}
        />

        <div className='flexStart w-full'>
            <Button
                title={submitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                type="submit"
                leftIcon={submitting ? "" : "/plus.svg"}
                submitting={submitting}
            />
        </div>
    </form>
  )
}

export default ArticleForm