'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  const [monthlyCost, setMonthlyCost] = useState(0)
  const [timeSaved, setTimeSaved] = useState(0)
  const [hourlyRate, setHourlyRate] = useState(0)
  const [extraIncome, setExtraIncome] = useState(0)
  const [roiResult, setRoiResult] = useState<{ roi: number; verdict: string } | null>(null)

  const calculateROI = () => {
    const monthlyValue = timeSaved * hourlyRate * 4 + extraIncome
    const roi = monthlyValue - monthlyCost
    const verdict = roi >= 0 ? '✅ Worth it!' : '❌ Not worth it yet'
    setRoiResult({ roi, verdict })
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-16">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">AI Tool ROI Calculator</h1>

      <Card className="max-w-xl">
        <CardContent className="grid gap-4 p-4">
          <Input
            type="number"
            placeholder="Monthly Cost of AI Tool ($)"
            onChange={e => setMonthlyCost(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Hours Saved Per Week"
            onChange={e => setTimeSaved(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Your Hourly Rate ($)"
            onChange={e => setHourlyRate(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Extra Monthly Income from Tool ($, optional)"
            onChange={e => setExtraIncome(Number(e.target.value))}
          />
          <Button onClick={calculateROI}>Calculate ROI</Button>
        </CardContent>
      </Card>

      {roiResult && (
        <div className="mt-6 max-w-xl">
          <Card>
            <CardContent className="p-4">
              <p className="text-xl font-semibold">Estimated ROI: ${roiResult.roi.toFixed(2)}</p>
              <p className="text-lg mt-2">{roiResult.verdict}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
