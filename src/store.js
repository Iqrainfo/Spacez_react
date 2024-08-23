// import { configureStore } from "@reduxjs/toolkit"
// import PrimetalsServicesSlice from "./redux/PrimetalsServiceslice"

// export default configureStore({
//     reducer: PrimetalsServicesSlice
// })
import { configureStore } from '@reduxjs/toolkit'
import PrimetalsServicesSlice from "./redux/PrimetalsServiceslice"
export default configureStore({
    reducer: { primetals: PrimetalsServicesSlice }
})