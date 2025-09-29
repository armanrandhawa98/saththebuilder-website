'use client';

import { useState } from 'react';

export default function SeedPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string>('');

    const seedDatabase = async () => {
        setLoading(true);
        setResult('Seeding database...');
        
        try {
            const response = await fetch('/api/seed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                setResult(`Success! ${data.message}\n\nProjects:\n${JSON.stringify(data.projects, null, 2)}`);
            } else {
                setResult(`Error: ${data.error}`);
            }
        } catch (error) {
            setResult(`Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Seed Database</h1>
                <p className="text-gray-600 mb-6">
                    This will replace all existing projects with sample projects that have proper Unsplash image URLs.
                </p>
                
                <button
                    onClick={seedDatabase}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium"
                >
                    {loading ? 'Seeding...' : 'Seed Database'}
                </button>
                
                {result && (
                    <div className="mt-6 p-4 bg-white rounded-lg border">
                        <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}