import { ArticleInterface, UserProfile } from '@/common.types';
import { getUserArticles } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {
    userId: string;
    articleId: string;
}

const RelatedArticles = async ({userId, articleId}: Props) => {
    const result = await getUserArticles(userId) as { user?: UserProfile}
    const fileteredArticles = result?.user?.articles?.edges?.filter(({ node }: {node: ArticleInterface}) =>
       node?.id !== articleId )
       
    if(fileteredArticles?.length === 0 ) return null;

  return (
    <section className='flex flex-col mt-32 w-full'>
        <div className='flexBetween'>
            <p className='text-base font-bold'>More by {result?.user?.name}</p>
            <Link href={`/profile/${result?.user?.id}`} className='text-primary-purple text-base'>
                View all
            </Link>
        </div>
        <div className='related_articles-grid'>
            {fileteredArticles?.map(({node}: {node: ArticleInterface}) => 
                <div className='flexCenter related_article-card drop-shadow-card'>
                    <Link href={`/article/${node?.id}`} className='flexCenter group relative w-full h-full'>
                        <Image src={node?.image} width={414} height={314} className='w-full h-full object-cover rounded-2x1' alt='article Image'/>
                        <div className='hidden group-hover:flex related_article-card_title'>
                            <p className='w-full'>{node?.title}</p>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    </section>
  )
}

export default RelatedArticles