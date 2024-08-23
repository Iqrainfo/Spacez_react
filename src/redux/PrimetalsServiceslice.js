import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    IDTserviceId: '',
    ITSItemID: '',
    ZscalerStartDate: '',
    ZscalerEndDate: '',
    ZscalerTotalAmount: '',
    MobileSAStartDate: '',
    MobileSAEndDate: '',
    MobileServiceProvider: '',
    // startDate: new Date() || '',
    // endDate: new Date() || '',
}
const PrimetalsServicesSlice = createSlice({
    name: 'primetals',
    initialState: initialState,
    reducers: {
        setIDTServiceId: (state, action) => { state.IDTserviceId = action.payload },
        setITSItemId: (state, action) => { state.ITSItemID = action.payload },
        setZscalerStartDate: (state, action) => { state.ZscalerStartDate = action.payload },
        setZscalerEndDate: (state, action) => { state.ZscalerEndDate = action.payload },
        setZscalerTotalAmount: (state, action) => { state.ZscalerTotalAmount = action.payload },
        setMobileSAStartDate: (state, action) => { state.MobileSAStartDate = action.payload },
        setMobileSAEndDate: (state, action) => { state.MobileSAEndDate = action.payload },
        setMobileServiceProvider: (state, action) => { state.MobileServiceProvider = action.payload },
        // setStartDate: (state, action) => { state.startDate = action.payload },
        // setEndDate: (state, action) => { state.endDate = action.payload },
    }
})

// Action creators are generated for each case reducer function
export const {
    setIDTServiceId,
    setITSItemId,
    setZscalerStartDate,
    setZscalerEndDate,
    setZscalerTotalAmount,
    setMobileSAStartDate,
    setMobileSAEndDate,
    setMobileServiceProvider,
    // setStartDate,
    // setEndDate

} = PrimetalsServicesSlice.actions

export default PrimetalsServicesSlice.reducer

