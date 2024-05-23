/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';


export const imageRoute = router({
    list: publicProcedure
    .query(async () => {
        return ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    }),
})
