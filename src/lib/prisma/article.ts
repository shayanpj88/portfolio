import { prisma } from '@/lib/prisma'

export const getArticles = async (count: number) => {
    return await prisma.article.findMany({
        take: count,
        orderBy: {
            createdAt: 'desc', // Optional: Most recent first
        },
    });
};


export const getArticle = async (articleSlug: string) => {
    return await prisma.article.findUnique({
        where: { slug : articleSlug},
    });
}
