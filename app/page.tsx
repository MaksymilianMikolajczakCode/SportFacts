import { ArticleInterface } from "@/common.types"
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ArticleCard from "@/components/ArticleCard";
import { fetchAllArticles } from "@/lib/actions"

type ArticleSearch = {
    articleSearch: {
        edges: { node: ArticleInterface}[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string
        }
    }
}

type Props = {
    searchParams: {
        category?: string;
        endCursor?: string;
    }
}


const Home =  async ({searchParams: {category, endCursor}}: Props) => {
    const data = await fetchAllArticles(category, endCursor) as ArticleSearch
   
    const articlesToDisplay = data?.articleSearch?.edges || [];

    if(articlesToDisplay.length === 0) {
        return (
        <section className="flexStart flex-col paddings">
            <Categories/>
            <p className="no-result-text text-center">
                No articles found, go create some first.
            </p>
        </section>
        )
    }

    const pagination = data?.articleSearch?.pageInfo
   
    return (
        <section className="flex-start flex-col paddings mb-16">
            <Categories />
            <section className="articles-grid">
                {articlesToDisplay.map(({node} : {node: ArticleInterface}) =>
                    <ArticleCard 
                        key={node?.id}
                        id={node?.id}
                        image={node?.image}
                        title={node?.title}
                        name={node?.createdBy.name}
                        avatarUrl={node?.createdBy?.avatarUrl}
                        userId={node?.createdBy.id}
                    />
                )}
            </section>



            <LoadMore
                startCursor={pagination.startCursor}
                endCursor={pagination.endCursor}
                hasPreviousPage={pagination.hasPreviousPage}
                hasNextPage={pagination.hasNextPage}
            />
        </section>
    )
}

export default Home