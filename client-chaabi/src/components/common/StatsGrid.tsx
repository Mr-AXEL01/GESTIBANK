import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface StatItem {
    title: string;
    value: string;
    subtitle: string;
    color: 'orange' | 'green' | 'amber' | 'blue' | 'red' | 'purple';
    icon: React.ReactNode;
}

interface StatsGridProps {
    customStats?: StatItem[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ customStats }) => {
    const { user } = useAuth();

    const getDefaultStatsForRole = (): StatItem[] => {
        switch (user?.role) {
            case 'responsable':
                return [
                    {
                        title: 'Total Agents',
                        value: '12',
                        subtitle: 'Active team members',
                        color: 'orange',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        )
                    },
                    {
                        title: 'Daily Transactions',
                        value: '156',
                        subtitle: "Today's processed",
                        color: 'green',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        )
                    },
                    {
                        title: 'Customer Satisfaction',
                        value: '94%',
                        subtitle: 'This month',
                        color: 'blue',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        )
                    },
                    {
                        title: 'Pending Issues',
                        value: '5',
                        subtitle: 'Require attention',
                        color: 'red',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        )
                    }
                ];
            case 'agent':
            default:
                return [
                    {
                        title: 'Customers Served',
                        value: '23',
                        subtitle: 'Today',
                        color: 'orange',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        )
                    },
                    {
                        title: 'Transactions Processed',
                        value: '45',
                        subtitle: 'Today',
                        color: 'green',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        )
                    },
                    {
                        title: 'Support Tickets',
                        value: '8',
                        subtitle: 'Open cases',
                        color: 'amber',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )
                    },
                    {
                        title: 'Performance Score',
                        value: '92%',
                        subtitle: 'This month',
                        color: 'blue',
                        icon: (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )
                    }
                ];
        }
    };

    const stats = customStats || getDefaultStatsForRole();

    const getColorClasses = (color: string) => {
        const colorMap = {
            orange: 'bg-orange-50 border-orange-200 text-orange-900 text-orange-600 text-orange-700',
            green: 'bg-green-50 border-green-200 text-green-900 text-green-600 text-green-700',
            amber: 'bg-amber-50 border-amber-200 text-amber-900 text-amber-600 text-amber-700',
            blue: 'bg-blue-50 border-blue-200 text-blue-900 text-blue-600 text-blue-700',
            red: 'bg-red-50 border-red-200 text-red-900 text-red-600 text-red-700',
            purple: 'bg-purple-50 border-purple-200 text-purple-900 text-purple-600 text-purple-700'
        };
        return colorMap[color as keyof typeof colorMap] || colorMap.orange;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
                const colors = getColorClasses(stat.color).split(' ');
                return (
                    <div key={index} className={`${colors[0]} ${colors[1]} p-6 rounded-lg border`}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className={`font-medium ${colors[2]} text-sm`}>{stat.title}</h3>
                            <div className={`${colors[3]} p-2 rounded-lg`}>
                                {stat.icon}
                            </div>
                        </div>
                        <p className={`text-3xl font-bold ${colors[3]} mb-1`}>{stat.value}</p>
                        <p className={`text-sm ${colors[4]}`}>{stat.subtitle}</p>
                    </div>
                );
            })}
        </div>
    );
};