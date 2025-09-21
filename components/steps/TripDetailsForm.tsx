'use client'
import React, { useState, useEffect } from 'react'
import { TripDetails } from '@/types/travel'

interface Props {
  data?: TripDetails
  onUpdate: (data: TripDetails) => void
  onNext: () => void
}



const TripDetailsForm: React.FC<Props> = ({ data, onUpdate, onNext }) => {
  const [localData, setLocalData] = useState<TripDetails>(data || {
    startDate: '',
    endDate: '',
    budget: 0,
    days: 1
  })
  const handleNext = () => {
    onUpdate(localData)
    onNext()
  }

  return (
    <div>
      <input
      style={{ color: 'black' }}
      value={localData.startDate}
      onChange={(e) => setLocalData({ ...localData, startDate: e.target.value })}
      placeholder="Start Date"
      type="date"
      />
      <input
      style={{ color: 'black' }}
      value={localData.endDate}
      onChange={(e) => setLocalData({ ...localData, endDate: e.target.value })}
      placeholder="End Date"
      type="date"
      />
      <p style={{ color: 'black' }}>Budget</p>
      <input
      style={{ color: 'black' }}
      value={localData.budget}
      onChange={(e) => setLocalData({ ...localData, budget: Number(e.target.value) })}
      placeholder="Budget"
      type="number"
      />
      <button style={{ color: 'black' }} onClick={handleNext}>Next</button>
    </div>
  )
}

export default TripDetailsForm
