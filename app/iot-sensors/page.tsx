import IoTSensorNetwork from "@/components/iot-sensor-network"

export default function IoTSensorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IoT Sensor Network</h1>
          <p className="text-gray-600">
            Real-time environmental monitoring and wearable device integration for comprehensive crisis detection.
          </p>
        </div>
        <IoTSensorNetwork />
      </div>
    </div>
  )
}
