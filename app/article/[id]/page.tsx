import Image from "next/image"
import Link from "next/link"

import { getCurrentUser } from "@/lib/session"
import { getArticleDetails } from "@/lib/actions"
// import Modal from "@/components/Modal"
import ArticleActions from "@/components/ArticleActions"
import RelatedArticles from "@/components/RelatedArticles"
import { ArticleInterface } from "@/common.types"

const Article = async ({ params: { id } }: { params: { id: string } }) => {
    const session = await getCurrentUser()
    const result = await getArticleDetails(id) as { article?: ArticleInterface}

    if (!result?.article) return (
        <p className="no-result-text">Failed to fetch project info</p>
    )

    const articleDetails = result?.article

    const renderLink = () => `/profile/${articleDetails?.createdBy?.id}`

    return (
        <div>
            <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
                <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
                    <Link href={renderLink()}>
                        <Image
                            src={articleDetails?.createdBy?.avatarUrl}
                            width={50}
                            height={50}
                            alt="profile"
                            className="rounded-full"
                        />
                    </Link>

                    <div className="flex-1 flexStart flex-col gap-1">
                        <p className="self-start text-lg font-semibold">
                            {articleDetails?.title}
                        </p>
                        <div className="user-info">
                            <Link href={renderLink()}>
                                {articleDetails?.createdBy?.name}
                            </Link>
                            <Image src="/dot.svg" width={4} height={4} alt="dot" />
                            <Link href={`/?category=${articleDetails.category}`} className="text-primary-purple font-semibold"> 
                                {articleDetails?.category}
                            </Link>
                        </div>
                    </div>
                </div>

                {session?.user?.email === articleDetails?.createdBy?.email && (
                    <div className="flex justify-end items-center gap-2">
                        <ArticleActions articleId={articleDetails?.id} />
                    </div>
                )}
            </section>

            <section className="mt-14">
                <Image
                    src={`${articleDetails?.image}`}
                    className="object-cover rounded-2xl"
                    width={1064}
                    height={798}
                    alt="poster"
                />
            </section>

            <section className="flexCenter flex-col mt-20">
                <p className="max-w-5xl text-xl font-normal">
                    {articleDetails?.body}
                </p>
            </section>
      
            <section className="flexCenter w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-light-white-200" />
                <Link href={renderLink()} className="min-w-[82px] h-[82px]">
                    <Image
                        src={articleDetails?.createdBy?.avatarUrl}
                        className="rounded-full"
                        width={82}
                        height={82}
                        alt="profile image"
                    />
                </Link>
                <span className="w-full h-0.5 bg-light-white-200" />
            </section>

            <RelatedArticles userId={articleDetails?.createdBy?.id} articleId={articleDetails?.id} />
        </div>
    )
}

export default Article