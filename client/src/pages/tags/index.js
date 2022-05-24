import { useEffect, useState } from 'react'
import { Links } from '../../common/components/elements/links';
import { Tags } from '../../common/components/elements/Tags';
import Layout from '../../common/layouts/Layout.tsx';

export async function getServerSideProps(context) {
    const response = await fetch("http://localhost:5000/post/tags")
    const tags = await response.json()
    return {
        props: { tags }
    }
}

export default function Categories({ tags }) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        var allInOneTags = []
        tags.forEach(tag => {
            // allInOneTags.push(...tag.tags)
            allInOneTags = [...allInOneTags, ...tag.tags]
        })
        const uniqueChars = [...new Set(allInOneTags)];
        setCategories(uniqueChars)
    }, [])

    return (
        <Layout title="Categories" className="mt-10 md:ml-20">
            <div className='flex gap-2 flex-wrap'>
                {
                    categories.map((category, index) => {
                        return (
                            <Links key={category + index} href={`/tags/${category}`}>
                                <Tags>{category}</Tags>
                            </Links>
                        )
                    })
                }
            </div>
        </Layout>
    )
}
