// export const cartProducts = state => {
//   return state.cart.added.map(({ id, quantity }) => {
//     const product = state.products.all.find(p => p.id === id)
//     return {
//       title: product.title,
//       price: product.price,
//       quantity
//     }
//   })
// }

export const currentRouter = state => state.currentRouter
export const currentMode = state => state.listAndProfile.currentMode
export const isListMode = state => state.listAndProfile.currentMode === 'list'
export const loading = state => state.query.loading

