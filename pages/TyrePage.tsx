import React, { useState, useEffect } from 'react';
import { TyreHealthSignal, TyreEventSignal, Vehicle } from '../types';
import { TyreAPI, VehicleAPI } from '../services/mockDatabase';
import { IconTyre, IconAlert, IconSearch, IconCheck } from '../components/Icons';
import { Badge } from '../components/UI';

export const TyrePage: React.FC = () => {
    const [healthSignals, setHealthSignals] = useState<TyreHealthSignal[]>([]);
    const [eventSignals, setEventSignals] = useState<TyreEventSignal[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVehicle, setSelectedVehicle] = useState<string>('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        const [h, e, v] = await Promise.all([
            TyreAPI.getHealthSignals(),
            TyreAPI.getEventSignals(),
            VehicleAPI.getAll()
        ]);
        setHealthSignals(h);
        setEventSignals(e);
        setVehicles(v);
        setIsLoading(false);
    };

    const getVehicleReg = (id: string) => vehicles.find(v => v.vehicle_id === id)?.registration_number || id;

    const filteredHealth = selectedVehicle ? healthSignals.filter(s => s.vehicle_id === selectedVehicle) : healthSignals;
    const filteredEvents = selectedVehicle ? eventSignals.filter(s => s.vehicle_id === selectedVehicle) : eventSignals;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tyre Integration</h1>
                    <p className="text-sm text-gray-500 mt-1">Read-only view of signals received from Tyre Management Module</p>
                </div>
                <div className="w-full sm:w-64">
                    <select 
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                        value={selectedVehicle}
                        onChange={e => setSelectedVehicle(e.target.value)}
                    >
                        <option value="">All Vehicles</option>
                        {vehicles.map(v => <option key={v.vehicle_id} value={v.vehicle_id}>{v.registration_number}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Health Alerts */}
                <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <h3 className="font-medium text-gray-900 flex items-center">
                            <IconTyre className="w-5 h-5 mr-2 text-gray-500" />
                            Active Health Signals
                        </h3>
                    </div>
                    {filteredHealth.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No active health signals.</div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredHealth.map(s => (
                                <div key={s.signal_id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <div className={`p-2 rounded-full mr-3 ${s.abnormal_wear ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                                            <IconTyre className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{getVehicleReg(s.vehicle_id)} <span className="font-normal text-gray-500">({s.position})</span></p>
                                            <p className="text-xs text-gray-500">Tread Depth: {s.tread_depth}mm</p>
                                        </div>
                                    </div>
                                    {s.abnormal_wear ? (
                                        <Badge color="yellow">Abnormal Wear</Badge>
                                    ) : (
                                        <Badge color="green">Healthy</Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Event History */}
                <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <h3 className="font-medium text-gray-900 flex items-center">
                            <IconAlert className="w-5 h-5 mr-2 text-gray-500" />
                            Recent Tyre Events
                        </h3>
                    </div>
                    {filteredEvents.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No events recorded.</div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredEvents.map(e => (
                                <div key={e.signal_id} className="p-4 hover:bg-gray-50">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-sm font-bold text-gray-900">{getVehicleReg(e.vehicle_id)} <span className="font-normal text-gray-500">({e.position})</span></p>
                                        <Badge color={e.severity === 'High' ? 'red' : e.severity === 'Medium' ? 'yellow' : 'blue'}>{e.event_type}</Badge>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-1">{e.description}</p>
                                    <p className="text-xs text-gray-400">{new Date(e.event_date).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};